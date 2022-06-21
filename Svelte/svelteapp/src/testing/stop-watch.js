export class StopWatch {
  #t0 = new Date();

  start() {
    this.#t0 = new Date();
  }

  stop() {
    const t1 = new Date();
    var timeElapsedInMs = t1 - this.#t0;
    return timeElapsedInMs;
  }
}

// var t0 = 0;

// export function startTimer() {
//   t0 = Date.now();
//   console.log(`t0 = ${t0}`);
// }

// export function stopTimer() {
//   let t1 = Data.now();
//   console.log(`t1 = ${t1}`);
//   return t1 - t0;
// }
