import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'

export class SquareInch extends AreaUnit {
  constructor() {
    super('unitAreaSquareInch', 'in2', ['in2', 'square in', 'square inch', 'square inches', 'quadratzoll'], false)
  }

  toSiUnit(value: number): number {
    return value / 1550.0031000062
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1550.0031000062)
  }
}