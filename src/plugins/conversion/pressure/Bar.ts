import { ConversionResult } from '../ConversionResult'
import { PressureUnit } from '../PressureUnit'

export class Bar extends PressureUnit {
  constructor() {
    super('unitPressureBar', 'bar', ['bar'], false)
  }

  toSiUnit(value: number): number {
    return value * 100000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 100000)
  }
}