namespace BlazorApp.Models
{
    public class Pixel
    {
        private Color color;

        public Pixel(int x, int y, Color color)
        {
            X = x;
            Y = y;
            this.color = color ?? throw new ArgumentNullException(nameof(color));
        }

        public int X
        {
            get;
            set;
        }

        public int Y
        {
            get;
            set;
        }

        public Color Color
        {
            get => this.color;
            set
            {
                if (value == null)
                    throw new ArgumentNullException(nameof(this.Color));

                this.color = value;
            }
        }
    }
}