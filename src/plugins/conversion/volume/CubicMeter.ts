import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { VolumeUnit } from '@/plugins/conversion/VolumeUnit'

export class CubicMeter extends VolumeUnit {
  constructor () {
    super('unitVolumeCubicMeter', 'm3', ['m3', 'cubic meter', 'cubic meters', 'cubic metre', 'cubic metres', 'kubikmeter'], true)
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
