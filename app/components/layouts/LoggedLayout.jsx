import { isAuthenticated } from 'core/indentity/index';
import { useRouter } from 'node_modules/next/router';
import React from 'react'

function LoggedLayout({ children }) {

  const router = useRouter();
  React.useEffect(() => { 
    isAuthenticated()
      .then(response => {
        if (!response) {
         router.push("/auth/sign-in");
      }
    })

  }, []);
  return (
    <>{
      
      children
      }</>
  )
}

export default LoggedLayout