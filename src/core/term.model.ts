import { EVariableType, termDelimiter } from "@/constants";

export class Term {
  private coefficient: number;
  readonly key: string;
  readonly type: EVariableType;
  readonly subindex: number;
  readonly isArtificial: boolean;

  constructor(
    type: EVariableType,
    subindex: number,
    coefficient: number = 0,
    isArtificial: boolean = false
  ) {
    this.coefficient = coefficient;
    this.key = type + termDelimiter + subindex;
    this.isArtificial = isArtificial;
    this.subindex = subindex;
    this.type = type;
  }

  public setCoefficient(coefficient: number) {
    this.coefficient = coefficient;
  }

  clone(): Term {
    return new Term(this.type, this.subindex, this.coefficient, this.isArtificial);
  }
}
