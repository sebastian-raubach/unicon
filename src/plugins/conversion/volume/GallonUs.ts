import { VolumeUnit } from '../VolumeUnit'

export class GallonUs extends VolumeUnit {
  constructor() {
    super('unitVolumeGallonUs', ['gal', 'gal US', 'gal (US)', 'gallon', 'gallons'])
  }

  toSiUnit(value: number): number {
    return value / 264.1720523581
  }
  fromSiUnit(value: number): number {
    return value * 264.1720523581
  }
}