import Image from "../custom-components/Image"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> Footer Section of the website
 * @returns Footer Section
 */
// ! component

const Footer = () => {
  const socialMedia = [
    { name: "instagram", imageSrc: "instagram.webp", link: "https://www.instagram.com" },
    { name: "facebook", imageSrc: "facebook.webp", link: "https://www.facebook.com" },
    { name: "linkedin", imageSrc: "linkedin.webp", link: "https://www.linkedin.com" },
    { name: "twitter", imageSrc: "twitter.webp", link: "https://twitter.com" },
  ]
  return (
    <footer className={`bg-img-general text-white position-relative ${Style.footer}`}>
      <Image
        src={require("images/footer/background.jpg")}
        alt={"footer-background"}
        fill
        className={`position-absolute w-100 h-100 ${Style.background}`}
      />
      <div className={`position-absolute w-100 h-100 ${Style.background}`} />
      <div className="text-center py-4">
        <p className={`fw-bold fs-20px mb-0`}>Follow Us</p>
        <p className={`bold-200 fs-12px mb-1 ${Style.content}`}>
          Follow for latest news on upcoming features or becoming a beta tester!
        </p>
        <div className={`d-flex justify-content-center mb-1 ${Style.social_media_icons}`}>
          {socialMedia.map((item, index) => {
            return (
              <span className="pointer mx-1" key={index + "social_media_icons"}>
                <a href={item.link} target="_blank" rel="noreferrer noopener">
                  <Image src={require(`images/${item.imageSrc}`)} width={20} height={20} alt={`${item.name}`} />
                </a>
              </span>
            )
          })}
        </div>
        <p className={`bold-200 fs-12px d-block underline-white mb-2 pb-2`}>
          <a href="/terms-and-conditions" target="_blank" rel="noreferrer noopener" className="text-white">
            Terms and Conditions
          </a>{" "}
          <span className="fs-12px">|</span>{" "}
          <a href="/cookies-policy" target="_blank" rel="noreferrer noopener" className="text-white">
            Cookies Policy
          </a>
        </p>
        <p className={`mb-0 mt-3 fs-12px fw-200`}>&#169; Cargo Logistics, All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
