export class ConversionResult {
  unitName: string
  conversionValue: number

  constructor (unitName: string, conversionValue: number) {
    this.unitName = unitName
    this.conversionValue = conversionValue
  }
}
