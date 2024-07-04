import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Gram } from './Gram'

export class Kilogram extends WeightUnit {
  constructor() {
    super('unitWeightKilogram', 'kg', ['kg', 'kilogram', 'kilograms', 'kilogramm'], new Gram())
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}