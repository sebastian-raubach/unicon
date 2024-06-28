export abstract class Unit {
  name: string
  abbreviations: string[]

  constructor(name: string, abbreviations: string[]) {
    this.name = name
    this.abbreviations = abbreviations
  }

  abstract toSiUnit(value: number): number
  abstract fromSiUnit(value: number): number
}
