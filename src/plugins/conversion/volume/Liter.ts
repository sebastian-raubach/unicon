import { VolumeUnit } from '../VolumeUnit'

export class Liter extends VolumeUnit {
  constructor() {
    super('unitVolumeLiter', 'l', ['l', 'liter', 'litre', 'litres', 'liters'])
  }

  toSiUnit(value: number): number {
    return value / 1000.0
  }
  fromSiUnit(value: number): number {
    return value * 1000.0
  }
}