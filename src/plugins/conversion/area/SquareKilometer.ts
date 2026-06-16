import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'
import { SquareMeter } from '@/plugins/conversion/area/SquareMeter'

export class SquareKilometer extends AreaUnit {
  constructor () {
    super('unitAreaSquareKilometer', 'km2', ['km2', 'square km', 'square kilometer', 'square kilometers', 'square kilometre', 'square kilometres', 'quadratkilometer'], false, new SquareMeter())
  }

  toSiUnit (value: number): number {
    return value * 1_000_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1_000_000)
  }
}
