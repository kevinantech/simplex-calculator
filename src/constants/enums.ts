export enum EObjectiveType {
  MAX = "max",
  MIN = "min",
}

export enum EVariableType {
  NON_BASIC = "X",
  SLACK = "S",
  ARTIFICIAL = "A",
  LIMIT = "K",
}

export enum EConstraintType {
  LESS = "less",
  EQUAL = "equal",
  MORE = "more",
}
