namespace BlazorApp.Testing
{
    public class ApdexResult
    {
        public ApdexResult(int sampleSize, double apdexScore, ZoneCounter counter, List<RenderResult> renderResults)
        {
            this.SampleSize = sampleSize;
            this.ApdexScore = apdexScore;
            this.Counter = counter;
            this.RenderResults = renderResults ?? throw new ArgumentNullException(nameof(renderResults));
        }

        public int SampleSize { get; }

        public double ApdexScore { get; }

        public ZoneCounter Counter { get; }

        public List<RenderResult> RenderResults { get; }
    }
}
