import React, { createContext, useState, useContext } from 'react';
import { User } from 'gotrue-js';
import { getUser } from '@config/auth';

interface UserContextInterface {
   user: User | null;
   setUser: Function;
}

interface UserProviderInterface {
   children: any;
}

export const UserContext = createContext<UserContextInterface>({
   user: null,
   setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderInterface) => {
   const [user, setUser] = useState<User | null>(getUser());

   const state: UserContextInterface = {
      user,
      setUser,
   };

   return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
