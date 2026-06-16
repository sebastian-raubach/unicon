import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { Gram } from '@/plugins/conversion/weight/Gram'

export class Kilogram extends WeightUnit {
  constructor () {
    super('unitWeightKilogram', 'kg', ['kg', 'kilogram', 'kilograms', 'kilogramm'], true, new Gram())
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
