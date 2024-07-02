import { Unit } from './Unit'

export abstract class VolumeUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[]) {
    super(name, primaryAbbreviation, abbreviations, 'volume')
  }
}
