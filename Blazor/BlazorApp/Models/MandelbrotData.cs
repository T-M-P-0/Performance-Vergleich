namespace BlazorApp.Models
{
    public class MandelbrotData
    {
        public MandelbrotData()
        {
        }

        public MandelbrotData(int width, int height, double reStart, double reEnd, double imStart, double imEnd)
        {
            Width = width;
            Height = height;
            ReStart = reStart;
            ReEnd = reEnd;
            ImStart = imStart;
            ImEnd = imEnd;
        }

        public int Width { get; set; }
        public int Height { get; set; }
        public double ReStart { get; set; }
        public double ReEnd { get; set; }
        public double ImStart { get; set; }
        public double ImEnd { get; set; }

    }
}
