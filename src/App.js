import { useEffect, useState } from 'react';
import './App.css';
import { UserForm } from './components/UserForm';

const URL = 'http://localhost:5000/users';

function App() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //update
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    email: ''
  })
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');


  const getAllUsers = () => {
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw Error('could not get data')
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setUsers(data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  
    //delete user
    const handleDelete = (id) => {
      fetch(URL + `/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) {
            throw Error('could not delete')
          }
          getAllUsers();
        })
        .catch(error => {
          setError(error.message)
        })
    }
  


  //post user
  const addUser = (user) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then(res => {
        if (!res.ok) {
          throw Error('not created')
        }
        getAllUsers();
      })
      .catch(error => {
        setError(error.message)
      })
  }

  //handle edit input
  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);
    // alert(id);
    const filteredData = users.filter((user) => user.id === id);
    // console.log(filteredData);
    setSelectedUser({
      name: filteredData[0].name,
      email: filteredData[0].email
    })
  }

  //update data
  const handleUpdate = (user) => {
    // console.log(user);
    fetch(URL + `/${selectedUserId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
      .then(res => {
        if (!res.ok) {
          throw Error('not created')
        }
        getAllUsers();
        setUpdateFlag(false);
      })
      .catch(error => {
        setError(error.message)
      })
  }


  return (
    <div className='App'>
      <h2>User Management App</h2>
      {isLoading && <h2>Data loading..</h2>}
      {error && <h2>{error}</h2>}

      {updateFlag ? <UserForm btnText="Update User" selectedUser={selectedUser} handleFormData={handleUpdate} />
        :
        <UserForm btnText="Add User" handleFormData={addUser} />}

      <section>
        {users && users.map((user) => {
          const { id, name, email } = user;
          return (
            <article key={id} className="card">
              <p>{name}</p>
              <p>{email}</p>
              <button className='btn' onClick={() => handleEdit(id)}>Edit</button>
              <button className='btn' onClick={() => handleDelete(id)}>Delete</button>
            </article>
          );
        })}
      </section>

    </div>
  );
}

export default App;
