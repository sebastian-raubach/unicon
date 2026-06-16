import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { VolumeUnit } from '@/plugins/conversion/VolumeUnit'

export class GallonUs extends VolumeUnit {
  constructor () {
    super('unitVolumeGallonUs', 'gal US', ['gal', 'gal US', 'gal (US)', 'gallon', 'gallons', 'gallone', 'gallonen'], false)
  }

  toSiUnit (value: number): number {
    return value / 264.1720523581
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 264.1720523581)
  }
}
