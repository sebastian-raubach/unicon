import { ConversionResult } from '../ConversionResult'
import { SpeedUnit } from '../SpeedUnit'

export class MilePerHour extends SpeedUnit {
  constructor() {
    super('unitSpeedMilePerHour', 'mph', ['mph', 'mi/h', 'mile/hour', 'miles/hour', 'mile per hour', 'miles per hour', 'meile/stunde', 'meile pro stunde', 'meilen/stunde', 'meilen pro stunde'], false)
  }

  toSiUnit(value: number): number {
    return value / 2.2369362921
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 2.2369362921)
  }
}