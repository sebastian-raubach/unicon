import { Unit } from './Unit'

export abstract class AreaUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'unitTypeArea', subUnit)
  }
}
