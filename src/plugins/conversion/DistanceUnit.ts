import { Unit } from './Unit'

export abstract class DistanceUnit extends Unit {
  constructor(name: string, abbreviations: string[]) {
    super(name, abbreviations, 'distance')
  }
}
