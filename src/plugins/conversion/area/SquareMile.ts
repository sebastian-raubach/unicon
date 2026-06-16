import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'
import { SquareYard } from '@/plugins/conversion/area/SquareYard'

export class SquareMile extends AreaUnit {
  constructor () {
    super('unitAreaSquareMile', 'mi2', ['mi2', 'square mi', 'square mile', 'square miles', 'quadratmeile', 'quadratmeilen'], false, new SquareYard())
  }

  toSiUnit (value: number): number {
    return value * 2_589_988.110336
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 2_589_988.110336)
  }
}
