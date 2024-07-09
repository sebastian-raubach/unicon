import { ConversionResult } from '../ConversionResult'
import { SiUnit } from '../SiUnit'
import { WeightUnit } from '../WeightUnit'
import { Gram } from './Gram'

export class Kilogram extends WeightUnit implements SiUnit {
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