export class WPAlternativeVector {
  public alternativeId: string;
  public sVector: number;
  public vVector: number;

  public constructor(alternativeId: string, sVector: number, vVector: number) {
    this.alternativeId = alternativeId;
    this.sVector = sVector;
    this.vVector = vVector;
  }
}
