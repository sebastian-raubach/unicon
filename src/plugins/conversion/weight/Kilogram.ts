import { WeightUnit } from '../WeightUnit'

export class Kilogram extends WeightUnit {
  constructor() {
    super('unitWeightKilogram', ['kg', 'kilogram', 'kilograms'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}