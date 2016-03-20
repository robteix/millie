import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { ipcRenderer } from 'electron';
import { setServices } from './actions/talky';
import './app.global.css';
import settings from './utils/settings';

import {selectService} from './actions/talky';

import multi from 'redux-multi'
import {createStore, applyMiddleware} from 'redux'
applyMiddleware(multi)(createStore)

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

import injectTapEventPlugin from 'react-tap-event-plugin';

const services = settings().get('services') || [];

store.dispatch(setServices(services));

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

// menu events
ipcRenderer.on('select-service', (event, id) => {
  store.dispatch(selectService(id));
});

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
