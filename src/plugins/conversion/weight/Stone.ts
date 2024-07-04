import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Pound } from './Pound'

export class Stone extends WeightUnit {
  constructor() {
    super('unitWeightStone', 'st', ['st', 'stone', 'stones', 'stein', 'steine'], new Pound())
  }

  toSiUnit(value: number): number {
    return value * 6.35029497
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 6.35029497)
  }
}
