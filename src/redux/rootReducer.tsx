import { combineReducers } from "redux";
import bookingReducer from "./booking/booking-reducer";
const rootReducer = combineReducers({ book: bookingReducer });

export default rootReducer;
