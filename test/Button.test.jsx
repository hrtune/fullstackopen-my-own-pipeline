import React from 'react'
import Button from '../src/components/Button'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

test('renders button', () => {
  render(<Button type="button" text="ok" />)

  const button = screen.getByText('ok')

  expect(button).toBeDefined()

})
