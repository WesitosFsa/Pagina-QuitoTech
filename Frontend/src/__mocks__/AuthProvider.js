import React from 'react';

const AuthContext = React.createContext({
  auth: null,
  setAuth: () => {}
});

export default AuthContext;
