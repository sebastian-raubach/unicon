import { ConversionResult } from '../ConversionResult'
import { SpeedUnit } from '../SpeedUnit'

export class FootPerSecond extends SpeedUnit {
  constructor() {
    super('unitSpeedFootPerSecond', 'ft/s', ['ft/s', 'fps', 'foot/second', 'foot per second', 'fuß/sekunde', 'fuß pro sekunde'], false)
  }

  toSiUnit(value: number): number {
    return value / 3.280839895
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 3.280839895)
  }
}