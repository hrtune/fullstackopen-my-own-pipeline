import React from 'react'
import Header from '../src/components/Header'

import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

test('renders header', () => {
  const text = 'Hello!'

  render(<Header text={text} />)

  screen.getByText('Hello!')
})

