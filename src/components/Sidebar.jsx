import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  //const [dark, setDark] = useState(false);

  //early return pattern
  if (!isMenuOpen) return null;
  return (
    <div className="shadow-gray-400 font-medium text-center p-6 min-h-screen shadow-lg border rounded-xl col-span-1 text-black">
      <h1 className="font-semibold text-lg text-left">Yours Corner</h1>

      <ul>
        <Link to="/">
          <li className="p-3 my-3 bg-slate-200">Home</li>
        </Link>
        <li className="p-3 my-3 bg-slate-200 ">Profile</li>
        <li className="p-3 my-3 bg-slate-200 ">Liked Videos</li>
        <li className="p-3 my-3 bg-slate-200 ">Watch Later</li>
      </ul>
      <h1 className="font-semibold text-lg text-left ">Your Subscriptions</h1>
      <ul>
        <li className="p-2 my-3 bg-slate-200 ">Movies</li>
        <li className="p-2 my-3 bg-slate-200 ">Music</li>
        <li className="p-2 my-3 bg-slate-200 ">Entertainment</li>
        <li className="p-2 my-3 bg-slate-200 ">Comedy</li>
      </ul>
    </div>
  );
};

export default Sidebar;
