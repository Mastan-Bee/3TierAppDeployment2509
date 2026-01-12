// import React, { useEffect, useRef } from 'react'
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {

//       let emailInputRef = useRef();
//       let passwordInputRef = useRef();
//       let navigate = useNavigate();
//       let dispatch = useDispatch();

//       useEffect(()=>{
//         if(localStorage.getItem("token")){
//         onValidateToken();
//         }
        
//       },[])
     
//       let onValidateToken = async()=>{
//           let dataToSend = new FormData();
          
//           dataToSend.append("token",localStorage.getItem("token"));
          
  
  
//           let reqOptions = {
//               method:"POST",
//               body:dataToSend,
//               // headers:myHeaders
//           }
  
//           let JSONData = await fetch("/validateToken",reqOptions);
//           let JSOData = await JSONData.json();
//           console.log(JSOData);
//           alert(JSOData.msg)

//           if(JSOData.status === "Success"){
//             // localStorage.setItem("token",JSOData.data.token);
//             // localStorage.setItem("password",passwordInputRef.current.value);
//             dispatch({type:"login",data:JSOData.data})
//             navigate("/dashboard")
//           }
            
//       }
  
//        let onLogin = async()=>{
//           let dataToSend = new FormData();
          
//           dataToSend.append("email",emailInputRef.current.value);
//           dataToSend.append("password",passwordInputRef.current.value);
          
  
  
//           let reqOptions = {
//               method:"POST",
//               body:dataToSend,
//               // headers:myHeaders
//           }
  
//           let JSONData = await fetch("/login",reqOptions);
//           let JSOData = await JSONData.json();
//           console.log(JSOData);
//           alert(JSOData.msg)

//           if(JSOData.status === "Success"){
//             localStorage.setItem("token",JSOData.data.token);
//             // localStorage.setItem("password",passwordInputRef.current.value);
//             dispatch({type:"login",data:JSOData.data})
//             navigate("/dashboard")
//           }
            
//       }
  
//     return (
//       <div className='App'>
//         <form>
//           <h2>Login</h2>
          
//           <div>
//               <label>Email Id</label>
//               <input ref={emailInputRef}></input>
//           </div>
//           <div>
//               <label>Password</label>
//               <input ref={passwordInputRef}></input>
//           </div>
          
          
//           <div className='buttonClass'>
//               <button type="button" onClick={()=>{
//                   onLogin();
//               }}>Login</button>
//           </div>
  
//         </form>
//         <br></br>
//         <br></br>
//         <Link to={"/signup"}>Signup</Link>
//       </div>
//     )
//   }

// export default Login
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        // If token exists, validate it on page load
        if (localStorage.getItem("token")) {
            onValidateToken();
        }
    }, []);

    let onValidateToken = async () => {
        let dataToSend = new FormData();
        dataToSend.append("token", localStorage.getItem("token"));

        let reqOptions = {
            method: "POST",
            body: dataToSend,
        }

        let JSONData = await fetch("/validateToken", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);

        if (JSOData.status === "Success") {
            // Save user details in redux
            dispatch({ type: "login", data: JSOData.data });
            navigate("/dashboard");
        } else {
            // Token invalid or expired
            localStorage.removeItem("token");
        }
    }

    let onLogin = async () => {
        let dataToSend = new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);

        let reqOptions = {
            method: "POST",
            body: dataToSend,
        }

        let JSONData = await fetch("/login", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);

        if (JSOData.status === "Success") {
            // Save token in localStorage
            localStorage.setItem("token", JSOData.data.token);
            dispatch({ type: "login", data: JSOData.data });
            navigate("/dashboard");
        }
    }

    return (
        <div className='App'>
            <form>
                <h2>Login</h2>

                <div>
                    <label>Email Id</label>
                    <input ref={emailInputRef}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" ref={passwordInputRef}></input>
                </div>

                <div className='buttonClass'>
                    <button type="button" onClick={() => { onLogin(); }}>Login</button>
                </div>
            </form>
            <br /><br />
            <Link to={"/signup"}>Signup</Link>
        </div>
    )
}

export default Login;
