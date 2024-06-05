export class WPCriterionWeight {
  public criterionId: string;
  public weight: number;

  public constructor(criterionId: string, weight: number) {
    this.criterionId = criterionId;
    this.weight = weight;
  }
}
