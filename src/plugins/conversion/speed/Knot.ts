import { ConversionResult } from '../ConversionResult'
import { SpeedUnit } from '../SpeedUnit'

export class Knot extends SpeedUnit {
  constructor() {
    super('unitSpeedKnot', 'kn', ['kn', 'kt', 'knot', 'knots', 'knoten'], false)
  }

  toSiUnit(value: number): number {
    return value / 1.9438444924
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1.9438444924)
  }
}