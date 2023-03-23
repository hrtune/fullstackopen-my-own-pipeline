import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ text, value, onChange }) => (
  <div>
    {text}: <input value={value} onChange={onChange} />
  </div>
)
Input.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Input