export class Todo {
  id: number;
  checked = false;
  createdAt: number;

  constructor(public title: string) {
    this.id = this.createdAt = Date.now();
  }
}
