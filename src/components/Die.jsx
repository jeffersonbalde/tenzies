import React from 'react'

const Die = (props) => {
  return (
    <div className="die-face">
        <h2>{props.value}</h2>
    </div>
  )
}

export default Die