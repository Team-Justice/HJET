import React, { Component, Children } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Box, Card, CardContent, Divider, TextField, MenuItem, Button } from "@material-ui/core";
import { object, string, boolean, number } from 'yup';
import axios from 'axios';

const InitialValues = {
    // client personal info
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    homeAddress: "",
    city: "",
    state: "",
    zip: "",
    gender: "",
    race: "",
    ethnicity: "",
    veteran: "",
    accommodations: "",

    // client questionnaire responses
    preHomeowner: "",
    ownershipOfHome: "",
    timeInHome: "",
    homeValue: "",
    homeAge: "",
    householdAdults: "",
    householdChildren: "",
    householdIncome: "",
    numBeds: "",
    numBaths: "",
    numSqFootage: "",
    recentlyRenovated: "",
    needRenovation: "",
    homeDescription: ""
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
    homeAddress: string()
        .required('Required'),
    city: string()
        .required('Required'),
    state: string()
        .required('Required'),
    zip: string()
        .length(5, 'Invalid zipcode!')
        .required('Required'),
    gender: string()
        .required('Required'),
    race: string()
        .required('Required'),
    ethnicity: string()
        .required('Required'),
    veteran: string()
        .required('Required'),
    accommodations: string()
        .required('Required'),

    // client questionnaire validations
    preHomeowner: boolean()
        .required('Required'),
    ownershipOfHome: string()
        .required('Required'),
    timeInHome: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    homeValue: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    homeAge: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    householdAdults: number()
        .min(0, 'Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    householdChildren: number()
        .min(0, 'Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    householdIncome: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    numBeds: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    numBaths: number()
        .positive('Please enter a positive number')
        .required('Required'),
    numSqFootage: number()
        .positive('Please enter a positive number')
        .integer('Please enter a whole number')
        .required('Required'),
    recentlyRenovated: string()
        .required('Required'),
    needRenovation: string()
        .required('Required'),
});


export default class CaseForm extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <h4>Client Screening</h4>

                    <Formik
                        // add form validation through Yup api
                        validationSchema={SignupSchema}
                        // initiate form values
                        initialValues={InitialValues}
                        // logic to send form data to the backend
                        onSubmit={(values, formikHelpers) => {
                            // disables submit button for 3 seconds
                            

                            axios.post('http://localhost:5000/cases/add', values)
                            .then(res => {
                                console.log(res);
                                console.log(res.data);
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
                                <Box marginBottom={2}>
                                    <Field name="firstName" label="First Name" as={TextField} helperText={<ErrorMessage name="firstName" />} />
                                    <Field name="lastName" label="Last Name" as={TextField} helperText={<ErrorMessage name="lastName" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <Field name="phoneNum" label="Phone Number" as={TextField} type="number" helperText={<ErrorMessage name="phoneNum" />} />
                                    <Field name="email" label="Email" as={TextField} helperText={<ErrorMessage name="email" />} />
                                </Box>

                                <Divider />

                                {/* TODO: Implement street address validation to prefill boxes */}
                                <Box marginBottom={2}>
                                    <Field name="homeAddress" label="Home Address" as={TextField} helperText={<ErrorMessage name="homeAddress" />} />
                                    <Field name="city" label="City" as={TextField} helperText={<ErrorMessage name="city" />} />
                                    <Field name="state" label="State" as={TextField} helperText={<ErrorMessage name="state" />} />
                                    <Field name="zip" label="Zipcode" as={TextField} helperText={<ErrorMessage name="zip" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <Field name="gender" label="Gender" as={TextField} select helperText={<ErrorMessage name="gender" />} >
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                    <Field name="race" label="Race" as={TextField} select helperText={<ErrorMessage name="race" />} >
                                        <MenuItem value={"American Indian or Alaska Native"}>American Indian or Alaska Native</MenuItem>
                                        <MenuItem value={"Asian"}>Asian</MenuItem>
                                        <MenuItem value={"Black"}>Black</MenuItem>
                                        <MenuItem value={"Native Hawaiian or Other Pacific Islander"}>Native Hawaiian or Other Pacific Islander</MenuItem>
                                        <MenuItem value={"White"}>White</MenuItem>
                                    </Field>
                                    <Field name="ethnicity" label="Ethnicity" as={TextField} select helperText={<ErrorMessage name="ethnicity" />} >
                                        <MenuItem value={"Hispanic or Latino"}>Hispanic or Latino</MenuItem>
                                        <MenuItem value={"Not Hispanic or Latino"}>Not Hispanic or Latino</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Are you a veteran?</p>
                                    <Field name="veteran" label="Veteran Status" as={TextField} select helperText={<ErrorMessage name="veteran" />} >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Do you require accommodations?</p>
                                    <Field name="accommodations" label="Accommodations Status" as={TextField} select helperText={<ErrorMessage name="accommodations" />} >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                {/* Client Questionnaire */}
                                <Box marginBottom={2}>
                                    <p>Are you a previous homeowner or own a home in another location?</p>
                                    <Field name="preHomeowner" label="Previous Homeowner" as={TextField} type="boolean" select helperText={<ErrorMessage name="preHomeowner" />} >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Are you a renter or an owner of the home?</p>
                                    <Field name="ownershipOfHome" label="Ownership of home" as={TextField} select helperText={<ErrorMessage name="ownershipOfHome" />} >
                                        <MenuItem value={"Renter"}>Renter</MenuItem>
                                        <MenuItem value={"Owner"}>Owner</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                {/* TODO: convert this to interval drop down */}
                                <Box marginBottom={2}>
                                    <p>How long have you been living in the home? (in years)</p>
                                    <Field name="timeInHome" label="Time in home" as={TextField} type="number" helperText={<ErrorMessage name="timeInHome" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the estimate current value of the home?</p>
                                    <Field name="homeValue" label="Home Value" as={TextField} type="number" helperText={<ErrorMessage name="homeValue" />} />
                                </Box>

                                <Divider />

                                {/* TODO: convert this to interval drop down */}
                                <Box marginBottom={2}>
                                    <p>What is the approximate age of the home? (in years)</p>
                                    <Field name="homeAge" label="Home Age" as={TextField} type="number" helperText={<ErrorMessage name="homeAge" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many people currently live in the home?</p>
                                    <Field name="householdAdults" label="Adults in Household" as={TextField} type="number" helperText={<ErrorMessage name="householdAdults" />} />
                                    <Field name="householdChildren" label="Children in Household" as={TextField} type="number" helperText={<ErrorMessage name="householdChildren" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the approximate household income?</p>
                                    <Field name="householdIncome" label="Household Income" as={TextField} type="number" helperText={<ErrorMessage name="householdIncome" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many bedrooms does the house have?</p>
                                    <Field name="numBeds" label="Number of Bedrooms" as={TextField} type="number" helperText={<ErrorMessage name="numBeds" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many bathrooms does the house have?</p>
                                    <Field name="numBaths" label="Number of Bathrooms" as={TextField} type="number" helperText={<ErrorMessage name="numBaths" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the approximate square footage of the home?</p>
                                    <Field name="numSqFootage" label="Number of Square Footage" as={TextField} type="number" helperText={<ErrorMessage name="numSqFootage" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Was the home recently renovated?</p>
                                    <Field name="recentlyRenovated" label="Recently Renovated" as={TextField} select helperText={<ErrorMessage name="recentlyRenovated" />}>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Does the home need renovations?</p>
                                    <Field name="needRenovation" label="Need Removation" as={TextField} select helperText={<ErrorMessage name="needRenovation" />}>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>
                                
                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Please enter a home description</p>
                                    <Field name="homeDescription" label="Home Description" as={TextField} multiline rows={5} />
                                </Box>

                                <Divider />

                                <Button type="submit" disabled={isValidating}>submit</Button>

                                {/* allows us to see state of errors in form for validation debugging */}
                                <pre>{JSON.stringify(errors, null, 4)}</pre>

                                {/* allows us to see the state of the form for debugging */}
                                <pre>{JSON.stringify(values, null, 4)}</pre>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        );
    }
}