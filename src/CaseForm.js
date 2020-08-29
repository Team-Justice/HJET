import React, { Component } from 'react';
import { Form, Formik, Field } from 'formik';
import { Box, Card, CardContent, Divider, FormGroup, TextField, MenuItem, Button } from "@material-ui/core";

const initialValues = {
    // client personal info
    nameFirst: "",
    nameLast: "",
    phoneNum: "",
    homeAddress: "",
    city: "",
    state: "",
    zip: "",
    gender: "",
    race: "",
    ethnicity: "",
    veteran: false,
    accommodations: false,

    // client questionnaire responses
    preHomeowner: false,
    ownershipOfHome: "",
    timeInHome: "",
    homeValue: "",
    homeAge: "",
    householdSize: "",
    householdIncome: "",
    homeDescription: "",
    numBeds: "",
    numBaths: "",
    numSqFootage: "",
    recentRenovation: false,
    needRenovation: false
};

export default class CaseForm extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <h4>Client Screening</h4>

                    <Formik initialValues={initialValues} onSubmit={(data) => { console.log(data) }}>
                        {({ values }) => (
                            <Form>
                                {/* Client personal info */}
                                <Box marginBottom={2}>
                                    <Field name="nameFirst" label="First Name" as={TextField} />
                                    <Field name="nameLast" label="Last Name" as={TextField} />
                                    <Field name="phoneNum" label="Phone Number" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                {/* TODO: Implement street address validation to prefill boxes */}
                                <Box marginBottom={2}>
                                    <Field name="homeAddress" label="Home Address" as={TextField} />
                                    <Field name="city" label="City" as={TextField} />
                                    <Field name="state" label="State" as={TextField} />
                                    <Field name="zip" label="Zipcode" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <Field name="gender" label="Gender" as={TextField} select>
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                    <Field name="race" label="Race" as={TextField} select>
                                        <MenuItem value={"American Indian or Alaska Native"}>American Indian or Alaska Native</MenuItem>
                                        <MenuItem value={"Asian"}>Asian</MenuItem>
                                        <MenuItem value={"Black"}>Black</MenuItem>
                                        <MenuItem value={"Native Hawaiian or Other Pacific Islander"}>Native Hawaiian or Other Pacific Islander</MenuItem>
                                        <MenuItem value={"White"}>White</MenuItem>
                                    </Field>
                                    <Field name="ethnicity" label="Ethnicity" as={TextField} select>
                                        <MenuItem value={"Hispanic or Latino"}>Hispanic or Latino</MenuItem>
                                        <MenuItem value={"Not Hispanic or Latino"}>Not Hispanic or Latino</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Are you a veteran?</p>
                                    <Field name="veteran" label="Veteran Status" as={TextField} select>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Do you require accommodations?</p>
                                    <Field name="accommodations" label="Accommodations Status" as={TextField} select>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                {/* Client Questionnaire */}
                                <Box marginBottom={2}>
                                    <p>Are you a previous homeowner or own a home in another location?</p>
                                    <Field name="preHomeowner" label="Previous Homeowner" as={TextField} select>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Are you a renter or an owner of the home?</p>
                                    <Field name="ownershipOfHome" label="Ownership of home" as={TextField} select>
                                        <MenuItem value={"Renter"}>Renter</MenuItem>
                                        <MenuItem value={"Owner"}>Owner</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                {/* TODO: convert this to interval drop down */}
                                <Box marginBottom={2}>
                                    <p>How long have you been living in the home?</p>
                                    <Field name="timeInHome" label="Time in home" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the estimate current value of the home?</p>
                                    <Field name="homeValue" label="Home Value" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                {/* TODO: convert this to interval drop down */}
                                <Box marginBottom={2}>
                                    <p>What is the approximate age of the home?</p>
                                    <Field name="homeAge" label="Home Age" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many people currently live in the home?</p>
                                    <Field name="householdSize" label="Household Size" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the approximate household income?</p>
                                    <Field name="householdIncome" label="Household Income" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Please enter a home description</p>
                                    <Field name="homeDescription" label="Home Description" as={TextField} multiline rows={5} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many bedrooms does the house have?</p>
                                    <Field name="numBeds" label="Number of Bedrooms" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many bathrooms does the house have?</p>
                                    <Field name="numBaths" label="Number of Bathrooms" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the approximate square footage of the home?</p>
                                    <Field name="numSqFootage" label="Number of Square Footage" as={TextField} type="number" />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Was the home recently renovated?</p>
                                    <Field name="recentRenovation" label="Recently Renovated" as={TextField} select>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>Does the home need renovations?</p>
                                    <Field name="needRenovation" label="Need Removation" as={TextField} select>
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Field>
                                </Box>

                                <Divider />

                                <Button type="submit">submit</Button>

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