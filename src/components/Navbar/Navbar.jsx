import Logo from "../../assets/logo-transparente-blanco.svg";
const Navbar = () => {
  return (
    <header className="fixed top z-10 w-full backdrop-blur">
      <nav className="mx-auto py-3 flex" aria-label="Global">
        <div className="mx-auto flex gap-x-3 items-center">
          <i>
            <img className="h-10 w-auto" src={Logo} alt="" />
          </i>
          <h1 className="text-sm text-white font-semibold tracking-wide">
            Pasión Choppers Argentina
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
