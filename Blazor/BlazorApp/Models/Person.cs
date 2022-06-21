namespace BlazorApp.Models
{
    public class Person
    {
        public Person(int id, string firstName, string lastName, string address, string address2, string city, string zip, string country)
        {
            this.Id = id;
            this.FirstName = firstName ?? throw new ArgumentNullException();
            this.LastName = lastName ?? throw new ArgumentNullException();
            this.Address = address ?? throw new ArgumentNullException();
            this.Address2 = address2 ?? throw new ArgumentNullException();
            this.City = city ?? throw new ArgumentNullException();
            this.ZIP = zip ?? throw new ArgumentNullException();
            this.Country = country ?? throw new ArgumentNullException();
        }

        public string FirstName
        {
            get;
            set;
        }

        public string LastName
        {
            get;
            set;
        }

        public string Address
        {
            get;
            set;
        }

        public string Address2
        {
            get;
            set;
        }

        public string City
        {
            get;
            set;
        }

        public string Country
        {
            get;
            set;
        }

        public string ZIP
        {
            get;
            set;
        }

        public int Id
        {
            get;
            set;
        }
    }
}