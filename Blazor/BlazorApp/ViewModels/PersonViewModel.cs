namespace BlazorApp.ViewModels
{
    using Models;
    public class PersonViewModel
    {
        /// <summary>
        /// The person object which is encapsulate by the view model.
        /// </summary>
        private readonly Person person;


        /// <summary>
        /// Initializes a new instance of <see cref="PersonViewModel"/> class.
        /// </summary>
        /// <param name="person">The person object.</param>
        /// <exception cref="ArgumentNullException">Is thrown if the person object is null.</exception>
        public PersonViewModel(Person person)
        {
            this.person = person ?? throw new ArgumentNullException(nameof(this.person));
        }

        /// <summary>
        /// Initializes a new instance of <see cref="PersonViewModel"/> class.
        /// </summary>
        /// <param name="person">The person object.</param>
        /// <param name="IsMarked">A value indicating whether the current object is marked in the view.</param>
        /// <exception cref="ArgumentNullException">Is thrown if the person object is null.</exception>
        public PersonViewModel(Person person, bool IsMarked)
        {
            this.person = person ?? throw new ArgumentNullException(nameof(this.person));
            this.IsMarked = IsMarked;
        }

        /// <summary>
        /// Gets the person object for information.
        /// </summary>
        public Person Object
        {
            get
            {
                return this.person;
            }
        }

        /// <summary>
        /// Get or sets a value indicating whether the current object is marked in the view.
        /// </summary>
        public bool IsMarked
        {
            get;
            set;
        }
    }
}