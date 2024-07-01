import { VolumeUnit } from '../VolumeUnit'

export class CubicMeter extends VolumeUnit {
  constructor() {
    super('unitVolumeCubicMeter', ['m3', 'cubic meter', 'cubic meters', 'cubic metre', 'cubic metres'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}