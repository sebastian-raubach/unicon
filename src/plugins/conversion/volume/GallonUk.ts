import { ConversionResult } from '../ConversionResult'
import { VolumeUnit } from '../VolumeUnit'

export class GallonUk extends VolumeUnit {
  constructor() {
    super('unitVolumeGallonUk', 'gal UK', ['gal', 'gal UK', 'gal (UK)', 'gallon', 'gallons', 'gallone', 'gallonen'])
  }

  toSiUnit(value: number): number {
    return value / 219.9692482991
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 219.9692482991)
  }
}