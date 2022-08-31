
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { useAuthStore } from '../hooks/useAuthStore';
import { ArchivedNotes, MyNotes } from '../pages';

//Manage all routes
export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  
  }, [])

  if( status === 'checking') {
    return (
      <h3>Loading...</h3>
    )
  }
  
  return (
    <Routes>
        {
          (status === 'not-authenticated')
            ? (
              <>
                <Route path="/auth/*" element={ <LoginPage /> }/>
                <Route path="/*" element={ <Navigate to="/auth" />}/>
              </>
            )
            : (
              <>
                <Route path="/" element={ <MyNotes />} />
                <Route path="/archived" element={ <ArchivedNotes />} />
                <Route path="/*" element={ <Navigate to="/" />}/>
              </>
            )
        }
    </Routes>
  )

  /* return (
    <Routes>
      
      <Route path="/auth/*" element={ <LoginPage /> }/>
      <Route path="/" element={ <MyNotes />} />
      <Route exact path="/archived" element={ <ArchivedNotes />} />
    </Routes>
  ) */
}