import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { VolumeUnit } from '@/plugins/conversion/VolumeUnit'

export class Liter extends VolumeUnit {
  constructor () {
    super('unitVolumeLiter', 'l', ['l', 'liter', 'litre', 'litres', 'liters'], false)
  }

  toSiUnit (value: number): number {
    return value / 1000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}
