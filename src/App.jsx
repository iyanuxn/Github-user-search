import React, { useState } from "react";
import { HiMoon } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import profileimg from "./assets/Bitmap.svg";

function App() {
  const [dark, setDark] = useState("");
  const [profile, setProfile] = useState(profileimg);
  const [username, setUsername] = useState("The Octocat");
  const [date, setDate] = useState("25 Jan 2011");

  return (
    <div className={dark}>
      <div className="bg-lightBg h-screen dark:bg-darkBg flex flex-col justify-center items-center p-10">
        <div className="flex flex-col w-4/6 rounded-3xl p-10 space-y-10">
          {/* Title */}
          <div className="flex flex-row justify-between">
            <span className="text-3xl font-bold text-slate-800">devfinder</span>
            <div className="flex flex-row justify-between items-center space-x-2">
              <span className="text-slate-500 text-lg font-semibold">DARK</span>
              <HiMoon className="text-3xl text-slate-500" />
            </div>
          </div>
          {/* Search */}
          <div className="flex flex-row justify-between items-center bg-white rounded-2xl shadow-lg p-3">
            <div className="flex flex-row items-center space-x-4">
              <CiSearch className="text-4xl text-sky-600 ml-4" />
              <span className="text-slate-400 text-lg">
                Search Github username_
              </span>
            </div>
            <button className="bg-sky-600 text-white rounded-xl px-8 py-4 font-bold">
              Search
            </button>
          </div>
          {/* Main */}
          <div className="flex flex-row justify-between bg-white rounded-2xl shadow-lg p-11">
            {/* Left */}
            <div className="flex justify-center rounded-full overflow-hidden w-32 h-32">
              <img src={profile} className="object-cover" />
            </div>
            {/* Right */}
            <div className="flex flex-row justify-between w-3/4">
              <span>{username}</span>
              <span>Joined {date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
