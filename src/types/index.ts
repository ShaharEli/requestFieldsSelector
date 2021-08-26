export type BaseData = Record<string, any>
export type Data = BaseData | BaseData[] | Record<string, BaseData | BaseData[]>

export interface IConfig {
  silent: boolean
  dataNestedField: string // e.g your response look like this {data:"your data",status:"ok",...} the value will be data
  fieldSelectorName: string // e.g your req.query look like this ?customFields="hello" or your req.body includes customFields instead of fields default is fields
}
