import { BrowserRouter, Routes, Route } from "react-router-dom"
import DeviceStore from "./stores/global/DeviceStore"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import EmergencyContacts from "./pages/EmergencyContacts"
import Dashboard from "./pages/Dashboard"
import TermsAndConditions from "pages/terms-and-conditions"
import CookiesPolicy from "pages/cookies-policy"
import MutableStore from "./stores/global/MutableStore/MutableStore"

const App = () => {
  return (
    <DeviceStore>
      <MutableStore>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="emergency-contacts" element={<EmergencyContacts />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="cookies-policy" element={<CookiesPolicy />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </MutableStore>
    </DeviceStore>
  )
}

export default App
