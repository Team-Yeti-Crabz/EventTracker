import { Navigate } from 'react-router-dom';
//to persist the user's state even on a page refresh:
import { useAuth } from '../hooks/AuthProvider.js';

export default function ProtectedRoute({ passedUserInfo }) {
  const { user } = useAuth();
  if (!user) {
    //redirects the user back to signin!
    return <Navigate to="/signin" />;
  }
  return passedUserInfo;
}
