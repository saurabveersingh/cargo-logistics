import { useContext } from "react"

import { DeviceContext } from "stores/global/DeviceStore"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Home page of the website
 * @returns Home page
 */
// ! component

const Home = () => {
  const Device = useContext(DeviceContext)
  return (
    <>
      <section
        className={`bg-img-general d-flex flex-column justify-content-center align-items-center text-white fs-50px fw-900 ${
          Style.landing_page
        } ${Device.isMobile ? "flex-column ps-3" : ""}`}
      >
        Welcome To Cargo Logistics!
      </section>
    </>
  )
}

export default Home
