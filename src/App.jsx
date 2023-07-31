import React, { useRef, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { MdLocationPin } from "react-icons/md";
import { BsTwitter, BsLink45Deg, BsFillSunFill } from "react-icons/bs";
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
  const [error, setError] = useState("No results");

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
        if (error.message === "Failed to fetch") {
          setError("Network error.");
        }
      });
  };

  return (
    <div className={dark}>
      <div className="bg-lightBg dark:bg-darkBg overflow-scroll lg:h-screen md:h-screen lg:overflow-hidden md:overflow-hidden flex justify-center items-start lg:items-center md:items-center transition duration-300 ease-in-out">
        <div className="flex flex-col lg:py-0 md:py-0 py-10 w-11/12 lg:px-0 md:px-0 px-1 lg:w-4/6 md:w-4/5 space-y-5">
          {/* Title */}
          <div className="flex flex-row justify-between">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              devfinder
            </span>
            <button
              className="flex flex-row justify-between items-center space-x-2"
              onClick={() => setDark(dark === "dark" ? "light" : "dark")}
            >
              {dark === "dark" ? (
                <div className="flex flex-row items-center text-white space-x-3 transition duration-300 ease-in-out hover:text-slate-500">
                  <span className="text-md font-semibold ">LIGHT</span>
                  <BsFillSunFill className="text-2xl hover:text-back" />
                </div>
              ) : (
                <div className="flex flex-row items-center text-slate-500 space-x-3 transition duration-300 ease-in-out hover:text-slate-800">
                  <span className="text-md font-semibold">DARK</span>
                  <HiMoon className="text-2xl" />
                </div>
              )}
            </button>
          </div>
          {/* Search */}
          <form
            className="flex flex-row justify-between items-center bg-white dark:bg-darkBgsec rounded-2xl shadow-md lg:p-3 md:p-3 p-2 space-x-5"
            onSubmit={handleSearch}
          >
            <div className="flex flex-row items-center lg:space-x-4 md:space-x-4 space-x-2 flex-1">
              <CiSearch className="lg:text-5xl md:text-5xl text-4xl text-sky-600 lg:ml-3 md:ml-3 ml-2" />
              <input
                type="text"
                name="searchUser"
                id="searchUser"
                placeholder="Search Github username_"
                className="text-slate-800 dark:text-white bg-transparent lg:text-lg md:text-lg text-sm w-full h-full py-3 focus:outline-none"
                ref={searchUserRef}
              />
              <span
                className={
                  username === "No user" || error === "Network error."
                    ? "hidden lg:block md:block w-52 text-center text-red-500 font-semibold"
                    : "hidden"
                }
              >
                {error}
              </span>
            </div>
            <button
              type="submit"
              className="bg-sky-600 text-white font-semibold rounded-xl lg:px-6 md:px-6 px-4 py-3 transition duration-300 ease-in-out hover:bg-sky-700"
            >
              Search
            </button>
          </form>
          <span
            className={
              username === "No user" || error === "Network error."
                ? "flex lg:hidden md:hidden w-full justify-center text-center text-red-500 font-semibold"
                : "hidden"
            }
          >
            {error}
          </span>
          {/* Main */}
          <div className="flex flex-col lg:flex-row justify-between bg-white dark:bg-darkBgsec rounded-2xl shadow-md lg:p-11 md:p-11 p-5">
            {/* Left */}
            <div className="flex flex-col space-y-8">
              <div className="flex md:flex-row lg:justify-center lg:items-start md:items-center md:space-x-12 lg:space-x-0 md:justify-start justify-between">
                <img
                  src={profile}
                  alt="Profile"
                  className="object-cover rounded-full overflow-hidden lg:w-32 lg:h-32 md:w-32 md:h-32 w-24 h-24"
                />
                <div className="lg:hidden flex flex-col space-y-2">
                  <span className="font-bold text-slate-700 dark:text-white md:text-2xl text-xl">
                    {username}
                  </span>
                  <span className="text-sky-600">@{userat}</span>
                  <span className="text-slate-500 md:text-base text-sm dark:text-white">
                    Joined {date}
                  </span>
                </div>
              </div>
              <span className="lg:hidden leading-relaxed text-slate-400 dark:text-white">
                {bio}
              </span>
            </div>
            {/* Right */}
            <div className="flex flex-col lg:space-y-9 md:space-y-12 space-y-4 lg:w-3/4">
              <div className="lg:flex flex-col space-y-5 md:hidden hidden">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold text-slate-700 dark:text-white text-2xl">
                      {username}
                    </span>
                    <span className="text-sky-600">@{userat}</span>
                  </div>
                  <span className="text-slate-500 dark:text-white">
                    Joined {date}
                  </span>
                </div>
                <span className="text-slate-400 dark:text-white">{bio}</span>
              </div>

              <div className="flex flex-row justify-between bg-slate-100 dark:bg-darkBg rounded-xl py-5 lg:px-10 md:px-10 px-5">
                <div className="flex flex-col space-y-2 text-center lg:text-left md:text-left">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Repos
                  </span>
                  <span className="lg:text-2xl md:text-2xl text-xl font-bold text-slate-800 dark:text-white">
                    {repo}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 text-center lg:text-left md:text-left">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Followers
                  </span>
                  <span className="lg:text-2xl md:text-2xl text-xl font-bold text-slate-800 dark:text-white">
                    {followers}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 text-center lg:text-left md:text-left">
                  <span className="text-sm text-slate-500 dark:text-white">
                    Following
                  </span>
                  <span className="lg:text-2xl md:text-2xl text-xl font-bold text-slate-800 dark:text-white">
                    {following}
                  </span>
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-6 flex flex-col w-full gap-y-3">
                <div
                  className={
                    location === "Location not specified"
                      ? "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center"
                  }
                >
                  <MdLocationPin className="lg:text-2xl md:text-2xl text-3xl flex-shrink-0" />
                  <span className="max-w-full break-all">{location}</span>
                </div>
                <div
                  className={
                    twitter === "Not Available"
                      ? "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center"
                  }
                >
                  <BsTwitter className="lg:text-2xl md:text-2xl text-3xl flex-shrink-0" />
                  <span className="max-w-full break-all">{twitter}</span>
                </div>
                <div
                  className={
                    website === "Website not available"
                      ? "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center hover:underline"
                  }
                >
                  <BsLink45Deg className="lg:text-2xl md:text-2xl text-3xl flex-shrink-0" />
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
                      ? "flex flex-row text-slate-500 text-sm lg:text-base md:text-base dark:text-white space-x-3 items-center opacity-70"
                      : "flex flex-row text-slate-500 text-sm lg:text-base md:text-base  dark:text-white space-x-3 items-center"
                  }
                >
                  <CgOrganisation className="lg:text-2xl md:text-2xl text-3xl flex-shrink-0" />
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
