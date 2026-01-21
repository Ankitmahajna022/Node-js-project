import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../services/authApi"

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me") 
        setIsAuth(true)
      } catch (error) {
        setIsAuth(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) return <p>Loading...</p>

  return isAuth ? children : <Navigate to="/signin" replace />
}

export default PrivateRoute
