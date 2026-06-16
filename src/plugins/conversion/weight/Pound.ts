import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { Ounce } from '@/plugins/conversion/weight/Ounce'

export class Pound extends WeightUnit {
  constructor () {
    super('unitWeightPound', 'lb', ['lb', 'pound', 'pounds', 'pfund'], false, new Ounce())
  }

  toSiUnit (value: number): number {
    return value / 2.2046226218
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 2.2046226218)
  }
}
