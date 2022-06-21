export class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
}

export function addComplex(c1, c2) {
  var real = c1.real + c2.real;
  var imaginary = c1.imaginary + c2.imaginary;
  return new Complex(real, imaginary);
}

export function square(c1) {
  var real = c1.real * c1.real + c1.imaginary * c1.imaginary * -1;
  var imaginary = c1.real * c1.imaginary + c1.imaginary * c1.real;

  return new Complex(real, imaginary);
}

export function abs(c) {
  var discriminant = Math.pow(c.real, 2) + Math.pow(c.imaginary, 2);
  return Math.sqrt(discriminant);
}

