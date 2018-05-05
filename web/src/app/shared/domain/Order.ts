export class Order {

  date: string;
  time: string;
  phone: string;

  address: string;

  couch: boolean;
  cover: boolean;
  mattress: boolean;
  chair: boolean;
  armchair: boolean;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public toJSON() {
    return {
      phone: this.phone,
      date: this.date
    }
  }
}
