import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { Pound } from '@/plugins/conversion/weight/Pound'

export class Stone extends WeightUnit {
  constructor () {
    super('unitWeightStone', 'st', ['st', 'stone', 'stones', 'stein', 'steine'], false, new Pound())
  }

  toSiUnit (value: number): number {
    return value * 6.35029497
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 6.35029497)
  }
}
