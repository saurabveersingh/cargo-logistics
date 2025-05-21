import React from "react"
import PropTypes from "prop-types"

import Navbar from "components/Navbar"
import ToastMessage from "components/ToastMessage"
import Footer from "components/Footer"

import Style from "./style.module.scss"

// !definition of component
/**
 * @param props --> children
 * @description --> Layout for all pages of the website
 * @returns Layout wrapper Component
 */
// ! component

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className={`${Style.main_section}`}>
        <ToastMessage />
        {props.children}
      </main>
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
