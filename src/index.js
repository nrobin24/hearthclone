// Set up your application entry point here..require('../css/animation.css');

import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {App} from './components/App'
import configureStore from './store/configureStore'
// import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react'

const isProd = true

const store = configureStore()

// const debugPanel = (
//   <DebugPanel top right bottom>
//     <DevTools store={store} monitor={LogMonitor} />
//   </DebugPanel>
// )

// let maybeDebugPanel = () => isProd ? null : debugPanel

const targetEl = document.getElementById('app')

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  targetEl
)
