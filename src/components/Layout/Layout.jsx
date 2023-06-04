import React from "react";
import Navigation from "./Navigation";

const Layout = (props) => {
    return (
        <div>
            <Navigation />
            <>{props.children}</>
        </div>
    );
};

export default Layout;
