import { Unit } from './Unit'

export abstract class VolumeUnit extends Unit {
  constructor(name: string, abbreviations: string[]) {
    super(name, abbreviations, 'volume')
  }
}
