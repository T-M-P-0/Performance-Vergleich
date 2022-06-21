import { Complex, abs, addComplex, square } from "./complex-num";
import { Pixel } from "./pixel";

export class Mandelbrot {
  constructor(maxIterations) {
    this.maxIterations = maxIterations;
  }

  generatePixels(width, height, reStart, reEnd, imStart, imEnd) {
    const pixels = [];
    let counter = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const c = this.#mapPixelToFractalPlane(x, y, width, height, reStart, reEnd, imStart, imEnd);
        let iterations = this.#getIterations(c);
        const color = this.#colorPixel(iterations);
        pixels[counter++] = new Pixel(x, y, color);
      }
    }

    return pixels;
  }

  #getIterations(c) {
    var z0 = new Complex(0, 0);
    return this.#applyMandelbrotFunction(z0, c, 0, this.maxIterations);
  }

  #colorPixel(n) {
    if (n == this.maxIterations) {
      return `rgb(255,255,255)`;
    }

    return `rgb(225, 74, 48)`;
  }

  #mapPixelToFractalPlane(x, y, width, height, reStart, reEnd, imStart, imEnd) {

    var distanceFromMinXValue = (x / width) * (reEnd - reStart);
    var re = reStart + distanceFromMinXValue;
    var distanceFromMinYValue = (y / height) * (imEnd - imStart);
    var im = imStart + distanceFromMinYValue;

    return new Complex(re, im);
  }

  #applyMandelbrotFunction(z, c, counter, maxIterations) {
    var diverges = abs(z) > 2;

    if (diverges || counter == maxIterations) {
      return counter;
    }

    var zSquare = square(z);
    var zn1 = addComplex(zSquare, c);
    return this.#applyMandelbrotFunction(zn1, c, ++counter, maxIterations);
  }
}