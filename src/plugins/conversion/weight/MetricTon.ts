import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Kilogram } from './Kilogram'

export class MetricTon extends WeightUnit {
  constructor() {
    super('unitWeightMetricTon', 'metric ton', ['metric ton', 't', 'ton', 'tons', 'metric tons', 'tonne', 'tonnes'], new Kilogram())
  }

  toSiUnit(value: number): number {
    return value * 1000.0
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1000.0)
  }
}