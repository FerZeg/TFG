import { useEffect } from "react"
import "./App.css"
import { useLoginContext } from "./lib/context"
import LoginPage from "./Pages/LoginPage"
import { fetchMesaData } from "./lib/fetchers"
import { useState } from "react"
import RestaurantePage from "./Pages/RestaurantePage"


function App() {
  const { login, updateLogin } = useLoginContext()
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) return setLoading(false)
    fetchMesaData().then(
      data => {
        if (data) {
          updateLogin({ value: true, data: data })
        }
      }
    ).finally(() => setLoading(false)
    )
  }, [login, token, updateLogin])
  return (
    <>
      {!login.value && !loading
        ? (
          <LoginPage />
        )
        : (
          <div>
            <RestaurantePage />
          </div>
        )}
    </>
  )
}

export default App
