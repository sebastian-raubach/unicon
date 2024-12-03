import { ConversionResult } from '../ConversionResult'
import { PressureUnit } from '../PressureUnit'

export class Pascal extends PressureUnit {
  constructor() {
    super('unitPressurePascal', 'pa', ['pa', 'pascal'], true)
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}