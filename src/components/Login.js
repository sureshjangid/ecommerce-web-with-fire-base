import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { auth } from '../Config/Config';

const Login = () => {
let history = useHistory();
  let [userLogin,setUserLogin] = useState({
    email:"",
    password:""
  });

  let [error,setError] = useState('');
  let [success,setSuccess] = useState('');

  let {email,password} = userLogin;

  let inputFiled = (e)=>{
    setUserLogin({...userLogin,[e.target.name]:e.target.value});
  }

  let handleLogin =(e)=>{
    e.preventDefault();
auth.signInWithEmailAndPassword(email,password).then(()=>{
  setSuccess('Login Successfully');
  setUserLogin('');
  setTimeout(()=>{
    setSuccess('');
    history.push('/');
  },3000)
}).catch((error)=>{

  
  setError(error.message);
  setTimeout(() => {
    setError('');
  }, 5000);
})

    console.log(userLogin);
  }
   return (
    <div>
        <div className="container p-5">
            <div className="row">
                <div className="col-lg-6 mx-auto">
            <h1>Login User</h1>
            <hr />
            {success && (
              <>
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              </>
            )}
            <form onSubmit={handleLogin}>

                    <input type="email" placeholder="Enter email" onChange={e=>inputFiled(e)} value={email} name="email" className="form-control mb-1"/>
                    <input type="password" placeholder="Enter password"onChange={e=>inputFiled(e)} value={password}  name="password" className="form-control mb-1"/>
                    <p>Don't have account click  <NavLink to="/signup">here</NavLink> </p>  <button className="btn btn-outline-success">Login</button>
            </form>
            {error && (
              <>
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </>
            )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login