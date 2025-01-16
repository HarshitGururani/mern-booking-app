import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LogOut from "./Logout";

const Header = () => {
  const { pathname } = useLocation(); // Destructure pathname for simplicity
  const { isLoggedIn } = useAppContext();

  const navLinkClass = "text-base font-medium";
  const activeClass = "text-primary";

  return (
    <div className="flex justify-between py-4 ">
      <Link to={"/"}>
        <h1 className="text-primary font-bold text-3xl tracking-tighter">
          booking<span className="text-black">.com</span>
        </h1>
      </Link>

      <div className="flex items-center gap-24">
        {isLoggedIn && (
          <div className="flex gap-5 items-center">
            <Link
              to={"/"}
              className={`${navLinkClass} ${
                pathname === "/" ? activeClass : ""
              }`}
            >
              Home
            </Link>
            <Link
              to={"/my-bookings"}
              className={`${navLinkClass} ${
                pathname === "/my-bookings" ? activeClass : ""
              }`}
            >
              My bookings
            </Link>
            <Link
              to={"/my-hotels"}
              className={`${navLinkClass} ${
                pathname === "/my-hotels" ? activeClass : ""
              }`}
            >
              My hotels
            </Link>

            <div className="flex gap-6 items-center">
              <LogOut />
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex gap-6 items-center">
            <Link
              to={"/login"}
              className="bg-secondary py-2 px-4 rounded-lg font-semibold"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-primary py-2 px-4 font-semibold rounded-lg text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
