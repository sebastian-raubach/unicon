import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { Kilogram } from '@/plugins/conversion/weight/Kilogram'

export class MetricTon extends WeightUnit {
  constructor () {
    super('unitWeightMetricTon', 'metric ton', ['metric ton', 't', 'ton', 'tons', 'metric tons', 'tonne', 'tonnes'], false, new Kilogram())
  }

  toSiUnit (value: number): number {
    return value * 1000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1000)
  }
}
