import { IConfig } from '../types'

export const validateConfig = (config: IConfig | Partial<IConfig>) => {
  const { fieldSelectorName, dataNestedField } = config
  if (!fieldSelectorName || !(typeof fieldSelectorName === 'string') || !(typeof dataNestedField === 'string'))
    throw new Error('invalid config')
}
