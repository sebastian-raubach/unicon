import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { Milligram } from '@/plugins/conversion/weight/Milligram'

export class Gram extends WeightUnit {
  constructor () {
    super('unitWeightGram', 'g', ['g', 'gram', 'grams', 'gramm'], false, new Milligram())
  }

  toSiUnit (value: number): number {
    return value / 1000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}
