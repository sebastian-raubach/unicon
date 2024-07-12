import { ConversionResult } from './ConversionResult'

export abstract class Unit {
  name: string
  primaryAbbreviation: string
  abbreviations: string[]
  isSiUnit: boolean
  type: string
  subUnit: Unit | undefined

  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], isSiUnit: boolean, type: string, subUnit?: Unit) {
    this.name = name
    this.primaryAbbreviation = primaryAbbreviation
    this.abbreviations = abbreviations
    this.isSiUnit = isSiUnit
    this.type = type
    this.subUnit = subUnit
  }

  abstract toSiUnit(value: number): number
  abstract fromSiUnit(value: number): ConversionResult[]

  adjustSubUnits(original: number, converted: number): ConversionResult[] {
    let result = [new ConversionResult(this.name, this.subUnit ? Math.floor(converted) : converted)]

    if (this.subUnit) {
      // Check if we can get sub-units in there
      const si = this.toSiUnit(Math.floor(converted))
      const remainder = original - si
      if (remainder > 0) {
        result = result.concat(this.subUnit.fromSiUnit(remainder))
      }
    }

    return result
  }
}
