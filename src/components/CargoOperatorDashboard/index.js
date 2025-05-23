import React, { useState, useEffect, useRef } from "react"
import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Cargo Operator Dashboard page of the website
 * @returns Cargo Operator Dashboard page
 */
// ! component

const CargoOperatorDashboard = (props) => {
  const loginOptions = ["Select Role", "Pilot", "Cargo Operator", "Cargo Manager"]
  const cachedUsername = localStorage.getItem("username")
  const [tab, setTab] = useState("Tasks")
  const [cargoOperators, setCargoOperators] = useState([{ username: `Cargo Operator 1`, tasks: [] }])
  const [cargoList, setCargoList] = useState([])
  const [storageLocations, setStorageLocations] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      warehouseNumber: `Warehouse ${i + 1}`,
      shelfNumber: `Shelf ${i + 1}`,
      dimensions: { length: 10, width: 10, height: 10 },
      loadLimit: 1000,
      available: true,
    }))
  )
  const [machineryList, setMachineryList] = useState(
    ["Crane", "Forklift", "Truck"].flatMap((type, i) => [
      {
        type,
        location: `Parking ${i + 1}`,
        available: true,
      },
      {
        type,
        location: `Parking ${i + 4}`,
        available: true,
      },
    ])
  )

  const processedDocksRef = useRef(new Set())

  const generateTaskTime = (start) => {
    const startTime = new Date(start)
    const endTime = new Date(startTime.getTime() + (30 + Math.floor(Math.random() * 91)) * 60000)
    return endTime.toISOString()
  }

  const assignTask = (task) => {
    setCargoOperators((prev) => {
      let updated = [...prev]
      updated.sort(
        (a, b) =>
          a.tasks.length - b.tasks.length ||
          new Date(a.tasks.at(-1)?.estimatedCompletionTime || 0) - new Date(b.tasks.at(-1)?.estimatedCompletionTime || 0)
      )
      const assignedTo = updated[0]
      const startTime = assignedTo.tasks.length === 0 ? new Date().toISOString() : assignedTo.tasks.at(-1).estimatedCompletionTime
      const newTask = {
        ...task,
        taskStartTime: startTime,
        estimatedCompletionTime: generateTaskTime(startTime),
      }
      assignedTo.tasks.push(newTask)
      return [...updated]
    })
  }

  useEffect(() => {
    const now = new Date().toISOString()
    props.docks.forEach((dock) => {
      if (processedDocksRef.current.has(dock.dockNumber) || dock.availableTime <= now) return

      processedDocksRef.current.add(dock.dockNumber)

      assignTask({
        type: "Log Cargo",
        dockNumber: dock.dockNumber,
      })
    })
  }, [props.docks])

  const handleLogCargo = (e) => {
    e.preventDefault()
    const form = e.target
    const dockNumber = form.dockNumber.value
    const dimensions = {
      length: form.length.value,
      width: form.width.value,
      height: form.height.value,
    }
    const weight = parseFloat(form.weight.value)
    const cargoID = cargoList.length + 1

    const availableStorage = storageLocations.find((s) => s.available)
    const availableMachinery = machineryList.find((m) => m.available)

    if (!availableStorage || !availableMachinery) return

    availableStorage.available = false
    availableMachinery.available = false

    setCargoList((prev) => [...prev, { id: cargoID, storage: availableStorage }])
    assignTask({
      type: "Move Cargo",
      cargoID,
      dockNumber,
      storageLocation: availableStorage,
      machinery: availableMachinery,
    })

    form.reset()
    alert(`Cargo logged successfully! Assigned Cargo ID: ${cargoID}`)
  }

  const handleLogoutCargo = (e) => {
    e.preventDefault()
    const cargoID = parseInt(e.target.cargoID.value)
    const cargo = cargoList.find((c) => c.id === cargoID)
    if (cargo) {
      setStorageLocations((prev) =>
        prev.map((loc) => (loc.shelfNumber === cargo.storage.shelfNumber ? { ...loc, available: true } : loc))
      )
    }
  }

  const handleCompleteTask = (taskIndex) => {
    setCargoOperators((prev) => {
      return prev.map((op) => {
        if (op.username === cachedUsername) {
          const [completed] = op.tasks.splice(taskIndex, 1)
          if (completed.machinery) {
            setMachineryList((machs) =>
              machs.map((m) =>
                m.type === completed.machinery.type && m.location === completed.machinery.location ? { ...m, available: true } : m
              )
            )
          }
        }
        return op
      })
    })
  }

  const activeOperator = cargoOperators[0]

  return (
    <div className={Style.dashboard}>
      <div className={Style.tabs}>
        {["Tasks", "Log Cargo", "Logout Cargo"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? Style.active : ""}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Tasks" && (
        <div className={Style.taskList}>
          {activeOperator.tasks.slice(0, activeOperator.tasks.length > 1 ? -1 : undefined).map((task, i) => (
            <div key={i} className={Style.taskCard}>
              <p>
                <strong>Type:</strong> {task.type}
              </p>
              <p>
                <strong>Dock:</strong> {task.dockNumber || "-"}
              </p>
              {task.cargoID && (
                <p>
                  <strong>Cargo ID:</strong> {task.cargoID}
                </p>
              )}
              {task.storageLocation && (
                <p>
                  <strong>Storage:</strong> {task.storageLocation.warehouseNumber}, {task.storageLocation.shelfNumber}
                </p>
              )}
              {task.machinery && (
                <p>
                  <strong>Machinery:</strong> {task.machinery.type} at {task.machinery.location}
                </p>
              )}
              <p>
                <strong>Start:</strong> {task.taskStartTime}
              </p>
              <p>
                <strong>Ends:</strong> {task.estimatedCompletionTime}
              </p>
              <button onClick={() => handleCompleteTask(i)}>Mark as Completed</button>
            </div>
          ))}
        </div>
      )}

      {tab === "Log Cargo" && (
        <form onSubmit={handleLogCargo} className={Style.form}>
          <label>Dock Number</label>
          <select name="dockNumber" required>
            {props.docks.map((dock, i) => (
              <option key={i} value={dock.dockNumber}>
                {dock.dockNumber}
              </option>
            ))}
          </select>
          <label>Length (cm)</label>
          <input type="number" name="length" required />
          <label>Width (cm)</label>
          <input type="number" name="width" required />
          <label>Height (cm)</label>
          <input type="number" name="height" required />
          <label>Weight (kg)</label>
          <input type="number" name="weight" required />
          <button type="submit">Submit</button>
        </form>
      )}

      {tab === "Logout Cargo" && (
        <form onSubmit={handleLogoutCargo} className={Style.form}>
          <label>Cargo ID</label>
          <input type="number" name="cargoID" required />
          <button type="submit">Logout Cargo</button>
        </form>
      )}
    </div>
  )
}

export default CargoOperatorDashboard
