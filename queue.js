export default class Queue {
    constructor(){
        this.$data = [];
    }
    get data(){
        return this.$data;
    }

    isEmpty() {
        return this.$data.length === 0;
    }
    enqueue(val) {
        this.$data.push(val);
        return this;
    }
    dequeue() {
        return this.$data.shift();
    }
}