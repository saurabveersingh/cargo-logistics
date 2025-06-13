import { useState } from "react"
import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Pilot Dashboard page of the website
 * @returns Pilot Dashboard page
 */
// ! component

const PilotDashboard = (props) => {
  const cachedUsername = localStorage.getItem("username")

  const [selectedDock, setSelectedDock] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [departureTime, setDepartureTime] = useState("")

  const currentTime = new Date().toISOString().slice(0, 16)
  const availableDocks = props.docks.filter((dock) => dock.availableTime < currentTime)

  const handleLog = (e) => {
    e.preventDefault()

    if (!selectedDock || !arrivalTime || !departureTime) {
      alert("Please fill in all fields.")
      return
    }

    if (arrivalTime <= currentTime) {
      alert("Arrival time must be later than the current time.")
      return
    }

    if (departureTime <= arrivalTime) {
      alert("Departure time must be later than arrival time.")
      return
    }

    // Update dock's availableTime
    const dockIndex = props.docks.findIndex((dock) => dock.dockNumber === selectedDock)
    if (dockIndex !== -1) {
      props.docks[dockIndex].availableTime = departureTime
    }

    alert("Docking info logged successfully!")
    setSelectedDock("")
    setArrivalTime("")
    setDepartureTime("")
  }

  return <div>Access Denied</div>

  // return (
  //   <section className={Style.container}>
  //     <div className={Style.dashboardBox}>
  //       <h2>Welcome, {cachedUsername}</h2>
  //       <form onSubmit={handleLog}>
  //         <label>Select Dock</label>
  //         <select value={selectedDock} onChange={(e) => setSelectedDock(e.target.value)} required>
  //           <option value="">-- Select Available Dock --</option>
  //           {availableDocks.map((dock, index) => (
  //             <option key={index} value={dock.dockNumber}>
  //               {dock.dockNumber}
  //             </option>
  //           ))}
  //         </select>

  //         <label>Arrival Time</label>
  //         <input type="datetime-local" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />

  //         <label>Departure Time</label>
  //         <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />

  //         <button type="submit">Log Arrival</button>
  //       </form>
  //     </div>
  //   </section>
  // )
}

export default PilotDashboard
