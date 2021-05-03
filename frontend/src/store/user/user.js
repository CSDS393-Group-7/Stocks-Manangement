import { combineReducers } from 'redux';
const SET_USER = 'SET_USER';
const SAVE_TOKEN = 'SAVE_TOKEN';

export function setUser(userInput) {
  return {
    type: SET_USER,
    userInput
  }
}

export function saveToken(tokenInput) {
  return {
    type: SAVE_TOKEN,
    tokenInput
  }
}

const defaultUser = [
  {
    username: "Your username",
    fullname: "Your full name",
    email: "Your email",
  }
];

const defaultToken = null;

function user(state=defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return [
        {
            username: action.username,
            fullname: action.fullname,
            email: action.email
        }
      ];
    default:
      return state;
  }
}


function token(state=defaultToken, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return action;
    default:
      return state;
  }
}

const userApp = combineReducers({
  user,
  token
});

export default userApp;
