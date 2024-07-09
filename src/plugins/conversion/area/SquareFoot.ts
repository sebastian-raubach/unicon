import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareInch } from './SquareInch'

export class SquareFoot extends AreaUnit {
  constructor() {
    super('unitAreaSquareFoot', 'ft2', ['ft2', 'square foot', 'square feet', 'quadratfuß', 'quadratfüße'], new SquareInch())
  }

  toSiUnit(value: number): number {
    return value / 10.7639104167
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 10.7639104167)
  }
}