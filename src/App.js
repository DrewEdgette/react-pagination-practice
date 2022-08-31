import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(50);

  const lastIndex = currentPage * resultsPerPage;
  const firstIndex = lastIndex - resultsPerPage;
  const slice = userList.slice(firstIndex, lastIndex);

  const pagination = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pagination.push(i);
  }

  const fetchUserList = async () => {
    const response = await fetch(`https://randomuser.me/api?results=${totalResults}`);
    const json = await response.json();

    setUserList(json.results);
  };

  const getUserInfo = (user, index) => {
    return (
      <li key={index}>
        <p><img src={user.picture.large}></img></p>
        <p>{user.name.first + " " + user.name.last}</p>
      </li>
    );
  };

  useEffect(() => {
    fetchUserList();
  }, []);


  return (
    <div className="App">
      {slice.map((user, index) => getUserInfo(user, index))}

      {pagination.map((i) => {
        return (
            <button key={i} onClick={() => setCurrentPage(i)}>{i}</button>
  
        )
      })}

    </div>
  );
}

export default App;
