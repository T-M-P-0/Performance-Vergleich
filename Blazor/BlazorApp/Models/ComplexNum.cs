namespace BlazorApp.Models
{
    public class ComplexNum
    {
        public double Real
        {
            get;
            set;
        }

        public double Imaginary
        {
            get;
            set;
        }

        public double AbsoluteValue
        {
            get
            {
                var discriminant = Math.Pow(this.Real, 2) + Math.Pow(this.Imaginary, 2);
                return Math.Sqrt(discriminant);
            }
        }

        public ComplexNum Square
        {
            get
            {
                return new ComplexNum()
                {
                    Real = this.Real * this.Real + (this.Imaginary * this.Imaginary * -1),
                    Imaginary = this.Real * this.Imaginary + this.Real * this.Imaginary
                };
            }
        }
        public static ComplexNum operator +(ComplexNum c1, ComplexNum c2) => new ComplexNum() { Real = c1.Real + c2.Real, Imaginary = c1.Imaginary + c2.Imaginary };
    }
}