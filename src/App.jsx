import { useState } from 'react'

import './App.css'

function App() {
  const [formerror, setformerror] = useState({});
  const [formsubmitted, setformsubmitted] = useState(false);
  const [action, setaction] = useState("sign-up");
  
  const [input, setinput] = useState({ name: "", email: "", password: "" });

  function handledata(e) {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  function handlesubmit(e) {
    e.preventDefault();
    const errors = validate(input);
    setformerror(errors);
    setformsubmitted(true);

    if (Object.keys(errors).length === 0) {
      if (action === "sign-up") {
        // Save user details to localStorage
        localStorage.setItem("user", JSON.stringify(input));
        alert("Sign up successful! You can now log in.");
        setaction("login"); // Switch to login after sign up
      } else if (action === "login") {
        // Get user details from localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (
          
          savedUser.email === input.email &&
          savedUser.password === input.password
        ) {
          alert("Login successful!");
        } else {
          setformerror({ email: "Invalid email or password" });
          return;
        }
      }
      setinput(data);
    }
  }

  function validate(value) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z ]+$/;
    if (action === "sign-up") {
      if (!value.name) {
        errors.name = "Name is required";
      } else if (!nameRegex.test(value.name)) {
        errors.name = "Name can only contain alphabets";
      }
    }
    if (!value.email) {
      errors.email = "Email is required";
    } else if (!regex.test(value.email)) {
      errors.email = "Email is invalid";
    }
    if (!value.password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  return (
    <>
      <div className="bg-gradient-to-t from-blue-500 to-blue-700 h-screen flex items-center justify-center">
        <div className='form bg-white rounded-lg w-1/3 p-4'>
          <div className="btn text-center my-4">
            <button
              className={`${action === "sign-up" ? "bg-blue-500" : "bg-slate-200"} py-3 px-8 rounded-l-lg font-bold `}
              onClick={() => setaction("sign-up")}
              type="button"
            >
              Sign up
            </button>
            <button
              className={`${action === "login" ? "bg-blue-500" : "bg-slate-200"} py-3 px-8 rounded-r-lg font-bold `}
              onClick={() => setaction("login")}
              type="button"
            >
              Login
            </button>
          </div>
          <form className='flex m-4 flex-col gap-3' onSubmit={handlesubmit}>
            {action === "sign-up" && (
              <div>
                <input
                  type="text"
                  name='name'
                  placeholder='Name'
                  value={input.name}
                  onChange={handledata}
                  className='p-2 w-full  rounded-lg bg-gray-100 border-1'
                />
                <p className='m-2 text-red-600'>{formerror.name}</p>
              </div>
            )}
            <input
              type="email"
              name='email'
              placeholder='Email'
              value={input.email}
              onChange={handledata}
              className='p-2 rounded-lg bg-gray-100 border-1'
            />
            <p className=' text-red-600'>{formerror.email}</p>
            <input
              type="password"
              name='password'
              placeholder='Password'
              value={input.password}
              onChange={handledata}
              className='p-2 rounded-lg bg-gray-100 border-1'
            />
            <p className='m-2 text-red-600'>{formerror.password}</p>
            <button
              className='bg-gradient-to-t from-blue-500 to-blue-700 w-full hover:cursor-pointer hover:bg-blue-900 p-2 rounded-lg text-xl'
              type="submit"
            >
              {action === "login" ? "Login" : "Sign up"}
            </button>
          </form>
          {action === "login" && (
            <div className='px-4'>
              Forget-password?{" "}
              <button className='text-blue-300'>click here!</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App