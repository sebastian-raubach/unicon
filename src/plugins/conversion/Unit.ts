export abstract class Unit {
  name: string
  primaryAbbreviation: string
  abbreviations: string[]
  type: string

  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], type: string) {
    this.name = name
    this.primaryAbbreviation = primaryAbbreviation
    this.abbreviations = abbreviations
    this.type = type
  }

  abstract toSiUnit(value: number): number
  abstract fromSiUnit(value: number): number
}
