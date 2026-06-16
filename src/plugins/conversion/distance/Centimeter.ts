import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Millimeter } from '@/plugins/conversion/distance/Millimeter'

export class Centimeter extends DistanceUnit {
  constructor () {
    super('unitDistanceCentimeter', 'cm', ['cm', 'centimeter', 'centimetre', 'centimeters', 'centimetres', 'zentimeter'], false, new Millimeter())
  }

  toSiUnit (value: number): number {
    return value / 100
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 100)
  }
}
