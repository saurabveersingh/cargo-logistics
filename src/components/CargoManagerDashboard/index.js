// !definition of component
/**
 *
 * @description --> Cargo Manager Dashboard page of the website
 * @returns Cargo Manager Dashboard page
 */
// ! component

const CargoManagerDashboard = (props) => {
  if (props.auth) {
    return <div>This is Cargo Manager Dashboard Page</div>
  } else {
    return <div>Access Denied</div>
  }
}

export default CargoManagerDashboard
