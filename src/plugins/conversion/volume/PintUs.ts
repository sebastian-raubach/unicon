import { VolumeUnit } from '../VolumeUnit'

export class PintUs extends VolumeUnit {
  constructor() {
    super('unitVolumePintUs', ['pint', 'pt', 'pt US', 'pt (US)', 'pint US', 'pint (US)', 'pints'])
  }

  toSiUnit(value: number): number {
    return value / 2113.3764188652
  }
  fromSiUnit(value: number): number {
    return value * 2113.3764188652
  }
}