import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'

export class Ounce extends WeightUnit {
  constructor() {
    super('unitWeightOunce', 'oz', ['oz', 'ounce', 'ounces', 'unze', 'unzen'], false)
  }

  toSiUnit(value: number): number {
    return value / 35.2739619496
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 35.2739619496)
  }
}