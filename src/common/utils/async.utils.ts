export class ParallelAsync {
  promises: Promise<any>[];
  constructor(promises?: Promise<any>[]) {
    this.promises = [];
    if (promises) this.promises = promises;
  }

  add(promise: Promise<any>) {
    this.promises.push(promise);
  }

  async done(): Promise<any[]> {
    return Promise.all(this.promises);
  }
}
