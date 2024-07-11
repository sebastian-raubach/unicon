import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Pound } from './Pound'

export class ShortTon extends WeightUnit {
  constructor() {
    super('unitWeightShortTon', 'ton US', ['ton US', 't', 'ton', 'tons', 't (US)', 't US', 'ton (US)', 'tons US', 'tons (US)', 'short ton', 'short tons', 'tonne', 'tonnes'], new Pound())
  }

  toSiUnit(value: number): number {
    return value * 907.18474
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 907.18474)
  }
}