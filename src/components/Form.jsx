import React from 'react'
import Input from './Input'
import Button from './Button'
import PropTypes from 'prop-types'

const Form = ({ onSubmit, inputs, button }) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => <Input key={input.text} text={input.text} value={input.value} onChange={input.onChange} />)}
        <Button type={button.type} text={button.text} />
      </form>
    </div>
  )
}
Form.propTypes = {
  onSubmit: PropTypes.func,
  inputs: PropTypes.array,
  button: PropTypes.object
}

export default Form