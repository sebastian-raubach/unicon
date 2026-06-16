import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Kilometer } from '@/plugins/conversion/distance/Kilometer'

export class Parsec extends DistanceUnit {
  constructor () {
    super('unitDistanceParsec', 'pc', ['pc', 'parsec', 'parsecs'], false, new Kilometer())
  }

  toSiUnit (value: number): number {
    return value * 30_856_775_812_800_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 30_856_775_812_800_000)
  }
}
