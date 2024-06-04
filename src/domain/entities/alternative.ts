export class Alternative {
  public id: string;
  public name: string;
  public marks: { [key: string]: number };

  public constructor(id: string, name: string, marks: { [key: string]: number }) {
    this.id = id;
    this.name = name;
    this.marks = marks;
  }
}
