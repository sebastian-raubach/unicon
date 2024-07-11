import { Unit } from './Unit'

export abstract class DistanceUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'unitTypeDistance', subUnit)
  }
}
