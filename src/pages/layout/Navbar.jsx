import Logo from "../../resources/img/logo/logo-hotel.png";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className="nav-list">
          <a className="login" href="/login">
            Login
          </a>
          <a className="login" href="/login">
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
