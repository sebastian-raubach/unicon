import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareCentimeter } from './SquareCentimeter'
import { SiUnit } from '../SiUnit'

export class SquareMeter extends AreaUnit implements SiUnit {
  constructor() {
    super('unitAreaSquareMeter', 'm2', ['m2', 'square meter', 'square meters', 'square metre', 'square metres', 'quadratmeter'], new SquareCentimeter())
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}