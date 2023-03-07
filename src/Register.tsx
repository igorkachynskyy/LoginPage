/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/react-in-jsx-scope */
import { type ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
export function Register (): ReactElement {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoader, setLoader] = useState<boolean>(false)
  const navigate = useNavigate()
  async function registersbm (): Promise<void> {
    const result = await fetch('http://localhost:5001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email,
          username,
          last_name: lastName,
          fist_name: firstName,
          password_: password
        }
      })
    })
    if (result.status === 200) {
      navigate('/login')
    } else {
      setError('error')
      setTimeout(() => { setError('') }, 200)
    }
  }
  return (
        <>
        <head>
        <title>Register</title>
        <meta charSet="utf-8" />
        </head>
        <header>
        <div className="header" style={{ backgroundColor: '#ffd700' }}>
           <h1>Basic Register</h1>
        </div>
        </header>

    <body>
        <div id="register-div">
            <form method="post" id="login-from">
                <div className="form-group">
                    <label htmlFor="email">User Name</label>
                    <input type="text" className={`form-control input ${error}`} id="username" value={username} onChange={_username => { setUsername(_username.target.value) }} placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className={`form-control input ${error}`} id="username" value={email} onChange={_email => { setEmail(_email.target.value) }} placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">First Name</label>
                    <input type="text" className={`form-control input ${error}`} id="firstname" value={firstName} onChange={_firstName => { setFirstName(_firstName.target.value) }} placeholder="Enter first name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Last Name</label>
                    <input type="text" className={`form-control input ${error}`} id="lastname" value={lastName} onChange={_lastName => { setLastName(_lastName.target.value) }} placeholder="Enter last name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" className={`form-control input ${error}`} id="pwd" value={password} onChange={_password => { setPassword(_password.target.value) }} placeholder="Enter password"/>
                </div>
                <div id="submit_div">
              <button type="button" id="submit_button" onClick={registersbm}>
                <span className="button_top"> Button </span>
              </button>
            </div>
            </form>
            {isLoader && <div id="spinner"></div>}
        </div>
    </body></>
  )
}
