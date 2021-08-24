import { NextFunction, Response, Request, RequestHandler } from 'express'
import { Data, IConfig } from './types'
import { DEFAULT_CONFIG, formatFields, searchFieldsSelectors, transform, validateConfig } from './utils'

const requestFieldsSelectorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  config: Partial<IConfig> | IConfig = DEFAULT_CONFIG
): RequestHandler<{}, any, any, {}> | Response<any, Record<string, any>> | void => {
  // @ts-ignore
  req.transform = (d) => d // safer that way
  if (!config.fieldSelectorName) {
    config.fieldSelectorName = DEFAULT_CONFIG.fieldSelectorName
  }
  if (!config.dataNestedField) {
    config.dataNestedField = DEFAULT_CONFIG.dataNestedField
  }
  validateConfig(config)
  const { fieldSelectorName, dataNestedField } = config
  const fieldsSelector = searchFieldsSelectors(req, fieldSelectorName)
  if (!fieldsSelector) return next()
  const fields = formatFields(fieldsSelector)
  if (!fields) {
    console.error('fields not valid')
    return next()
  }
  // @ts-ignore
  req.transform = (data: Data) => transform(data, fields, dataNestedField)
  next()
}

export default requestFieldsSelectorMiddleware
