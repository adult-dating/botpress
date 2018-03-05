import React from 'react'
import { FormControl, Checkbox, Radio } from 'react-bootstrap'

export default ({ setting, name, updateSetting }) => {
  const updateValue = normalize => ({ target }) => updateSetting(name, normalize ? normalize(target) : target.value)
  const value = setting.value || ''

  if (setting.type === 'bool') {
    return <Checkbox onChange={updateValue(({ checked }) => checked)} checked={value} children={name} />
  } else if (setting.type === 'choice') {
    return setting.validation.map(option => (
      <Radio key={option} value={option} onChange={updateValue()} checked={value === option} children={option} />
    ))
  } else if (setting.type === 'number') {
    const updateNumber = updateValue(({ value }) => Number(value))
    return <FormControl type="number" placeholder={setting.default || ''} value={value} onChange={updateNumber} />
  } else {
    return <FormControl type="text" value={value} placeholder={setting.default || ''} onChange={updateValue()} />
  }
}
