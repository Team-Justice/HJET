import React, { Component, Children } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Box, Card, CardContent, Divider, TextField, MenuItem, Button } from "@material-ui/core";
import { object, string, boolean, number } from 'yup';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import './NewUserPage.css';


const InitialValues = {
    // client personal info
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    password: "",
    admin: "",
};

const SignupSchema = object().shape({
    // client personal info validations
    firstName: string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: string()
        .email('Invalid email')
        .required('Required'),
    phoneNum: number()
        .positive()
        .integer()
        .min(1000000000, 'Invalid phone number!')
        .max(9999999999, 'Invalid phone number!')
        .required('Required'),
    password: string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    admin: string()
        .required("Required"),
});



export default class NewUserPage extends Component {
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
        return (
            <div>
                <Alert show={this.state.showSuccess} variant="success">
					<Alert.Heading>Case created successfully.</Alert.Heading>
					<p>
						You can now return back home by pressing the button below. 
  				    </p>
                      <div className="d-flex justify-content-end">
                        <Link to="/cases">
                            <Button variant="outline-success">
                                Go back to case home page!
                            </Button>
                        </Link>
					</div>
				</Alert>

                <Alert show={this.state.unsuccessfulSubmit} onClose={this.close} dismissible variant="danger">
					<Alert.Heading>Error Creating User!</Alert.Heading>
					<p>
						There was an error submitting your case, please check through your entries and try again. 
  				</p>
				</Alert>

                <Card>
                    <CardContent>
                        <h4 className="greContainer">New User</h4>

                        <Formik
                            // add form validation through Yup api
                            validationSchema={SignupSchema}
                            // initiate form values
                            initialValues={InitialValues}
                            // logic to send form data to the backend
                            onSubmit={(values, formikHelpers) => {
                                // disables submit button for 3 seconds


                                axios.post('http://localhost:5000/users/add', values) //add the axios post here
                                    .then(res => {
                                        console.log(res);
                                        console.log(res.data);
                                        this.setState({
                                            unsuccessfulSubmit: false,
                                            showSuccess: true,
                                        });
                                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                                    })

                                // return new Promise(res => {
                                //     setTimeout(() => {
                                //         console.log(values);
                                //         console.log(formikHelpers);
                                //         console.log('----------------------');
                                //         res();
                                //     }, 3000);
                                // })
                            }}>

                            {({ values, errors, isSubmitting, isValidating }) => (
                                <Form>
                                    {/* Client personal info */}
                                    <div className="greContainer">
                                        <Box marginBottom={2}>
                                            <div className="rowItems">
                                                <Field name="firstName" label="First Name" as={TextField} helperText={<ErrorMessage name="firstName" />} />
                                                <Field name="lastName" label="Last Name" as={TextField} helperText={<ErrorMessage name="lastName" />} />
                                                <Field name="phoneNum" label="Phone Number" as={TextField} type="number" helperText={<ErrorMessage name="phoneNum" />} />
                                            </div>
                                        </Box>
                                    </div>

                                    <Divider />

                                    <div className="greContainer">
                                        <Box marginBottom={2}>
                                            <div className = "rowItems">
                                                <Field name="email" label="Email" as={TextField} helperText={<ErrorMessage name="email" />} />
                                                <Field name="password" label="Password" as={TextField} helperText={<ErrorMessage name="password" />} />
                                                <Field name="admin" label="Admin?" as={TextField} select helperText={<ErrorMessage name="admin" />}>
                                                    <MenuItem value={true}>Yes</MenuItem>
                                                    <MenuItem value={false}>No</MenuItem>
                                                </Field>
                                            </div>
                                        </Box>
                                    </div>

                                    <Divider />



                                    {/* <Link to="/cases"> */}
                                    <div className="greContainer">
                                        <Button onClick={this.checkUnsuccessfulSubmit} type="submit" disabled={isValidating}>Submit</Button>
                                    </div>

                                    {/* </Link> */}


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
