import {createStore, applyMiddleware} from 'redux';
import saga from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from '../reducers'


const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });
const store = createStore (
    reducers,
    {},
)
export default store