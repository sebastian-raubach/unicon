import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Milligram } from './Milligram'

export class Gram extends WeightUnit {
  constructor() {
    super('unitWeightGram', 'g', ['g', 'gram', 'grams', 'gramm'], false, new Milligram())
  }

  toSiUnit(value: number): number {
    return value / 1000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}