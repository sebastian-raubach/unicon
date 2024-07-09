import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareYard } from './SquareYard'

export class SquareMile extends AreaUnit {
  constructor() {
    super('unitAreaSquareMile', 'mi2', ['mi2', 'square mile', 'square miles', 'quadratmeile', 'quadratmeilen'], new SquareYard())
  }

  toSiUnit(value: number): number {
    return value * 2589988.110336
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 2589988.110336)
  }
}