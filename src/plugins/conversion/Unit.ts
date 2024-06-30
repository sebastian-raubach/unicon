export abstract class Unit {
  name: string
  abbreviations: string[]
  type: string

  constructor(name: string, abbreviations: string[], type: string) {
    this.name = name
    this.abbreviations = abbreviations
    this.type = type
  }

  abstract toSiUnit(value: number): number
  abstract fromSiUnit(value: number): number
}
