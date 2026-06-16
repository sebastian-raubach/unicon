import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Meter } from '@/plugins/conversion/distance/Meter'

export class Kilometer extends DistanceUnit {
  constructor () {
    super('unitDistanceKilometer', 'km', ['km', 'kilometer', 'kilometre', 'kilometers', 'kilometres'], false, new Meter())
  }

  toSiUnit (value: number): number {
    return value * 1000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1000)
  }
}
