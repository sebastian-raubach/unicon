import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Centimeter } from '@/plugins/conversion/distance/Centimeter'

export class Meter extends DistanceUnit {
  constructor () {
    super('unitDistanceMeter', 'm', ['m', 'meter', 'metre', 'meters', 'metres'], true, new Centimeter())
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
