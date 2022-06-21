export class ApdexResult{
    constructor(
        sampleSize, apdexScore, counter, renderResults){
            this.sampleSize = sampleSize;
            this.apdexScore = apdexScore;
            this.counter = counter;
            this.renderResults = renderResults;
        }
}