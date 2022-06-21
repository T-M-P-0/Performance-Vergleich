import { RenderResult } from "./render-result";
import { ApdexResult } from "./apdex-result";

export class ApdexCalculator {
  constructor(treshold) {

    this.treshold = treshold;
  }

  get frustratedZoneStart() {

    return Math.round(this.treshold * 1.5);
  }

  getApdexScore(results) {

    var counter = {
      satisfiedResultsCount: 0,
      toleratingResultsCount: 0,
      frustratingResultsCount: 0,
    };
    const renderResults = [];
    const totalSamplesSize = results.length / 2;
    do {

      var resultSet = results.slice(0, 2);
      var timeForRemovingAllItemsFromUI = resultSet[0];
      var timeForAddingItemsBackToUI = resultSet[1];

      var renderTime = timeForRemovingAllItemsFromUI + timeForAddingItemsBackToUI;

      counter = this.#validateResult(counter, renderTime);

      renderResults.push(new RenderResult(timeForRemovingAllItemsFromUI, timeForAddingItemsBackToUI))
      results = results.slice(2);
    } while (results.length != 0)

    const score = this.#calculateApdexScore(counter.satisfiedResultsCount, counter.toleratingResultsCount, totalSamplesSize);

    const result = new ApdexResult(totalSamplesSize, score, counter, renderResults)

    return result;
  }


  #validateResult(counterData, renderTime) {

    if (renderTime <= this.treshold) {
      counterData.satisfiedResultsCount++;
    }

    if (renderTime > this.treshold && renderTime <= this.frustratedZoneStart) {
      counterData.toleratingResultsCount++;
    }

    if (renderTime > this.frustratedZoneStart) {
      counterData.frustratingResultsCount++;
    }

    return counterData;
  }

  #calculateApdexScore(satisfiedCount, toleratingCount, totalSamples) {

    var result = (satisfiedCount + (toleratingCount / 2)) / totalSamples;
    return result;
  }
}

// function getApdexScore(results) {
//   var counter = {
//     satisfiedResultsCount: 0,
//     toleratingResultsCount: 0,
//     frustratingResultsCout: 0,
//   };

//   do {
//     var resultSet = results.slice(0, 1);
//     timeForRemovingAllItemsFromUI = resultSet[0];
//     timeForAddingItemsBackToUI = resultSet[1];

//     var reRenderTime =
//       timeForRemovingAllItemsFromUI + timeForAddingItemsBackToUI;

//     counter = validateResult(counter, reRenderTime);
//     results = results.slice(1, results.length - 1);
//   } while (results.length != 0);

//   score = calculateApdexScore(
//     counter.satisfiedResultsCount,
//     counter.toleratingResultsCount,
//     counter.frustratingResultsCout
//   );
//   return score;
// }

// function validateResult(counterData, renderTime) {
//   if (renderTime <= this.treshold) {
//     counterData.satisfiedResultsCount++;
//   }

//   if (renderTime > this.treshold && renderTime <= this.frustratedZoneStart) {
//     counterData.toleratingResultsCount++;
//   }

//   if (renderTime > this.frustratedZoneStart) {
//     counterData.toleratingResultsCount++;
//   }

//   return counterData;
// }

// function calculateApdexScore(satisfiedCount, toleratingCount, totalSamples) {
//   return (satisfiedCount + toleratingCount / 2) / totalSamples;
// }