import React, { useRef } from 'react';
import axios from 'axios';
import "../ui/UI.css";


function User(props) {
  const refName = useRef(null);
  const refSurname = useRef(null);

  const createUser = (event) => {
    event.preventDefault();
    axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/users", {
			data: {
        name: refName.current.value,
        surname: refSurname.current.value
    	}
		},
		{
			headers: { "X-Access-Token": process.env.REACT_APP_ACCESS_TOKEN }
		})
		.then(function (res) {
			localStorage.setItem("userId", res.data.id);
      props.userIdGet(res.data.id); 
		})
		.catch(function (error) {
			console.log(error);
		});
  };
  return (
		<div className="User">
      <form className="user-form" onSubmit={(event) => createUser(event)}>
        <div><input type="text" ref={refName} name="name" required placeholder="Name" /></div>
        <div><input type="text" ref={refSurname} name="surname" required placeholder="Surname" /></div>
        <div><input type="submit" onClick={createUser} value="Create user" /></div>
      </form> 
		</div>
  );
}

export default User;