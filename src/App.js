import React, { useState, useEffect } from "react";
import axios from "axios";

const _BASE_URL = "https://randomuser.me/api";

export default function App() {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(_BASE_URL);
      setUsers(response.data.results);

      // console.log("Data axiosdan olindi");
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const fetchNextUser = async () => {
    // console.log("clicked FetchNextUserButton");
    setDisabled(true);

    try {
      const response = await axios.get(_BASE_URL);
      const newUser = { id: users.length + 1, ...response.data.results[0] };
      // console.log(response.data.results[0]);
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }

    setDisabled(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="japp-container">
      <div className="buttons">
        <button
          disabled={disabled}
          onClick={fetchNextUser}
          className="fetch-next-user-button"
        >
          Fetch Next User
        </button>
      </div>
      <div className="users-data">
        {users.map((user, idx) => (
          <div key={idx} className="user-data">
            <div className="img-container">
              <img src={user.picture.thumbnail} alt={user.name.first} />
            </div>
            <div className="data-container">
              <p>{user.email}</p>
              <p>
                {user.name.first} {user.name.last}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
