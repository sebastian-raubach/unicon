import { WeightUnit } from '../WeightUnit'

export class Pound extends WeightUnit {
  constructor() {
    super('unitWeightPound', ['lb', 'pound', 'pounds'])
  }

  toSiUnit(value: number): number {
    return value * 0.45359237
  }
  fromSiUnit(value: number): number {
    return value / 0.45359237
  }
}