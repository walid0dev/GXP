import { NavLink } from "react-router-dom";
import {
  IoLogoGameControllerB as ControllerIcon,
  IoMdHome as HomeIcon,
  IoMdPeople as PeopleIcon,
} from "react-icons/io";

const navLinks = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/games", label: "Games", icon: ControllerIcon },
  { to: "/creators", label: "Creators", icon: PeopleIcon },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between  px-4 py-4">
      <NavLink to={"/"} className={"font-pixel text-6xl animate-pulse"}>
        GXP
      </NavLink>
      <div className="flex gap-2 text-xl">
        {navLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 px-3 py-2 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground  hover:text-foreground"
              }`
            }
          >
            <Icon className="text-2xl" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
