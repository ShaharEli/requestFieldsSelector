import { NextFunction, Response, Request, RequestHandler } from 'express'
import { Data, IConfig } from './types'
import { DEFAULT_CONFIG, formatFields, searchFieldsSelectors, transform, validateConfig } from './utils'

const requestFieldsSelectorMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
  config: Partial<IConfig> | IConfig = DEFAULT_CONFIG
): RequestHandler<{}, any, any, {}> | Response<any, Record<string, any>> | void => {
  // @ts-ignore
  req.transform = (d) => d // safer that way
  config = { ...DEFAULT_CONFIG, ...config }
  validateConfig(config)
  try {
    const { fieldSelectorName, dataNestedField, silent: isSilent } = config as IConfig
    const fieldsSelector = searchFieldsSelectors(req, fieldSelectorName)
    if (!fieldsSelector) return next()
    const fields = formatFields(fieldsSelector)
    if (!fields) {
      if (isSilent) return next()
      console.error('fields not valid')
      return next()
    }
    // @ts-ignore
    req.transform = (data: Data) => transform(data, fields, dataNestedField, isSilent)
    return next()
  } catch {
    return next()
  }
}

export default requestFieldsSelectorMiddleware
