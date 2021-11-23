import React from 'react'

import SvgViewer from 'svg-viewer'
import classes from './app.module.css'

const App = () => {
  return (
    <div className={classes.container}>
      <SvgViewer />
    </div>
  )
}

export default App
