<script>
  import { Mandelbrot } from "../models/mandelbrot";
  import { setPixels } from "./../helpers/canvas-helper";
  import { onMount } from "svelte";
  import { StopWatch } from "./../testing/stop-watch";
  import { MandelbrotData } from "../models/mandelbrot-data";

  const mandelbrot = new Mandelbrot(2000);
  const data = new MandelbrotData(1000, 1000, -2.0, 2.0, -1.0, 1.0);
  const stopWatch = new StopWatch();
  const canvasId = "canvasId";

  function startTest() {
    console.log("Werte des Mandelbrots:");
    console.log(`Höhe: ${data.height}`);
    console.log(`Breite: ${data.width}`);
    console.log(`Maximale Anzahl an iterationen: ${mandelbrot.maxIterations}`);

    stopWatch.start();

    const pixels = mandelbrot.generatePixels(
      data.width,
      data.height,
      data.reStart,
      data.reEnd,
      data.imStart,
      data.imEnd
    );

    const timeForGeneratingPixels = stopWatch.stop();
    console.log(
      `Zeit für das berechnen des Mandelbrots: ${timeForGeneratingPixels}ms`
    );

    stopWatch.start();

    setPixels(canvasId, pixels);

    const timeForDrawingPixels = stopWatch.stop();

    console.log(
      `Zeit für das Zeichnen der Pixel in das Canvas: ${timeForDrawingPixels}ms`
    );

    console.log("Stresstest beendet.");
  }
</script>

<div class="jumbotron">
  <div class="container">
    <h1 class="display-3">Test 4</h1>
    <button type="button" class="btn btn-primary btn-lg" on:click={startTest}
      >Start</button
    >
  </div>
</div>

<div class="container">
  <div class="img-fluid">
    <canvas
      style="border:1px solid #000000;"
      id={canvasId}
      width={data.width}
      height={data.height}
    />
  </div>
</div>
