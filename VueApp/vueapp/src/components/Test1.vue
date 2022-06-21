<template>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-3">Test 1</h1>
            <button type="button" class="btn btn-primary btn-lg" @click="this.startStressTest">Start</button>
        </div>
    </div>
    <div class="container">
        <div class="mt-3">
            <table class="table table-bordered table-hover table-striped">
                <thead style="background-color:rgb(41, 95, 214); color:white">
                    <tr>
                        <th scope="col"></th>
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
                    <tr v-for="(person, index) in personData" :key="index">
                        <th>
                            <button type="button" class="btn btn-outline-primary">Button</button>
                        </th>
                        <th scope="row">
                            {{ person.id }}
                        </th>
                        <td scope="row">
                            {{ person.firstName }}
                        </td>
                        <td scope="row">
                            {{ person.lastName }}
                        </td>
                        <td scope="row">
                            {{ person.address }}
                        </td>
                        <td scope="row">
                            {{ person.address2 }}
                        </td>
                        <td scope="row">
                            {{ person.city }}
                        </td>
                        <td scope="row">
                            {{ person.zip }}
                        </td>
                        <td scope="row">
                            {{ person.country }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { StopWatch } from "./../testing/stop-watch";
import { Person } from "./../models/person";
import { ApdexCalculator } from "./../testing/apdex-calculator";

export default {
    name: "Test-1",
    data() {
        return {
            testStarted: false,
            stopWatch: new StopWatch(),
            testResults: [],
            personData: Array.from({ length: 1000 }, (_, i) => i + 1).map((i) => new Person
                (
                    i,
                    `Vorname ${i}`,
                    `Nachname ${i}`,
                    `Adresse - ${i}`,
                    `Adresse 2 - ${i}`,
                    `City ${i}`,
                    `100${i}`,
                    `Country ${i}`
                )),
            amountOfData: 1000,
        };
    },

    methods: {
        async startApdexTest() {
            {

                this.testStarted = true;
                this.personData = [];
                const sampleSize = 100;
                for (let i = 0; i < sampleSize; i++) {

                    this.personData = [];
                    await new Promise((r) => setTimeout(r, 1));
                    this.personData = Array
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
        },

        async startStressTest() {
            {

                this.testStarted = true;
                this.personData = [];
                const sampleSize = 1000;
                for (let i = 0; i < sampleSize; i++) {

                    this.personData = [];
                    await new Promise((r) => setTimeout(r, 1));
                    this.personData = Array
                        .from({ length: 1000 }, (_, i) => i + 1)
                        .map((i) => new Person(i, `Vorname ${i}`, `Nachname ${i}`, `Adresse - ${i}`, `Adresse 2 - ${i}`, `City ${i}`, `100${i}`, `Country ${i}`));

                    await new Promise((r) => setTimeout(r, 1));
                }

                this.testStarted = false;

                console.log("Stresstest beendet.");
                console.log(`Fertig mit ${sampleSize} Proben.`);
            }
        },

        getAmountOfData () {
            return 1000;
        },

        writeResultToConsole(result, avgRenderResult) {
            console.log(`Durchschnittliche Renderzeit: ${avgRenderResult}`);
            console.log();
            console.log(`Elemente in der "Satisfied Zone": ${result.counter.satisfiedResultsCount}`);
            console.log(`Elemente in der "Tolerating Zone: ${result.counter.toleratingResultsCount}`);
            console.log(`Elemente in der "Frustrating Zone": ${result.counter.frustratingResultsCount}`);
            console.log(`Anzahl der Proben: ${result.sampleSize}`);
            console.log(`APDEX Score: ${result.apdexScore}`);
            console.log();
            console.log("Alle Render-Resultate:")
            result.renderResults.forEach(item => console.log(`Zeit für das entfernen der Elemente: ${item.timeForRemovingElements}\nZeit für das hinzufügen der Elemente: ${item.timeForAddingElements} => Gesamt: ${item.totalTime}`));
        }
    },

    beforeUpdate() {
        if (this.testStarted) {
            this.stopWatch.start();
        }
    },
    updated() {

        if (this.testStarted) {
            let result = this.stopWatch.stop();
            this.testResults.push(result);
            console.log("updated");
        }
    },
};
</script>

<style lang="css">
</style>
