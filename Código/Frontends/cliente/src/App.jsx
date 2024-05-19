import { useEffect } from "react"
import "./App.css"
import { useLoginContext } from "./lib/context"
import LoginPage from "./Pages/LoginPage"
import { fetchMesaData } from "./lib/fetchers"
import { useState } from "react"
import MainLayout from "./Layout/MainLayout"


function App() {
  const { login, updateLogin } = useLoginContext()
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) return setLoading(false)
    if (login.value) return setLoading(false)
    fetchMesaData().then(
      data => {
        if (data) {
          updateLogin({ value: true, data: data })
        }
      }
    ).finally(() => setLoading(false)
    )
  }, [login, token, updateLogin])
  if (!loading) {
    return login.value ? <MainLayout /> : <LoginPage />
  }
}

export default App
