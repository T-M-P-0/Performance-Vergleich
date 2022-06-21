<template>
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Test 4</h1>
      <button type="button" class="btn btn-primary btn-lg" @click="this.startTest">Start</button>
    </div>
  </div>

  <div class="container">
    <div class="img-fluid">
      <canvas style="border:1px solid #000000;" :id="canvasId" :width="this.data.width" :height="this.data.height">
      </canvas>
    </div>
  </div>
</template>

<script>
import { setPixels } from "../helpers/canvas-helper";
import { StopWatch } from "../testing/stop-watch";
import { Mandelbrot } from "../models/mandelbrot";
import { MandelbrotData } from "../models/mandelbrot-data";

export default {
  name: "Mandelbrot-View",
  data() {
    return {
      mandelbrot: new Mandelbrot(2000),
      data: new MandelbrotData(1000, 1000, -2, 2, -1, 1),
      stopWatch: new StopWatch(),
      canvasId: "canvasId",
    };
  },
  methods: {
    startTest() {

      console.log("Werte des Mandelbrots:");
      console.log(`Höhe: ${this.data.height}`);
      console.log(`Breite: ${this.data.width}`);
      console.log(`Maximale Anzahl an iterationen: ${this.mandelbrot.maxIterations}`);

      this.stopWatch.start();

      const pixels = this.mandelbrot.generatePixels(this.data.width, this.data.height, this.data.reStart, this.data.reEnd, this.data.imStart, this.data.imEnd,);

      const timeForGeneratingPixels = this.stopWatch.stop();
      console.log(`Zeit für das berechnen des Mandelbrots: ${timeForGeneratingPixels}ms`)


      this.stopWatch.start();

      setPixels(this.canvasId, pixels);

      const timeForDrawingPixels = this.stopWatch.stop();

      console.log(`Zeit für das Zeichnen der Pixel in das Canvas: ${timeForDrawingPixels}ms`);
    },
  },
};
</script>