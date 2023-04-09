import { useState } from "react"
import { createUserEmailPassword, createUserDocument } from "../../utils/firebase/firebase.utils";
import FormInput from "../../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUp = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handlesubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword){
            alert('Passwords do not match!')
            return;
        }

        try {

            const { user } = await createUserEmailPassword(email, password)
            await createUserDocument(user, { displayName})
            resetFormFields()

        } catch (err) {
            if (err.code == 'auth/email-already-in-use'){
                alert('Email already in use')
            }
            console.log('User Creation Failed : ',err.message);

        }

    }

    const handleChange = (event) => {
        
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h2>Dont have an Account?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handlesubmit}>

                <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button buttonType='default' type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp