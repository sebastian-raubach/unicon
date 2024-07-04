import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'

export class Pound extends WeightUnit {
  constructor() {
    super('unitWeightPound', 'lb', ['lb', 'pound', 'pounds', 'pfund'])
  }

  toSiUnit(value: number): number {
    return value * 0.45359237
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 0.45359237)
  }
}