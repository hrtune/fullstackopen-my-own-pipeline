import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) {
    return
  }

  return (
    <div className={notification.state}>
      {notification.message}
    </div>
  )
}
Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification