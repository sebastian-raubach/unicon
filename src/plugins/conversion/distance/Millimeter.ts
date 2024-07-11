import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'

export class Millimeter extends DistanceUnit {
  constructor() {
    super('unitDistanceMillimeter', 'mm', ['mm', 'millimeter', 'millimetre', 'millimeters', 'millimetres'])
  }

  toSiUnit(value: number): number {
    return value / 1000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}