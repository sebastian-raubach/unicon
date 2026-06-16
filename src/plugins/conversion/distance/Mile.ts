import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Yard } from '@/plugins/conversion/distance/Yard'

export class Mile extends DistanceUnit {
  constructor () {
    super('unitDistanceMile', 'mi', ['mi', 'mile', 'miles', 'meile', 'meilen'], false, new Yard())
  }

  toSiUnit (value: number): number {
    return value * 1609.344
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1609.344)
  }
}
