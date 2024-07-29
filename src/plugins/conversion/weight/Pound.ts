import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Ounce } from './Ounce'

export class Pound extends WeightUnit {
  constructor() {
    super('unitWeightPound', 'lb', ['lb', 'pound', 'pounds', 'pfund'], false, new Ounce())
  }

  toSiUnit(value: number): number {
    return value / 2.2046226218
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 2.2046226218)
  }
}