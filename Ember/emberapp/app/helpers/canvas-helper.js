export function setPixels(canvasId, pixels) {

  const canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    ctx.fillStyle = pixel.color;
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
  }
}
