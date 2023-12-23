import { combineReducers, createStore, applyMiddleware } from 'redux';
import leagueReducer from './reducers/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  leagueReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, applyMiddleware(thunk));