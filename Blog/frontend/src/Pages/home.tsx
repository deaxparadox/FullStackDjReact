import React from "react";

import Nav, { Footer } from "./layout";

const Home = (props: any): JSX.Element => {
    return (
        <>
            <Nav userDisplay={props.userDisplay} />
            <h1>This is home page</h1>
            <Footer />
        </>
    )
}

export default Home;