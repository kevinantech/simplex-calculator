import { EVariableType, termDelimiter } from "@/constants";

export class OFTerm {
  readonly key: string;
  readonly type: EVariableType;
  readonly subindex: number;

  constructor(type: EVariableType, subindex: number) {
    this.type = type;
    this.subindex = subindex;
    this.key = type + termDelimiter + subindex;
  }
}
