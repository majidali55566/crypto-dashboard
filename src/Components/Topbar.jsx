/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
function Topbar({ openSidebar }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the current date and time every minute
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means the effect runs once when the component mounts

  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = currentDateTime.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="topbar">
      <div className="name-time">
        <button onClick={openSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="32px"
            height="32px"
          >
            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
          </svg>
        </button>
        <div className="hello-user">
          <h1>Hello Majid</h1>
          <p>
            {formattedTime} {formattedDate}
          </p>
        </div>
      </div>
      <div className="search-bar flex-group align-items-center">
        <img src="/images/search-normal.svg" alt="search icon" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="flex-group align-items-center gap-regular">
        <div className="notification">
          <img src="/images/notification.svg" alt="notification icon" />
        </div>
        <div className="user-profile">
          <p>Majid Ali</p>
          <img src="./images/majid2.jpeg" alt="user-picture" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
