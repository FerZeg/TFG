import Header from "../components/mainUI/Header";
import { useEffect, useState } from "react";
import { loginContext } from "../lib/context";
import { fetchUserData } from "../lib/fetchers";
import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner'

export default function Layout() {
    const [ login, setLogin ] = useState({
      value: false,
      data: null
    })

    useEffect(() => {
        document.title = "Cocina"
        ;(async() => {
            const data = await fetchUserData()
            if(data) setLogin({value: true, data: data})
        })()
      }, [])
      
    return (
        <loginContext.Provider value={{login, setLogin}}>
          <Toaster/>
              {login.value &&
              <>
                  <Header />
                  <Outlet />
              </>
              }
        </loginContext.Provider>
    );
}