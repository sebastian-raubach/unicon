import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'

export class Milligram extends WeightUnit {
  constructor() {
    super('unitWeightMilligram', 'mg', ['mg', 'milligram', 'milligrams', 'gramm', 'milligramm'], false)
  }

  toSiUnit(value: number): number {
    return value / 1000000.0
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000000.0)
  }
}