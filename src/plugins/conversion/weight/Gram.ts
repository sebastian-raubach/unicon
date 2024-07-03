import { WeightUnit } from '../WeightUnit'

export class Gram extends WeightUnit {
  constructor() {
    super('unitWeightGram', 'g', ['g', 'gram', 'grams', 'gramm'])
  }

  toSiUnit(value: number): number {
    return value / 1000
  }
  fromSiUnit(value: number): number {
    return value * 1000
  }
}