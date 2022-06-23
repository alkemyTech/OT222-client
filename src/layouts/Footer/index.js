import React from "react"
// Styles: chacra ui
import "./Footer.styles.css"
// Assets: logo
import logo from "../../assets/logoSomosMas.png"
const Footer = () => {
  return (
    <div className="box">
      <div className="container">
        <div className="row">
          <div className="column">
            <div className="heading">ONG Somos Mas</div>
            <img src={logo} alt="" />
          </div>
          <div className="column">
            <div className="heading">Visit our page</div>
            <div className="flinks">
              <a href="/">Somos Mas</a>
            </div>
          </div>
          <div className="column">
            <div className="heading">Follow us</div>
            <div className="flinks">
              <a href="/">Facebook</a>
            </div>
            <div className="flinks">
              <a href="/">Twitter</a>
            </div>
            <div className="flinks">
              <a href="/">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
