import Logo from "../../resources/img/logo/logo-hotel.png";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="logo"/>
        </div>
        <div className="nav-list">
          <a href="/">Home</a>
          <a href="/details">Details</a>
          <a className="login" href="/login">Login</a>
        </div>
      </div>
    </>
  );
}
