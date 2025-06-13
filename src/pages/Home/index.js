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
        className={`bg-img-general d-flex flex-column justify-content-center align-items-center text-white fs-50px fw-900 default-section-height ${
          Style.landing_page
        } ${Device.isMobile ? "flex-column ps-3" : ""}`}
      >
        Welcome To Cargo Logistics!
      </section>
      <section
        className={`${
          Device.isMobile ? `text-center d-flex flex-column-reverse` : `d-flex justify-content-evenly`
        } text-white bg-black`}
      >
        <div className="p-5">
          <div className={`bg-img-general ${Style.app_showcase}`} />
        </div>
        <div className={`d-flex flex-column px-5 pt-4 overflow-scroll`}>
          <h2 className="fs-30px h-100 d-flex justify-content-center align-items-center text-center">
            A fully responsive Prototype. <br /> <br />
            Compatible with mobile, tablet, PC and Larger Screens. <br /> <br />
            Downloadable as a Mobile App!
          </h2>
        </div>
      </section>
    </>
  )
}

export default Home
