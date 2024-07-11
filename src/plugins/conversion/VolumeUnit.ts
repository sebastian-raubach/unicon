import { Unit } from './Unit'

export abstract class VolumeUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'unitTypeVolume', subUnit)
  }
}
