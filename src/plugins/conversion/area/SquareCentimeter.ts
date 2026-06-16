import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'

export class SquareCentimeter extends AreaUnit {
  constructor () {
    super('unitAreaSquareCentimeter', 'cm2', ['cm2', 'square cm', 'square centimeter', 'square centimeters', 'square centimetre', 'square centimetres', 'quadratzentimeter'], false)
  }

  toSiUnit (value: number): number {
    return value / 10_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 10_000)
  }
}
