import React from "react";
import { Link } from 'react-router-dom';

const Nav = (props: any) : JSX.Element => {
    // console.log(props.userDisplay)
    return (
        <>
            <nav>
                <h1>Todo Project</h1>
                {
                    props.userDisplay
                    ? (
                        <Link to="/logout">Logout</Link>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )
                }
            </nav>
        </>
    )
}


export const Footer = (props: any) : JSX.Element => {
    return (
        <footer>
            <p>Copyright - Paradox</p>
        </footer>
    )
}
export default Nav