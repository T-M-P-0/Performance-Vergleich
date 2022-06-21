import Component from "@ember/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { Person } from "./../models/person";
import { StopWatch } from "./../testing/stop-watch";
import { ApdexCalculator } from "../testing/apdex-calculator";

export default class Test2Component extends Component {

  @tracked data = Array.from({ length: this.amountOfData }, (_, i) => i + 1).map((i) => new Person
    (
      i,
      `Vorname ${i}`,
      `Nachname ${i}`,
      `Adresse - ${i}`,
      `Adresse 2 - ${i}`,
      `City ${i}`,
      `100${i}`,
      `Country ${i}`
    ));

  @action async startApdexTest() {

    this.testStarted = true;
    const sampleSize = 100;

    for (let i = 0; i < sampleSize; i++) {

      this.data = [];
      // Refreshing
      await new Promise((r) => setTimeout(r, 1));
      this.data = Array
        .from({ length: this.amountOfData }, (_, i) => i + 1)
        .map((i) => new Person(i, `Vorname ${i}`, `Nachname ${i}`, `Adresse - ${i}`, `Adresse 2 - ${i}`, `City ${i}`, `100${i}`, `Country ${i}`));

      await new Promise((r) => setTimeout(r, 1));
    }

    this.testStarted = false;

    const sumResult = this.testResults.reduce((acc, n) => acc + n, 0);
    const avgRenderResult = Math.round(sumResult / (this.testResults.length / 2));

    const apdexCalculator = new ApdexCalculator(avgRenderResult);
    const apdexResult = apdexCalculator.getApdexScore(this.testResults);

    this.writeResultToConsole(apdexResult, avgRenderResult);

    this.testResults = [];
  }

  @action async startStressTest() {

    this.testStarted = true;
    const sampleSize = 1000;

    for (let i = 0; i < sampleSize; i++) {

      this.data = [];
      await new Promise((r) => setTimeout(r, 1));
      this.data = Array
        .from({ length: this.amountOfData }, (_, i) => i + 1)
        .map((i) => new Person(i, `Vorname ${i}`, `Nachname ${i}`, `Adresse - ${i}`, `Adresse 2 - ${i}`, `City ${i}`, `100${i}`, `Country ${i}`));

      await new Promise((r) => setTimeout(r, 1));
    }

    this.testStarted = false;
    console.log("Stresstest beendet.");
    console.log(`Anzahl der Proben: ${sampleSize}`);
    console.log(`Menge der Daten: ${this.amountOfData}`);
  }

  amountOfData = 250;
  testStarted = false;
  stopWatch = new StopWatch();
  testResults = [];

  didUpdateAttr() {
    this._super();

    if (this.testStarted) {
      console.log("Attribute  started");

    }
  }

  willUpdate() {
    this._super();
    if (this.testStarted) {
      this.stopWatch.start();
    }
  }

  didRender() {
    this._super();

    if (this.testStarted) {
      let result = this.stopWatch.stop();
      this.testResults.push(result);
    }
  }

  writeResultToConsole(result, avgRenderResult) {
    console.log(`Durchschnittliche Renderzeit: ${avgRenderResult}`);
    console.log();
    console.log(`Elemente in der \"Satisfied Zone\": ${result.counter.satisfiedResultsCount}`);
    console.log(`Elemente in der \"Tolerating Zone\: ${result.counter.toleratingResultsCount}`);
    console.log(`Elemente in der \"Frustrating Zone\": ${result.counter.frustratingResultsCount}`);
    console.log(`Anzahl der Proben: ${result.sampleSize}`);
    console.log(`APDEX Score: ${result.apdexScore}`);
    console.log();
    console.log("Alle Render-Resultate:")
    result.renderResults.forEach(item => console.log(`Zeit für das entfernen der Elemente: ${item.timeForRemovingElements}\nZeit für das hinzufügen der Elemente: ${item.timeForAddingElements} => Gesamt: ${item.totalTime}`));
  }
}
