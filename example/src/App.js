import React from 'react'
import 'svg-viewer/dist/index.css'

import OilRafinerySvg from './oil-rafinery-svg'

import SvgViewer from 'svg-viewer'
import classes from './app.module.css'

const App = () => {
  return (
    <div className={classes.container}>
      <SvgViewer svgData={OilRafinerySvg} />
    </div>
  )
}

export default App
