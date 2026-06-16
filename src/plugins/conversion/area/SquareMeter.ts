import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'
import { SquareCentimeter } from '@/plugins/conversion/area//SquareCentimeter'

export class SquareMeter extends AreaUnit {
  constructor () {
    super('unitAreaSquareMeter', 'm2', ['m2', 'square m', 'square meter', 'square meters', 'square metre', 'square metres', 'quadratmeter'], true, new SquareCentimeter())
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
