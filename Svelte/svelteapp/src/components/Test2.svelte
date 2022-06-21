<script>
  import InputField from "./shared/input-field.svelte";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { Person } from "./../models/person";
  import { StopWatch } from "./../testing/stop-watch";
  import { ApdexCalculator } from "./../testing/apdex-calculator";

  var data = Array.from({ length: amountOfData }, (_, i) => i + 1).map(
    (i) =>
      new Person(
        i,
        `Vorname ${i}`,
        `Nachname ${i}`,
        `Adresse - ${i}`,
        `Adresse 2 - ${i}`,
        `City ${i}`,
        `100${i}`,
        `Country ${i}`
      )
  );

  const amountOfData = 250;
  var testStarted = false;
  const stopWatch = new StopWatch();
  const testResults = [];

  async function startApdexTest() {
    testStarted = true;
    const sampleSize = 100;

    for (let i = 0; i < sampleSize; i++) {
      data = [];
      await new Promise((r) => setTimeout(r, 1));
      data = Array.from({ length: amountOfData }, (_, i) => i + 1).map(
        (i) =>
          new Person(
            i,
            `Vorname ${i}`,
            `Nachname ${i}`,
            `Adresse - ${i}`,
            `Adresse 2 - ${i}`,
            `City ${i}`,
            `100${i}`,
            `Country ${i}`
          )
      );

      await new Promise((r) => setTimeout(r, 1));
    }

    testStarted = false;

    const sumResult = testResults.reduce((acc, n) => acc + n, 0);
    const avgRenderResult = Math.round(sumResult / (testResults.length / 2));

    const apdexCalculator = new ApdexCalculator(avgRenderResult);
    const apdexResult = apdexCalculator.getApdexScore(testResults);

    writeResultToConsole(apdexResult, avgRenderResult);

    testResults = [];
  }

  async function startStressTest() {
    testStarted = true;
    const sampleSize = 1000;

    for (let i = 0; i < sampleSize; i++) {
      data = [];
      await new Promise((r) => setTimeout(r, 1));
      data = Array.from({ length: amountOfData }, (_, i) => i + 1).map(
        (i) =>
          new Person(
            i,
            `Vorname ${i}`,
            `Nachname ${i}`,
            `Adresse - ${i}`,
            `Adresse 2 - ${i}`,
            `City ${i}`,
            `100${i}`,
            `Country ${i}`
          )
      );

      await new Promise((r) => setTimeout(r, 1));
    }

    testStarted = false;
    console.log("Stresstest beendet.");
    console.log(`Fertig mit ${sampleSize} Proben.`);
    console.log(`Menge der Daten ${amountOfData}`);
  }

  function writeResultToConsole(result, avgRenderResult) {
    console.log(`Durchschnittliche Renderzeit: ${avgRenderResult}`);
    console.log();
    console.log(
      `Elemente in der \"Satisfied Zone\": ${result.counter.satisfiedResultsCount}`
    );
    console.log(
      `Elemente in der \"Tolerating Zone\: ${result.counter.toleratingResultsCount}`
    );
    console.log(
      `Elemente in der \"Frustrating Zone\": ${result.counter.frustratingResultsCount}`
    );
    console.log(`Anzahl der Proben: ${result.sampleSize}`);
    console.log(`APDEX Score: ${result.apdexScore}`);
    console.log();
    console.log("Alle Render-Resultate:");
    result.renderResults.forEach((item) =>
      console.log(
        `Zeit für das entfernen der Elemente: ${item.timeForRemovingElements}\nZeit für das hinzufügen der Elemente: ${item.timeForAddingElements} => Gesamt: ${item.totalTime}`
      )
    );
  }

  beforeUpdate(() => {
    if (testStarted) {
      stopWatch.start();
    }
  });

  afterUpdate(() => {
    if (testStarted) {
      let result = stopWatch.stop();
      testResults.push(result);
    }
  });
</script>

<div class="jumbotron">
  <div class="container">
    <h1 class="display-3">Test 2</h1>
    <button type="button" class="btn btn-primary btn-lg" on:click={startStressTest}
      >Start</button
    >
  </div>
</div>
<div class="row">
  {#each data as person}
    <div class="col-6">
      <div class="card mt-3">
        <div
          class="card-header"
          style="background-color:rgb(41, 95, 214); color:white"
        >
          Person {person.id}
        </div>
        <div class="card-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <InputField
                  label="Vorname"
                  value={person.firstName}
                  id={person.firstName}
                  readonly={true}
                />
              </div>
              <div class="form-group col-md-6">
                <InputField
                  label="Nachname"
                  value={person.lastName}
                  id={person.lastName}
                  readonly={true}
                />
              </div>
            </div>

            <div class="form-group">
              <InputField
                label="Adresse"
                value={person.address}
                id={person.address}
                readonly={false}
              />
            </div>

            <div class="form-group">
              <InputField
                label="Adresse 2"
                value={person.address2}
                id={person.address2}
                readonly={false}
              />
            </div>

            <div class="form-row">
              <div class="form-group col-md-5">
                <InputField
                  label="Stadt"
                  value={person.city}
                  id={person.city}
                  readonly={false}
                />
              </div>
              <div class="form-group col-md-2">
                <InputField
                  @label="PLZ"
                  @value={person.zip}
                  @id={person.zip}
                  @readonly={false}
                />
              </div>
              <div class="form-group col-md-5">
                <InputField
                  label="Land"
                  value={person.country}
                  id={person.country}
                  readonly={false}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/each}
</div>
