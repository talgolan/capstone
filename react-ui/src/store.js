import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import conditions from "./redux/conditions";
import condition from "./redux/singleCondition";
import currentUser from "./redux/auth";
import users from "./redux/users";
import medications from "./redux/medications";
import medication from "./redux/singleMedication";
import documents from "./redux/documents";
import doctors from "./redux/doctors";
import doctor from './redux/singleDoctor';
import score from './redux/dcCondition';
import appointment from './redux/dcDoctor';
import med from './redux/dcMedication';
import chart from './redux/score';
const reducer = combineReducers({
  users,
  currentUser,
  conditions,
  condition,
  medications,
  medication,
  documents,
  doctors,
  doctor,
  score,
  appointment,
  med,
  chart
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
