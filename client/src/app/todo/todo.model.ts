export class Todo {

  id: string;
  activity: string;
  cost: number;
  timestamp?: number;

  constructor(id: string, activity: string, cost: number, timestamp?: number) {
    this.id = id;
    this.activity = activity;
    this.cost = cost;
    this.timestamp = timestamp;
  }
}
