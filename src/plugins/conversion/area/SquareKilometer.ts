import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'
import { SquareMeter } from './SquareMeter'

export class SquareKilometer extends AreaUnit {
  constructor() {
    super('unitAreaSquareKilometer', 'km2', ['km2', 'square kilometer', 'square kilometers', 'square kilometre', 'square kilometres', 'quadratkilometer'], new SquareMeter())
  }

  toSiUnit(value: number): number {
    return value * 1000000.0
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1000000.0)
  }
}