import Component from "@ember/component";
import { action } from "@ember/object";
import { setPixels } from "../helpers/canvas-helper";
import { StopWatch } from "../testing/stop-watch";
import { Mandelbrot } from "../models/mandelbrot";
import { MandelbrotData } from "../models/mandelbrot-data";

export default class Test4Component extends Component {

  @action startTest() {

    this.stopWatch.start();

    console.log("Werte des Mandelbrots:");
    console.log(`Höhe: ${this.data.height}`);
    console.log(`Breite: ${this.data.width}`);
    console.log(`Maximale Anzahl an iterationen: ${this.mandelbrot.maxIterations}`);

    const pixels = this.mandelbrot.generatePixels(this.data.width, this.data.height, this.data.reStart, this.data.reEnd, this.data.imStart, this.data.imEnd,);

    const timeForGeneratingPixels = this.stopWatch.stop();
    console.log(`Zeit für das berechnen des Mandelbrots: ${timeForGeneratingPixels}ms`)


    this.stopWatch.start();

    setPixels(this.canvasId, pixels);

    const timeForDrawingPixels = this.stopWatch.stop();

    console.log(`Zeit für das Zeichnen der Pixel in das Canvas: ${timeForDrawingPixels}ms`);
    console.log("Stresstest beendet.");
  }

  mandelbrot = new Mandelbrot(2000);
  data = new MandelbrotData(1000, 1000, -2, 2, -1, 1);
  stopWatch = new StopWatch();
  canvasId = "canvasId";
}
