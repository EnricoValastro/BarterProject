import React from "react";
import SignIn from "../../components/SignIn/SignIn";

export default function SigninPage(props) {

    return (
        <div>
            <SignIn setToken={props.setToken} />
        </div>
    )
}