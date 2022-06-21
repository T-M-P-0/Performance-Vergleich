namespace BlazorApp.Models
{
    using System.Collections.Concurrent;
    public class Mandelbrot
    {
        private readonly int maxIterations = 100;

        public Mandelbrot(int maxIterations)
        {
            if (maxIterations < 1)
            {
                throw new ArgumentOutOfRangeException("The value must be greater than 0.", nameof(maxIterations));
            }

            this.maxIterations = maxIterations;
        }

        public int MaxIterations => this.maxIterations;

        public Pixel[] GeneratePixels(int height, int width, double reStart, double reEnd, double imStart, double imEnd)
        {
            Pixel[] pixels = new Pixel[height * width];
            int counter = 0;
            for (int y = 0; y < height; ++y)
            {
                for (int x = 0; x < width; ++x)
                {
                    ComplexNum c = this.MapPixelToFractalPlane(x, y, width, height, reStart, reEnd, imStart, imEnd);
                    int iterations = this.GetIterations(c);
                    Color color = this.ApplyEscapeTimeAlgorithmen(iterations);
                    pixels[counter] = new Pixel(x, y, color);
                    counter++;
                }
            }

            return pixels;
        }

        private Color ApplyEscapeTimeAlgorithmen(int n)
        {
            if (n == this.maxIterations)
                return new Color(255, 255, 255);

            int green = 255 - (n / this.maxIterations) + 1;
            var purple = new Color(92, 45, 145);
            return purple;
        }

        private ComplexNum MapPixelToFractalPlane(int x, int y, int width, int height, double reStart, double reEnd, double imStart, double imEnd)
        {
            var distanceFromMinXValue = (double)x / width * (reEnd - reStart);
            var re = reStart + distanceFromMinXValue;
            var distanceFromMinYValue = (double)y / height * (imEnd - imStart);
            var im = imStart + distanceFromMinYValue;

            return new ComplexNum() { Real = re, Imaginary = im };
        }

        private int GetIterations(ComplexNum c)
        {
            var z0 = new ComplexNum() { Real = 0, Imaginary = 0 };
            // Remained bounded
            return ApplyMandelbrotFunction(z0, c, 0);
        }
        private int ApplyMandelbrotFunction(ComplexNum zn, ComplexNum c, int counter)
        {
            if (zn.AbsoluteValue > 2 || this.maxIterations == counter)
                return counter;

            var zn1 = zn.Square + c;
            return ApplyMandelbrotFunction(zn1, c, ++counter);
        }
    }
}