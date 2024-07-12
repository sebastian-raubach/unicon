import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareFoot } from './SquareFoot'

export class SquareYard extends AreaUnit {
  constructor() {
    super('unitAreaSquareYard', 'yd2', ['yd2', 'square yd', 'square yard', 'square yards'], false, new SquareFoot())
  }

  toSiUnit(value: number): number {
    return value / 1.1959900463
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1.1959900463)
  }
}