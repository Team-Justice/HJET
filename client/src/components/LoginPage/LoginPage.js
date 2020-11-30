import React, { useState, useContext } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Box, Card, CardContent, TextField, Button } from "@material-ui/core";
import { object, string} from 'yup';
import axios from 'axios';
import './LoginPage.css';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import UserContext from "../../context/UserContext";
import HJETpic from '../../HJETpic.png';
// import ErrorNotice from "../misc/ErrorNotice";

const InitialValues = {
    // login info
    email: "",
    password: ""
};

const SignupSchema = object().shape({
    // login info validations
    email: string()
        .email('Invalid email')
        .required('Required'),
    password: string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
});



export default function LoginPage() {
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    // tesing hooks for login messages
    var [showSuccess = false, setSuccess ] = useState();
    var [showFailed = false,  setFailed ] = useState();
    return (
        <div>
            <Alert show={showSuccess} variant="success">
                <Alert.Heading>Successfully Logged In!</Alert.Heading>
            </Alert>

            <Alert show={showFailed} variant="danger">
                <Alert.Heading>Invalid login name or password</Alert.Heading>
                <p>
                    Please check your username and password and try again. 
                </p>
            </Alert>
            <img src={HJETpic} width={500} class="center"/>
            <Card className="card">
                <CardContent>
            
                    <h3 className="greContainer">Sign In</h3>

                    <Formik
                        // add form validation through Yup api
                        validationSchema={SignupSchema}
                        // initiate form values
                        initialValues={InitialValues}
                        // logic to send form data to the backend
                        onSubmit={async (values) => {
                            console.log("onsubmit")
                            console.log(showSuccess)

                            try {
                                const loginRes = await axios.post(
                                    "/users/login",
                                    values
                                );
                                // console.log(loginRes);
                                // console.log("data.email",loginRes.data.user.email);
                                // console.log("data.admin",loginRes.data.user.admin);
                                setUserData({
                                    token: loginRes.data.token,
                                    user: loginRes.data.user,
                                });
                                localStorage.setItem("auth-token", loginRes.data.token);
                                localStorage.setItem("isAdmin", loginRes.data.user.admin);

                                setFailed(false);
                                setSuccess(true);
                                // this.props.loginAuthentication();
                                // showFailed = false;
                                // showSuccess = true;

                                // redirect to homepage after 2.5 sec if successful
                                setTimeout(() => {
                                    history.push('/mainMenu');
                                }, 2500);
                            } catch (err) {
                                console.log("error occured");
                                console.log(err);

                                setSuccess(false);
                                setFailed(true);
                                // showSuccess = false;
                                // showFailed = true;
                                
                                // err.response.data.msg && setError(err.response.data.msg);
                            }

                            document.body.scrollTop = document.documentElement.scrollTop = 0;                            
                        }}
                    >

                        {({ values, errors, isSubmitting }) => (
                            <Form>
                                <div className="greContainer">
                                    <Box>
                                        <Field name="email" label="Email" as={TextField} variant="outlined" margin="normal" helperText={<ErrorMessage name="email" />} />
                                    </Box>
                                </div>

                                <div className="greContainer">
                                    <Box>
                                        <Field name="password" label="Password" fullWidth as={TextField} type="password" variant="outlined" margin="normal" helperText={<ErrorMessage name="password" />} />
                                    </Box>
                                </div>

                                <div className="greContainer">
                                    <Button type="submit" variant="contained"  margin="normal" color="primary" disabled={isSubmitting}>Sign In</Button>
                                </div>

                                {/* allows us to see state of errors in form for validation debugging */}
                                {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}

                                {/* allows us to see the state of the form for debugging */}
                                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
}