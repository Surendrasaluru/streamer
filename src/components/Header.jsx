import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  //console.log(searchQuery);
  //const navigate = useNavigate();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  /*here we apply debouncing effect
  * we have to make api calls after every key press.
  * but if the time differnce between consecutive 2 key strokes is less than 200ms decline API Call
  
  */

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestions(), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json[1]);
    setSuggestions(json[1]);
  };
  return (
    <div className="grid grid-flow-col p-2 shadow-xl">
      <div className="flex col-span-1">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAVFBMVEX///8AAADy8vKioqL5+fkrKyt0dHTQ0NDT09M2Nja5ubnr6+upqamVlZVSUlLc3Nzi4uLExMRfX19FRUVsbGw+Pj5lZWWNjY2CgoJ6enoLCwsXFxdPKYE2AAACRklEQVR4nO3dC46jMAyAYRa6hVLenc6Uzv3vuaBqZh9STCyt5MT6vxPYSiAhGFMUAAAAAAAAAAAAuTqVSTspUrk2/XL5mazL0jfX2FTa24/k3dqodOo360DjvNXHucwX6yhjXWY/uRxnMy3WEWosk5hMZR2fTiXl0tytw9O5N0IyrXV0Wm04l+vZOjitc3i1GTObZds8G8OXjHVseuGLprYOTS+8DXCVTPNpHZvWZ3iaTYN1cFpDeA9QflgHp9WXwWRcLZrF9G4dnc67uNPMbGikgSmKU1ZXzcfBwcaU0fbsLD/O7Nk8rGOM9TjMZbs/d1lsN++dcFf+Q10lv3gOVcTZzMtpqtuuSlbX1pPmTHNLKGGqRAAAAAAAAID/J+m6RtXBWTnO/XpO1trPY9xB8zYo8/q0Pks+8lznqOEZe+tI4/ThSpNvdTblc8vhi4Am+bcZvw1StdnmulpHqLHK5cCddXw6nZTLmNEk2w3STSCzMgCxEKDM5k3zl0d48Zwy+Ajgb7fw6/Mm+ZX/X0/KGlMllDV6mmaubgCubs2uFk1f2xlXG01fjwCuHs58PTb7OtDwddRUuDoEfA2P9RGshLpGAAAAAAAAWLH+5FeiS8TRh9qOPqH31NzAU9sJTw1BXLVqyawQQGyi46q9UWYDI5c1ZnXF7ISWYK6atblqo+eqEtBVMq6agrpq1+qqka6rRdNX82lXbcGLMZvSud1yUHLmqZV+Ttkc5+Lr9xO+fgxSuPplyy7pqkbqGgEAAAAAAAAAQM5+AbaoXAOXviXAAAAAAElFTkSuQmCC"
          alt="menu"
          className="h-12 mx-3 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />

        <img
          src="https://cdn.pixabay.com/photo/2020/11/01/04/41/youtube-5702871_640.jpg"
          alt="logo"
          className="h-12 cursor-pointer"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            type="text"
            className="border border-black border-collapse w-1/2 rounded-l-full p-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button
            type="button"
            className="text-white text-center bg-gradient-to-r from-red-400 rounded-r-full via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium  p-4  text-md border border-black"
          >
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-5 w-[34rem] shadow-lg shadow-gray-400 rounded-lg">
            <ul>
              {suggestions.map((e) => (
                <li
                  className="px-5 py-3 shadow-sm hover:bg-gray-200"
                  key={e}
                  //onClick={(e) => setSearchQuery(e.target.value)}
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="py-2">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt="user"
          className="h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
