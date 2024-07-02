import { VolumeUnit } from '../VolumeUnit'

export class GallonUk extends VolumeUnit {
  constructor() {
    super('unitVolumeGallonUk', 'gal UK', ['gal', 'gal UK', 'gal (UK)', 'gallon', 'gallons'])
  }

  toSiUnit(value: number): number {
    return value / 219.9692482991
  }
  fromSiUnit(value: number): number {
    return value * 219.9692482991
  }
}