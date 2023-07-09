import { Key } from 'react'
import { Store } from 'antd/es/form/interface'
import { NamePath } from 'antd/lib/form/interface'
import { get, isEqual } from 'lodash'

export const isPlainArray = (arr: NamePath[]) =>
  !arr.some(el => Array.isArray(el) || typeof el === 'object')

export const shouldFormFieldUpdate = (fieldPath: NamePath | NamePath[]) => (
  prevValues: Store,
  curValues: Store
) => {
  if (!Array.isArray(fieldPath))
    return !isEqual(prevValues[fieldPath], curValues[fieldPath])

  let prevValue: any[] = []
  let curValue: any[] = []

  if (isPlainArray(fieldPath)) {
    prevValue = get(prevValues, fieldPath as Key[])
    curValue = get(curValues, fieldPath as Key[])
  } else {
    fieldPath.forEach(field => {
      prevValue?.push(get(prevValues, field))
      curValue?.push(get(curValues, field))
    })
  }

  return !isEqual(prevValue, curValue)
}
