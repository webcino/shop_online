import './authentication.styles.scss';
import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

const Authentication = () => {

    // useEffect(
    //     () => async () => {
    //       const response = await getRedirectResult(auth);
          
    //       if (response){
    //         const userDocRef = await createUserDocument(response.user)
    //       }
    //     },
    //     []
    //   );

    return (
        <div className="authentication-container">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default Authentication