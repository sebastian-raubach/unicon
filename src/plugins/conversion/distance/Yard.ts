import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'
import { Foot } from '@/plugins/conversion/distance/Foot'

export class Yard extends DistanceUnit {
  constructor () {
    super('unitDistanceYard', 'yd', ['yd', 'yard', 'yards'], false, new Foot())
  }

  toSiUnit (value: number): number {
    return value / 1.0936132983
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1.0936132983)
  }
}
