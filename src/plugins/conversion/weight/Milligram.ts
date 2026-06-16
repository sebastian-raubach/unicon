import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'

export class Milligram extends WeightUnit {
  constructor () {
    super('unitWeightMilligram', 'mg', ['mg', 'milligram', 'milligrams', 'gramm', 'milligramm'], false)
  }

  toSiUnit (value: number): number {
    return value / 1_000_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1_000_000)
  }
}
