<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { Person } from "./../models/person";
  import { StopWatch } from "./../testing/stop-watch";
  import { ApdexCalculator } from "./../testing/apdex-calculator";

  const amountOfData = 1000;
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
    <h1 class="display-3">Test 1</h1>
    <button
      type="button"
      class="btn btn-primary btn-lg"
      on:click={startStressTest}>Start</button
    >
  </div>
</div>
<div class="container">
  <div class="mt-3">
    <table class="table table-bordered table-hover table-striped">
      <thead style="background-color:rgb(41, 95, 214); color:white">
        <tr>
          <th scope="col" />
          <th scope="col">Id</th>
          <th scope="col">Vorname</th>
          <th scope="col">Nachname</th>
          <th scope="col">Adresse 1</th>
          <th scope="col">Adresse 2</th>
          <th scope="col">Stadt</th>
          <th scope="col">PLZ</th>
          <th scope="col">Land</th>
        </tr>
      </thead>
      <tbody>
        {#each data as person}
          <tr>
            <th>
              <button type="button" class="btn btn-outline-primary"
                >Button</button
              >
            </th>

            <th scope="row">
              {person.id}
            </th>
            <td>
              {person.firstName}
            </td>
            <td>
              {person.lastName}
            </td>
            <td>
              {person.address}
            </td>
            <td>
              {person.address2}
            </td>
            <td>
              {person.city}
            </td>
            <td>
              {person.zip}
            </td>
            <td>
              {person.country}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
