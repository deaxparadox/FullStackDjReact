import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav, { Footer } from "./layout";



const Login = (props: any): JSX.Element => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handlerUsername = (e: any) => {
        setUsername(e.target.value)
        // console.log(username)
    }

    const handlerPassword = (e: any) => {
        setPassword(e.target.value)
        // console.log(password)
    }

    const handlerLogin = () => {
        console.log(username, password)
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate("/")
    }

    return (
        <>
            <Nav userDisplay={false} />
            <form action="">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="usernameInput" onChange={(e) => {handlerUsername(e)}} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="passwordInput" onChange={(e) => handlerPassword(e)} />

                <button type="submit" onClick={() => {handlerLogin()}}>Login</button>
            </form>
            {/* <button type="submit" onClick={() => {handlerLogin()}}>Login</button> */}
            <Footer />
        </>
    )
}

export default Login;