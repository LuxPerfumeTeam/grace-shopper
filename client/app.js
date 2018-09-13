import React from 'react'

import {Navbar, Homepage} from './components'
import Routes from './routes'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const App = () => {
  return (
    <div>
      <MuiThemeProvider>
        <Navbar />
        <Routes />
      </MuiThemeProvider>
    </div>
  )
}

export default App
