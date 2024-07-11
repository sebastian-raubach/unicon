import { ConversionResult } from '../ConversionResult'
import { WeightUnit } from '../WeightUnit'
import { Pound } from './Pound'

export class LongTon extends WeightUnit {
  constructor() {
    super('unitWeightLongTon', 'ton UK', ['ton UK', 't', 'ton', 'tons', 't (UK)', 't UK', 'ton (UK)', 'tons UK', 'tons (UK)', 'long ton', 'long tons', 'tonne', 'tonnes'], new Pound())
  }

  toSiUnit(value: number): number {
    return value * 1016.0469088
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1016.0469088)
  }
}