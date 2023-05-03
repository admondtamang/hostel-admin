import { createContext, useContext, useState } from 'react';
import { IUser, IUserContext } from '@particles/responseInterface/student/student.interface';

export const UserContext = createContext<any>({});

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as unknown as IUserContext;
