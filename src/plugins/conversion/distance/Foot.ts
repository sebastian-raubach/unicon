import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Inch } from '@/plugins/conversion/distance/Inch'

export class Foot extends DistanceUnit {
  constructor () {
    super('unitDistanceFoot', 'ft', ['ft', 'foot', 'feet', 'fuß', 'füße'], false, new Inch())
  }

  toSiUnit (value: number): number {
    return value / 3.28084
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 3.28084)
  }
}
