import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocument } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocument(user)
    }

    return (
        <div>
            <h1> Sign In Page</h1>
            <button onClick={logGoogleUser}>Google Sign In</button>
        </div>
    )
}

export default SignIn