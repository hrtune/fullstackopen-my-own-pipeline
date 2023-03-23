import React from 'react'
import { PropTypes } from 'prop-types'

const Header = ({ text }) => (
  <>
    <h2>{text}</h2>
  </>
)
Header.propTypes = {
  text: PropTypes.string
}

export default Header