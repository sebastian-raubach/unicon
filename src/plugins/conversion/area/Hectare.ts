import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'

export class Hectare extends AreaUnit {
  constructor() {
    super('unitAreaHectare', 'ha', ['ha', 'hectare', 'hectares', 'hektar', 'hektare'])
  }

  toSiUnit(value: number): number {
    return value * 10000.0
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 10000.0)
  }
}