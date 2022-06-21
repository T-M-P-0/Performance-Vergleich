<template>

    <div class="jumbotron">
        <div class="container">
            <h1 class="display-3">Test 3</h1>
            <button type="button" class="btn btn-primary btn-lg" @click="this.startStressTest">Start</button>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div v-for="row in this.rows" :key="row" class="row mb-3">
                <div class="col-md-3">
                    <h2 style="color:rgb(41, 95, 214)">Beispieltext</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                        magna
                        mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-secondary" href="https://vuejs.org/" target="_blank" role="button"
                            rel="noopener noreferrer">Visit &rarr;</a></p>
                </div>
                <div class="col-md-5 mt-3">
                    <div class="container">
                        <img src="assets/work.jpg" class="img-fluid img-thumbnail" alt="Ember">
                    </div>
                </div>
                <div class="col-md-3">
                    <h2 style="color:rgb(41, 95, 214)">Beispieltext</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
                        magna
                        mollis euismod. Donec sed odio dui. </p>
                    <p><a class="btn btn-secondary" href="https://vuejs.org/" target="_blank" role="button"
                            rel="noopener noreferrer">Visit &rarr;</a></p>
                </div>
                <div class="container col-12" style="width:fit-content; height:fit-content">
                    <img src="assets/nasa.jpg" target="_blank" class="img-fluid rounded-circle" alt="Ember">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { StopWatch } from "./../testing/stop-watch";
import { ApdexCalculator } from "./../testing/apdex-calculator";

export default {
    name: "Test-3",
    data() {
        return {
            rows: new Array(500),
            testStarted: false,
            stopWatch: new StopWatch(),
            testResults: [],
        };
    },
    methods: {
        async startTest() {
            {

                this.testStarted = true;
                const sampleSize = 100;

                for (let i = 0; i < sampleSize; i++) {

                    this.rows = [];
                    await new Promise((r) => setTimeout(r, 1));
                    this.rows = new Array(50);

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

                    this.rows = [];
                    await new Promise((r) => setTimeout(r, 1));
                    this.rows = new Array(500);

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
        }
    },
    mounted() {
    }
}
</script>