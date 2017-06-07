class Counter {
    async run() {   
        await this.two();
        await this.one();
        await this.three();
        return Promise.resolve();
    }
     one() {
        console.log('one');
        return Promise.resolve();
    }
     two() {
        console.log('two');
        return Promise.resolve();
    }
     three() {
        console.log('three');
        return Promise.resolve();
    }
}
let counter = new Counter();
counter.run();