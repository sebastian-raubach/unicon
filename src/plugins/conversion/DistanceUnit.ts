import { Unit } from './Unit'

export abstract class DistanceUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[]) {
    super(name, primaryAbbreviation, abbreviations, 'distance')
  }
}
