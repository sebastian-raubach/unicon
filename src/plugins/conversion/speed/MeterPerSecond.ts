import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { SpeedUnit } from '@/plugins/conversion/SpeedUnit'

export class MeterPerSecond extends SpeedUnit {
  constructor () {
    super('unitSpeedMeterPerSecond', 'm/s', ['m/s', 'meter/second', 'metre/second', 'meters/second', 'metres/second', 'meter per second', 'metre per second', 'meters per second', 'metres per second', 'meter/sekunde', 'meter pro sekunde'], true)
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
