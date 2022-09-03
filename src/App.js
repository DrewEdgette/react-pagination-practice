import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";

function App() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const RESULTS_PER_PAGE = 5;
  const TOTAL_RESULTS = 50;

  let lastIndex = currentPage * RESULTS_PER_PAGE;
  let firstIndex = lastIndex - RESULTS_PER_PAGE;
  let slice = userList.slice(firstIndex, lastIndex);

  const fetchUserList = async () => {
    const response = await fetch(
      `https://randomuser.me/api?results=${TOTAL_RESULTS}`
    );
    const json = await response.json();

    setUserList(json.results);
  };

  const fillPagination = () => {
    const arr = [];

    for (let i = 1; i <= Math.ceil(TOTAL_RESULTS / RESULTS_PER_PAGE); i++) {
      arr.push(i);
    }

    setPagination(arr);
  };

  useEffect(() => {
    fetchUserList();
    fillPagination();
  }, []);

  return (
    <div className="App">
      {slice.map((user, index) => (
        <UserInfo user={user} index={index}></UserInfo>
      ))}

      {pagination.map((i) => {
        return (
          <button key={i} onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        );
      })}
    </div>
  );
}

export default App;
