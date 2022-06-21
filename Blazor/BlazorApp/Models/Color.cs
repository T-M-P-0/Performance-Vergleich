namespace BlazorApp.Models
{
    public class Color
    {
        public Color(int r, int g, int b)
        {
            R = r;
            G = g;
            B = b;
        }
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }

        public override string ToString()
        {
            return $"{this.R} {this.G} {this.B}";
        }
    }
}
