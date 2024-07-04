import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'

export class Inch extends DistanceUnit {
  constructor() {
    super('unitDistanceInch', 'in', ['in', 'inch', 'inches', 'zoll'])
  }

  toSiUnit(value: number): number {
    return value / 39.3700787402
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 39.3700787402)
  }
}