import { Unit } from './Unit'

export abstract class TimeUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'unitTypeTime', subUnit)
  }
}
