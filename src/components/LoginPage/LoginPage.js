import React, { Component, Children, useState, useContext } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Box, Card, CardContent, TextField, Button } from "@material-ui/core";
import { object, string} from 'yup';
import axios from 'axios';
import './LoginPage.css';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import UserContext from "../../context/UserContext";


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


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unsuccessfulSubmit: false,
            showSuccess: false,
        }
        this.checkUnsuccessfulSubmit = this.checkUnsuccessfulSubmit.bind(this);
        this.close = this.close.bind(this);
    }

    checkUnsuccessfulSubmit() {
        if (this.state.showSuccess === false) {
            this.setState({
                unsuccessfulSubmit: true
            });
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }  

    }

    close() {
        this.setState({
            unsuccessfulSubmit: false
        })
    }

    render() {
        const {history} = this.props;
        return (
            <div>
                <Alert show={this.state.showSuccess} variant="success">
					<Alert.Heading>Successfully Logged In</Alert.Heading>
				</Alert>

                <Alert show={this.state.unsuccessfulSubmit} onClose={this.close} dismissible variant="danger">
					<Alert.Heading>Invalid login name or password</Alert.Heading>
					<p>
						Please check your username and password and try again. 
  				    </p>
				</Alert>

                <Card className="card">
                    <CardContent>
                
                        <h3 className="greContainer">Sign In</h3>

                        <Formik
                            // add form validation through Yup api
                            validationSchema={SignupSchema}
                            // initiate form values
                            initialValues={InitialValues}
                            // logic to send form data to the backend
                            onSubmit={(values, formikHelpers) => {
                            // onSubmit={(values, formikHelpers) => async (e) => {
                                // e.preventDefault();
                                try {
                                    const loginRes = await axios.post(
                                      "http://localhost:5000/users/login",
                                      values
                                    );
                                    setUserData({
                                      token: loginRes.data.token,
                                      user: loginRes.data.user,
                                    });
                                    localStorage.setItem("auth-token", loginRes.data.token);
                                    this.setState({
                                        unsuccessfulSubmit: false,
                                        showSuccess: true,
                                    });
                                    // redirect to homepage after 2.5 sec if successful
                                    setTimeout(() => {
                                        history.push('/');
                                    }, 2500);
                                } catch (err) {
                                    this.setState({
                                        unsuccessfulSubmit: true,
                                        showSuccess: false,
                                    });
                                    // err.response.data.msg && setError(err.response.data.msg);
                                }
                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                            }}>

                            {({ values, errors, isSubmitting, isValidating }) => (
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
                                        <Button onClick={this.checkUnsuccessfulSubmit} type="submit" variant="contained"  margin="normal" color="primary" disabled={isValidating}>Sign In</Button>
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
}