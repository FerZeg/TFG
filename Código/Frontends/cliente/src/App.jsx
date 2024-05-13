import "./App.css"
import { useLoginContext } from "./lib/context"
import LoginPage from "./Pages/LoginPage"

function App() {
  const { login } = useLoginContext()
  return (
    <>
      {!login.value 
        ? (
          <LoginPage />
        )
        : (
          <div>
            <h1>Logged in</h1>
            <p>{JSON.stringify(login.data)}</p>
          </div>
        )}
    </>
  )
}

export default App
