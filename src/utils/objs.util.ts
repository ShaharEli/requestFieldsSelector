import { Request } from 'express'
import { Data, BaseData } from '../types'

export const isObj = (s: string) => s.startsWith('{') && s.endsWith('}')

export const findKeys = (fieldsMap: string[]) => {
  let depth = 0
  const keys: string[] = []
  const vals = {} as BaseData
  let val = ''
  fieldsMap.forEach((field, i) => {
    if (field === '{') {
      depth += 1
      val += ` ${field}`
    } else if (field === '}') {
      depth -= 1
      val += ` ${field}`
    } else if (depth === 0) {
      if (val) {
        vals[keys[keys.length - 1]] = val
      }
      val = ''
      keys.push(field)
    } else {
      val += ` ${field}`
    }
    if (!!val && i === fieldsMap.length - 1) {
      vals[keys[keys.length - 1]] = val
    }
  })
  return { keys, vals }
}

export const buildObj = (fields: string, obj: BaseData) => {
  const trimmedFields = fields.trim()
  if (!trimmedFields) return
  if (isObj(trimmedFields)) {
    const objContent = trimmedFields
      .slice(1, -1)
      .split(' ')
      .filter((v) => !!v.trim().length)
      .map((v) => v.trim())

    const { keys, vals } = findKeys(objContent)

    keys.forEach((key) => {
      if (vals?.[key]) {
        obj[key] = {}
        buildObj(vals?.[key], obj[key])
      } else {
        obj[key] = true
      }
    })
  }
}

export const countChars = (s: string, c: string) => s.split('').reduce((acc, curr) => (curr === c ? acc + 1 : acc), 0)

export const formatFields = (fields: string) => {
  if (countChars(fields, '{') !== countChars(fields, '}')) return false
  const obj = {}
  buildObj(fields, obj)
  return { ...obj }
}

export const searchFieldsSelectors = (req: Request, fieldSelectorName: string) => {
  const fieldsSelected = [req.query, req.body, req.params].find((f) => {
    const fieldKeys = Object.keys(f)
    return fieldKeys.includes(fieldSelectorName)
  })?.[fieldSelectorName]
  return fieldsSelected
}
export const matchPattern = (data: BaseData, fields: BaseData, obj?: BaseData) => {
  try {
    const res = obj || {}
    Object.keys(fields).forEach((k) => {
      if (typeof fields[k] === 'object') {
        res[k] = {}
        matchPattern(data[k], fields[k], res[k])
      } else {
        res[k] = data[k]
      }
    })
    return res
  } catch (e) {
    console.log(e.message)
    throw new Error('type def not valid')
  }
}

export const transform = (data: Data | Data[], fields: BaseData, dataNestedField: string) => {
  try {
    const extractedData = dataNestedField ? (data as BaseData)[dataNestedField] : data
    if (!extractedData) {
      console.error(dataNestedField, ' not found on ', data)
      return data
    }
    if (Array.isArray(extractedData)) {
      return extractedData.map((v) => matchPattern(v, fields))
    }
    return matchPattern(extractedData, fields)
  } catch (e) {
    console.error(e.message)
    return data
  }
}
