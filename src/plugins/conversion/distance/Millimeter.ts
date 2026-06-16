import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'

export class Millimeter extends DistanceUnit {
  constructor () {
    super('unitDistanceMillimeter', 'mm', ['mm', 'millimeter', 'millimetre', 'millimeters', 'millimetres'], false)
  }

  toSiUnit (value: number): number {
    return value / 1000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}
