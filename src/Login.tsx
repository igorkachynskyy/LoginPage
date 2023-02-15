import {useState} from 'react'
import { useNavigate} from 'react-router-dom';
import "./Login.css"
export function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] =useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    async function databaseask(){
      setLoader(true);
      let answer = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      const result = await answer.json();
      setLoader(false);
      if(answer.status === 200){
        localStorage.setItem("JsonWebToken", "Bearer " + result.jwt);
        navigate(`/user/${result.id}`);
      }
      else{
      setError("error");
      setTimeout(()=>{setError("")}, 200);
      }
    }
    return(
       <>
    <head>
    <title>Login</title>
    <meta charSet="utf-8" />
  </head>
        <header>
        <div className="header" style={{backgroundColor: "#ffd700"}}>
           <h1>Basic Login</h1>
        </div>
        </header>
        <body>
    <div id="login-div">
      <form id="login-from">
        <div className="form-group">
          <label htmlFor="email">User Name</label>
          <input
            type="text"
            className={`form-control input ${error}`}
            id="email"
            value={email}
            onChange={_email => setEmail(_email.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            className={`form-control input ${error}`}
            id="pwd"
            onChange={pwd => setPassword(pwd.target.value)}
            value = {password}
            placeholder="Enter password"
          />
        </div>
        <div className="checkbox">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
          <p id="checkbox_text">Remember me</p>
        </div>
        <div id="submit_div">
          <button type="button" id="submit_button" onClick={databaseask}>
            <span className="button_top"> Button </span>
          </button>
        </div>
        <div id="link_register_div">
          <p>Are you new user?</p>
          <a id="register_link" onClick={()=>(navigate("/register"))}>Register </a>
        </div>
      </form>
      {isLoader && <div id="spinner"></div>}
    </div>
  </body>
</>
    );
}