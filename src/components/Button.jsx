import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ type, text }) => (
  <>
    <button type={type}>{text}</button>
  </>
)
Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string
}

export default Button