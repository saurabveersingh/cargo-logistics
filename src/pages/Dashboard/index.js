import { useState, useEffect, useContext } from "react"

import { MutableContext } from "../../stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE, LOGIN } from "../../stores/global/MutableStore/MutableActions"
import { DeviceContext } from "../../stores/global/DeviceStore"

import PilotDashboard from "../../components/PilotDashboard"
import CargoOperatorDashboard from "../../components/CargoOperatorDashboard"
import CargoManagerDashboard from "../../components/CargoManagerDashboard"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Dashboard page of the website
 * @returns Dashboard page
 */
// ! component

const Dashboard = () => {
  const loginOptions = ["Select Role", "Pilot", "Cargo Operator", "Cargo Manager"]
  const dummyDocks = [
    { dockNumber: "Dock 1", availableTime: "2026-05-24T10:00" },
    { dockNumber: "Dock 2", availableTime: "2025-05-22T15:00" },
    { dockNumber: "Dock 3", availableTime: "2025-05-22T08:00" },
    { dockNumber: "Dock 4", availableTime: "2025-05-20T12:00" },
  ]

  const [loginType, setLoginType] = useState(loginOptions[0])
  const [role, setRole] = useState(loginOptions[0])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  useEffect(() => {
    const cachedRole = localStorage.getItem("role")
    const cachedUsername = localStorage.getItem("username")
    const cachedPassword = localStorage.getItem("password")

    if (cachedRole && cachedUsername && cachedPassword) {
      setLoginType(cachedRole)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (role === loginOptions[0]) {
      dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "Please Select a Role." } })
    } else if (username === "" || password === "") {
      dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "Please provide Login Credentials" } })
    } else {
      localStorage.setItem("role", role)
      localStorage.setItem("username", username)
      localStorage.setItem("password", password)

      dispatch({ type: LOGIN, payload: true })

      setLoginType(role)
    }
  }

  return (
    <>
      {loginType === loginOptions[0] && (
        <section className={`d-flex justify-content-center align-items-center ${Style.container}`}>
          <form className={`bg-white w-90 ${Style.loginBox}`} onSubmit={handleSubmit}>
            <h2 className={`fw-600 text-center`}>Login</h2>

            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value={loginOptions[0]}>{loginOptions[0]}</option>
              <option value={loginOptions[1]}>{loginOptions[1]}</option>
              <option value={loginOptions[2]}>{loginOptions[2]}</option>
              <option value={loginOptions[3]}>{loginOptions[3]}</option>
            </select>

            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Login</button>
          </form>
        </section>
      )}
      {loginType === "Pilot" && <PilotDashboard docks={dummyDocks} />}
      {loginType === "Cargo Operator" && <CargoOperatorDashboard docks={dummyDocks} />}
      {loginType === "Cargo Manager" && <CargoManagerDashboard />}
    </>
  )
}

export default Dashboard
