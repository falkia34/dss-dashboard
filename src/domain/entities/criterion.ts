export class Criterion {
  public id: string;
  public name: string;
  public type: 'cost' | 'benefit';

  public constructor(id: string, name: string, type: 'cost' | 'benefit') {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
