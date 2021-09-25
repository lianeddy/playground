import NaviBar from "../Navbar/Navibar";

const NaviLayout = ({ children }) => {
  return (
    <div className="container">
      <NaviBar />
      {children}
    </div>
  );
};

export default NaviLayout;
