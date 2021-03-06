import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import {reducer as review} from "./review/review.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.REVIEW]: review,
});
