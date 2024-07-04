import { Unit } from './Unit'

export abstract class TemperatureUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'temperature', subUnit)
  }
}
