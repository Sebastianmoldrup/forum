import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};


