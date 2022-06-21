namespace BlazorApp.Testing
{
    /// <summary>
    /// Represents a calculator for the apdex score.
    /// </summary>
    public class ApdexCalculator
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ApdexCalculator"/> class.
        /// </summary>
        /// <param name="treshold">The treshold in milliseconds.</param>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public ApdexCalculator(long treshold)
        {
            if (treshold <= 0)
            {
                throw new ArgumentOutOfRangeException("The treshold must be positive or 0.", nameof(treshold));
            }

            this.treshold = treshold;
        }

        /// <summary>
        /// The treshold for satisfied result.
        /// </summary>
        private readonly long treshold;

        /// <summary>
        /// Gets the start of the frustrating zone.
        /// </summary>
        private long FrustratedZoneStart
        {
            get
            {
                if (!long.TryParse(Math.Round(treshold * 1.5, MidpointRounding.AwayFromZero).ToString(), out long result))
                {
                    return 0;
                }

                return result;
            }
        }

        /// <summary>
        /// Gets the apdex score for a specified list of results.
        /// </summary>
        /// <param name="results">The list of results.</param>
        /// <returns>A list of results.</returns>
        public ApdexResult GetApdexScore(List<long> results)
        {
            ZoneCounter counter = new ZoneCounter();
            List<RenderResult> renderResults = new List<RenderResult>();

            int totalSampleSize = results.Count / 2;
            do
            {
                IEnumerable<long> resultSet = results.Take(2);
                long timeForRemovingAllItemsFromUI = resultSet.FirstOrDefault();
                long timeForAddingItemsBackToUI = resultSet.LastOrDefault();
                long renderTime = timeForRemovingAllItemsFromUI + timeForAddingItemsBackToUI;
                counter = ValidateResult(counter, renderTime);
                renderResults.Add(new RenderResult(timeForRemovingAllItemsFromUI, timeForAddingItemsBackToUI));
                results = results.Skip(2).ToList();
            } while (results.Count != 0);

            double score = CalculateApdexScore(counter.SatisfiedResultsCount, counter.ToleratingResultsCount, totalSampleSize);
            ApdexResult result = new ApdexResult(totalSampleSize, score, counter, renderResults);
            return result;
        }


        /// <summary>
        /// Validates a given result and increases the count for one of the zones.
        /// </summary>
        /// <param name="counterData">Data of all zone counters.</param>
        /// <param name="renderTime">One render result.</param>
        /// <returns>An updated zone counter based on the specified value.</returns>
        private ZoneCounter ValidateResult(ZoneCounter counterData, long renderTime)
        {
            if (renderTime <= this.treshold)
            {
                counterData.SatisfiedResultsCount++;
            }

            if (renderTime > this.treshold && renderTime <= this.FrustratedZoneStart)
            {
                counterData.ToleratingResultsCount++;
            }

            if (renderTime > this.FrustratedZoneStart)
            {
                counterData.FrustratingResultsCount++;
            }

            return counterData;
        }

        /// <summary>
        /// Calculates the apdex score.
        /// </summary>
        /// <param name="satisfiedCount">Count of satisfied results.</param>
        /// <param name="toleratingCount">Count of tolerating results.</param>
        /// <param name="totalSamples">Count of frustrating results.</param>
        /// <returns></returns>
        private double CalculateApdexScore(int satisfiedCount, int toleratingCount, int totalSamples)
        {
            return (satisfiedCount + (toleratingCount / 2)) / (double)totalSamples;
        }

    }

    /// <summary>
    /// Represents a set of counters, which track the number of satisfied results, tolerating results, and frustrating results.
    /// </summary>
    public struct ZoneCounter
    {
        public int SatisfiedResultsCount { get; set; }
        public int ToleratingResultsCount { get; set; }
        public int FrustratingResultsCount { get; set; }
    }
}
