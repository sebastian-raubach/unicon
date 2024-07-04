import { ConversionResult } from '../ConversionResult'
import { VolumeUnit } from '../VolumeUnit'

export class PintUs extends VolumeUnit {
  constructor() {
    super('unitVolumePintUs', 'pt US', ['pint', 'pt', 'pt US', 'pt (US)', 'pint US', 'pint (US)', 'pints'])
  }

  toSiUnit(value: number): number {
    return value / 2113.3764188652
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 2113.3764188652)
  }
}