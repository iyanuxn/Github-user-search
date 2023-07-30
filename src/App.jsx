import React, { useRef, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdLocationPin } from "react-icons/md";
import { BsTwitter, BsLink45Deg } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import profileimg from "./assets/Bitmap.svg";

function App() {
  const [dark, setDark] = useState("light");
  const [profile, setProfile] = useState(profileimg);
  const [username, setUsername] = useState("The Octocat");
  const [date, setDate] = useState("25 Jan, 2011");
  const [userat, setUserat] = useState("octocat");
  const [bio, setBio] = useState("The profile has no bio");
  const [repo, setRepo] = useState("8");
  const [followers, setFollowers] = useState("3938");
  const [following, setFollowing] = useState("9");
  const [location, setLocation] = useState("San Francisco");
  const [twitter, setTwitter] = useState("Not Available");
  const [website, setWebsite] = useState("https://github.blog");
  const [organization, setOrganization] = useState("@GitHub");

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const searchUserRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page reload
    const user = searchUserRef.current.value;
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.avatar_url || profileimg);
        setUsername(data.name || "No user");
        setDate(formatDate(data.created_at) || "No date");
        setUserat(data.login || "No user");
        setBio(data.bio || "No bio");
        setRepo(data.public_repos || 0);
        setFollowers(data.followers || 0);
        setFollowing(data.following || 0);
        setLocation(data.location || "Location not specified");
        setTwitter(data.twitter_username || "Not Available");
        setWebsite(data.blog || "Website not available");
        setOrganization(data.company || "No Organization");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={dark}>
      <div className="bg-lightBg dark:bg-darkBg h-screen overflow-hidden flex justify-center items-center transition duration-300 ease-in-out">
        <div className="flex flex-col w-4/6 space-y-5">
          {/* Title */}
          <div className="flex flex-row justify-between">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              devfinder
            </span>
            <div className="flex flex-row justify-between items-center space-x-2">
              <span className="text-slate-500 dark:text-white text-md font-semibold">
                DARK
              </span>
              <HiMoon
                className="text-slate-500 dark:text-white text-2xl cursor-pointer"
                onClick={() => setDark(dark === "dark" ? "light" : "dark")}
              />
            </div>
          </div>
          {/* Search */}
          <form
            className="flex flex-row justify-between items-center bg-white dark:bg-darkBgsec rounded-2xl shadow-md p-3 space-x-5"
            onSubmit={handleSearch}
          >
            <div className="flex flex-row items-center space-x-4 flex-1">
              <CiSearch className="text-3xl text-sky-600 ml-3" />
              <input
                type="text"
                name="searchUser"
                id="searchUser"
                placeholder="Search Github username_"
                className="text-slate-800 dark:text-white bg-transparent text-lg w-full h-full py-3 focus:outline-none"
                ref={searchUserRef}
              />
              <span
                className={
                  username === "No user"
                    ? "w-36 text-center text-red-500 font-semibold"
                    : "hidden"
                }
              >
                No results
              </span>
            </div>
            <button
              type="submit"
              className="bg-sky-600 text-white font-semibold rounded-xl px-6 py-3 transition duration-300 ease-in-out hover:bg-sky-700"
            >
              Search
            </button>
          </form>
          {/* Main */}
          <div className="flex flex-row justify-between bg-white dark:bg-darkBgsec rounded-2xl shadow-md p-11">
            {/* Left */}
            <div className="flex justify-center rounded-full overflow-hidden w-32 h-32">
              <img src={profile} alt="Profile" className="object-cover" />
            </div>
            {/* Right */}
            <div className="flex flex-col space-y-9 w-3/4">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold text-slate-700 dark:text-white text-2xl">
                      {username}
                    </span>
                    <span className="text-sky-600">@{userat}</span>
                  </div>
                  <span className="text-slate-400 dark:text-white">
                    Joined {date}
                  </span>
                </div>
                <span className="text-slate-400 dark:text-white">{bio}</span>
              </div>

              <div className="flex flex-row justify-between bg-slate-100 dark:bg-darkBg rounded-xl py-5 px-10">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Repos
                  </span>
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    {repo}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Followers
                  </span>
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    {followers}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Following
                  </span>
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    {following}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                <div
                  className={
                    location === "Location not specified"
                      ? "flex flex-row text-slate-500 dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 dark:text-white space-x-3 items-center"
                  }
                >
                  <MdLocationPin className="text-2xl flex-shrink-0" />
                  <span className="max-w-full break-all">{location}</span>
                </div>
                <div
                  className={
                    twitter === "Not Available"
                      ? "flex flex-row text-slate-500 dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 dark:text-white space-x-3 items-center"
                  }
                >
                  <BsTwitter className="text-2xl flex-shrink-0" />
                  <span className="max-w-full break-all">{twitter}</span>
                </div>
                <div
                  className={
                    website === "Website not available"
                      ? "flex flex-row text-slate-500 dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 dark:text-white space-x-3 items-center"
                  }
                >
                  <BsLink45Deg className="text-2xl flex-shrink-0" />
                  <a
                    className="max-w-full break-all"
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span> {website}</span>
                  </a>
                </div>
                <div
                  className={
                    organization === "No Organization"
                      ? "flex flex-row text-slate-500 dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 dark:text-white space-x-3 items-center"
                  }
                >
                  <CgOrganisation className="text-2xl flex-shrink-0" />
                  <span className="max-w-full break-all">{organization}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
