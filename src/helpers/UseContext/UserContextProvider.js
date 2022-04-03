import React, { useMemo, useReducer } from 'react';
import UserContext from './UserContext';

const initialState = {
  FirstName: '',
  Lastname: '',
  Username: '',
  Id: '',
  Email: '',
  Role: '',
};
const storageUser = JSON.parse(localStorage.getItem('userSession'));

const reducer = (state, action) => {
  if (action.type === 'LOGIN') {
    return { ...action.payload };
  }
  return { ...state };
};
function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(reducer, storageUser || initialState);
  const userContextValue = useMemo(() => ({ userState, dispatch }), [userState, dispatch]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
