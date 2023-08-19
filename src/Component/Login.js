import { useState } from "react"

const Login = () => {

    const [userName, setUserName] = useState(localStorage.getItem('userName')??'')
    const [passWord, setPassWord] = useState(localStorage.getItem('passWord')??'')
    const [showPW, setShowPW] = useState(false)
    localStorage.setItem('userName',userName)
    localStorage.setItem('passWord',passWord)

    const handleLogin = () => {
        console.log(userName,passWord)
        fetch('http://localhost:3005/v1/app/login',{
            method:"POST",
            headers: {
                "Accept-language": "RU",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username:userName,
                password:passWord
            }),
        }).then((res)=>res.json())
        .then(data=>{
            console.log(data)
        }).catch(error=>console.log(error))
    }
    // const handleLogin = () => {
    //     fetch('http://localhost:3005/v1/app/getAllUsers',{
    //         method:"GET",
    //         headers: {
    //             "Accept-language": "RU",
    //             "Content-Type": "application/json"
    //         },
    //     }).then((res)=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     }).catch(error=>console.log(error))
    // }
    return (

        <div>
            <h2>Login</h2>
            <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="UserName"
            />
            <input
                type={showPW ? "password" : "text"}
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                placeholder="PassWord"
            >
                {/* <span onClick={() => setShowPW(!showPW)}>Show</span> */}
            </input>
            <div><button onClick={handleLogin}>Login</button></div>

        </div>
    )
}
export default Login