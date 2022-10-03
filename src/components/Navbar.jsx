import { Link } from "react-router-dom"
import { HiFilm, HiSearch } from "react-icons/hi"
import Profile from "../assets/img/profile.png"

const Navbar = () => {
  return (
    <div className="flex items-center px-8 py-8 gap-4 text-lg lg:px-16 justify-between">
      <Link to="/" className="flex items-center text-indigo-500 font-bold">
        <HiFilm className="text-3xl text-indigo-500" />
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Link to="/search">
          <HiSearch className="text-2xl hover:text-indigo-500 transition-colors" />
        </Link>
        <Link to="/profile">
          <img
            src={Profile}
            alt="Profile"
            className="w-10 hover:scale-110 transition-transform"
          />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
