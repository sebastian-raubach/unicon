import { WeightUnit } from '../WeightUnit'

export class Stone extends WeightUnit {
  constructor() {
    super('unitWeightStone', 'st', ['st', 'stone', 'stones', 'stein', 'steine'])
  }

  toSiUnit(value: number): number {
    return value * 6.35029497
  }
  fromSiUnit(value: number): number {
    return value / 6.35029497
  }
}
