//creating a protected route!
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
//to persist the user's state even on a page refresh:
import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ passedUserInfo }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  // to authenticate user
  const login = async (data) => {
    setUser(data);
    navigate('/preferences');
  };
  // sign out user
  const logout = () => {
    setUser(null);
    //on logout, send them to signin page
    navigate('/signin', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={value}>{passedUserInfo}</AuthContext.Provider>
  );
};
// hook to expose the user's state and login/logout methods
export const useAuth = () => {
  return useContext(AuthContext);
};
