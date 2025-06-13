import { useContext, useRef, useState, useEffect } from "react"

import { MutableContext } from "../../stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE, LOGIN } from "../../stores/global/MutableStore/MutableActions"
import { DeviceContext } from "../../stores/global/DeviceStore"

import Style from "./style.module.scss"
import Image from "../custom-components/Image"

// !definition of component
/**
 *
 * @description --> Used to navigate through the website
 * @returns Navbar component
 */
// ! component

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  const menu_btn = useRef()
  const menu = useRef()

  useEffect(() => {
    const cachedRole = localStorage.getItem("role")
    const cachedUsername = localStorage.getItem("username")
    const cachedPassword = localStorage.getItem("password")

    if (cachedRole && cachedUsername && cachedPassword) {
      dispatch({ type: LOGIN, payload: true })
    }
  }, [])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menu.current && !menu.current.contains(e.target) && !menu_btn.current.contains(e.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener("click", handleOutsideClick)

    return () => document.removeEventListener("click", handleOutsideClick)
  }, [menu])

  const DesktopNav = () => {
    return (
      <nav
        className={`position-fixed w-100 d-flex justify-content-between align-items-center py-2 px-4 fs-18px ${Style.header} ${Style.desktop_nav}`}
      >
        <div className="d-flex align-items-center">
          <a href="/" className={`${Style.nav_btn}`}>
            Home
          </a>
          <a
            onClick={() => {
              dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "Not Implemented" } })
            }}
            className={`pointer ${Style.nav_btn}`}
          >
            About Us
          </a>
        </div>
        <a href="/">
          <Image src={require("images/ship-icon.png")} alt={"logo"} width={40} height={40} />
        </a>
        <div className="d-flex justify-content-end align-items-center">
          <a href="/dashboard" className={`pointer ${Style.nav_btn}`}>
            Dashboard
          </a>
          <a
            className="me-2"
            href="/dashboard"
            onClick={() => {
              if (state.login) {
                localStorage.removeItem("role")
                localStorage.removeItem("username")
                localStorage.removeItem("password")
                dispatch({ type: LOGIN, payload: false })
              }
            }}
          >
            {state.login ? "Logout" : "Login"}
          </a>
        </div>
      </nav>
    )
  }

  const MobileNav = () => {
    return (
      <nav
        className={`position-fixed w-100 d-flex justify-content-between align-items-center pe-4 ps-2 ${Style.header} ${Style.mobile_nav}`}
      >
        <button
          className="position-relative"
          onClick={() => {
            setTimeout(() => {
              setOpenMenu(!openMenu)
            }, 100)
          }}
        >
          <img ref={menu_btn} src={require(`images/menu.png`)} alt="menu" width={40} height={25} />
        </button>
        <a href="/">
          <Image src={require("images/ship-icon.png")} alt={"logo"} width={30} height={30} />
        </a>
        <PopupMenu />
      </nav>
    )
  }

  const PopupMenu = () => {
    return (
      <div
        ref={menu}
        className={`d-flex flex-column position-fixed left-0 bs-1 ${Style.mobile_menu} ${openMenu && Style.open_menu}`}
      >
        <a href="/">Home</a>
        <a
          onClick={() => {
            dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "Not Implemented" } })
          }}
        >
          About us
        </a>
        <a href="/dashboard" className={`${Style.nav_btn}`}>
          Dashboard
        </a>
        <a href="/dashboard">
          <button
            className="br-10px w-fit-content bg-darkcyan"
            onClick={() => {
              if (state.login) {
                localStorage.removeItem("role")
                localStorage.removeItem("username")
                localStorage.removeItem("password")

                dispatch({ type: LOGIN, payload: false })
              }
            }}
          >
            {state.login ? "Logout" : "Login"}
          </button>
        </a>
      </div>
    )
  }

  return <header className={`text-white fw-600 ${Style.header}`}>{Device.isMobile ? <MobileNav /> : <DesktopNav />}</header>
}

export default Navbar
