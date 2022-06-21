<template>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-3">Test 2</h1>
            <button type="button" class="btn btn-primary btn-lg" @click="this.startStressTest">Start</button>
        </div>
    </div>
    <div class="row">
        <div class="col-6" v-for="person in this.personData" :key="person.id">
            <div class="card mt-3">
                <div class="card-header" style="background-color:rgb(41, 95, 214); color:white">
                    Person {{ person.id }}
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <InputField label="Vorname" :value="person.firstName" :id="person.firstName"
                                    :readonly="true" />
                            </div>
                            <div class="form-group col-md-6">
                                <InputField label="Nachname" :value="person.lastName" :id="person.lastName"
                                    :readonly="true" />
                            </div>
                        </div>

                        <div class="form-group">
                            <InputField label="Adresse" :value="person.address" :id="person.address"
                                :readonly="false" />
                        </div>

                        <div class="form-group">
                            <InputField label="Adresse 2" :value="person.address2" :id="person.address2"
                                :readonly="false" />
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-5">
                                <InputField label="Stadt" :value="person.city" :id="person.city" :readonly="false" />
                            </div>
                            <div class="form-group col-md-2">
                                <InputField label="PLZ" :value="person.zip" :id="person.zip" :readonly="false" />
                            </div>
                            <div class="form-group col-md-5">
                                <InputField label="Land" :value="person.country" :id="person.country"
                                    :readonly="false" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from "@/components/shared/InputField.vue";
import { StopWatch } from "./../testing/stop-watch";
import { Person } from "./../models/person";
import { ApdexCalculator } from "./../testing/apdex-calculator";

export default {
    name: "Test-2",
    components: {
        InputField
    },
    data() {
        return {
            testStarted: false,
            stopWatch: new StopWatch(),
            testResults: [],
            personData: Array.from({ length: 250 }, (_, i) => i + 1).map((i) => new Person
                (
                    i,
                    `Vorname ${i}`,
                    `Nachname ${i}`,
                    `Adresse - ${i}`,
                    `Adresse 2 - ${i}`,
                    `City ${i}`,
                    `100${i}`,
                    `Country ${i}`
                ))

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
                        .from({ length: 25 }, (_, i) => i + 1)
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
                        .from({ length: 250 }, (_, i) => i + 1)
                        .map((i) => new Person(i, `Vorname ${i}`, `Nachname ${i}`, `Adresse - ${i}`, `Adresse 2 - ${i}`, `City ${i}`, `100${i}`, `Country ${i}`));

                    await new Promise((r) => setTimeout(r, 1));
                }

                this.testStarted = false;

                console.log("Stresstest beendet.");
                console.log(`Fertig mit ${sampleSize} Proben.`);
            }
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
