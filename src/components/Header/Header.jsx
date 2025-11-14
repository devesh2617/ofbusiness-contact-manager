import logo from "../../assets/OFB Logo.png";
import "./Header.css"
const Header = () => {
  return (
    <header className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </header>
  )
}

export default Header