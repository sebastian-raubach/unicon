import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'
import { SquareFoot } from '@/plugins/conversion/area/SquareFoot'

export class SquareYard extends AreaUnit {
  constructor () {
    super('unitAreaSquareYard', 'yd2', ['yd2', 'square yd', 'square yard', 'square yards'], false, new SquareFoot())
  }

  toSiUnit (value: number): number {
    return value / 1.1959900463
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1.1959900463)
  }
}
