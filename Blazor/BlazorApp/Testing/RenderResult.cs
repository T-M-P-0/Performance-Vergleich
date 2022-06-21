namespace BlazorApp.Testing
{
    /// <summary>
    /// Represents a result from the apdex score.
    /// </summary>
    public class RenderResult
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RenderResult"/> class.
        /// </summary>
        /// <param name="timeForRemovingElements">Amount of time for removing the elements from the view.</param>
        /// <param name="timeForAddingElements">Amount of time for adding the elements from the view.</param>
        public RenderResult(long timeForRemovingElements, long timeForAddingElements)
        {
            this.TimeForRemovingElements = timeForRemovingElements;
            this.TimeForAddingElements = timeForAddingElements;
        }

        /// Gets or sets the time for removing all the elements from the list and rendering the this state to the UI. (in milliseconds)
        /// </summary>
        public long TimeForRemovingElements { get; set; }

        /// <summary>
        /// Gets or sets the time for adding the elements to the list and rendering them in the UI. (in milliseconds)
        /// </summary>
        public long TimeForAddingElements { get; set; }

        /// <summary>
        /// Gets the sum of <see cref="TimeForRemovingElements"/> and <see cref="TimeForAddingElements"/> which represent the total amount of time for
        /// the elements to be removed from the UI and rendered again.
        /// </summary>
        public long TotalTime => TimeForRemovingElements + TimeForAddingElements;
    }
}
