import { ConversionResult } from '../ConversionResult'
import { VolumeUnit } from '../VolumeUnit'

export class CubicMeter extends VolumeUnit {
  constructor() {
    super('unitVolumeCubicMeter', 'm3', ['m3', 'cubic meter', 'cubic meters', 'cubic metre', 'cubic metres', 'kubikmeter'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}