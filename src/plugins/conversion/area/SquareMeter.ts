import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareCentimeter } from './SquareCentimeter'

export class SquareMeter extends AreaUnit {
  constructor() {
    super('unitAreaSquareMeter', 'm2', ['m2', 'square m', 'square meter', 'square meters', 'square metre', 'square metres', 'quadratmeter'], true, new SquareCentimeter())
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}