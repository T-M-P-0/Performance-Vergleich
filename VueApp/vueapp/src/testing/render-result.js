export class RenderResult{
    constructor(timeForRemovingElements, timeForAddingElements){
        this.timeForRemovingElements = timeForRemovingElements;
        this.timeForAddingElements = timeForAddingElements;
    }

    get totalTime(){
        return this.timeForRemovingElements + this.timeForAddingElements;
    }
}