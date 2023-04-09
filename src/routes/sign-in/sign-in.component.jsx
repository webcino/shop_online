import { useEffect } from "react";
import {  getRedirectResult } from "firebase/auth";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils"
import { createUserDocument } from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignIn = () => {

    // useEffect(
    //     () => async () => {
    //       const response = await getRedirectResult(auth);
          
    //       if (response){
    //         const userDocRef = await createUserDocument(response.user)
    //       }
    //     },
    //     []
    //   );

    const logGooglePopupUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocument(user)
    }


    return (
        <div>
            <h1> Sign In Page</h1>
            <Button onClick={logGooglePopupUser}>Google Popup Sign In</Button>
            <SignUp />

            {/* <button onClick={signInWithGoogleRedirect}>Google Redirect Sign In</button> */}

        </div>
    )
}

export default SignIn