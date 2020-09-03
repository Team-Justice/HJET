import React, { Component } from 'react';
import styles from './CaseEdit.css';
import axios from 'axios';
import { Grid, Box, Card, CardContent, Divider, TextField, MenuItem, Button } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { object, string, boolean, number, date } from 'yup';



const EditSchema = object().shape({
  firstName: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  lastName: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  
    // ethnicity: string()
    //     .required('Required'),

    // gender: string()
    //     .required('Required'),

    // address: string()
    // .required('Required'),

    // phonenumber: number()
    // .positive()
    // .integer()
    // .min(1000000000, 'Invalid phone number!')
    // .max(9999999999, 'Invalid phone number!')
    // .required('Required'),

    // homedescription: string()
    // .required('Required'),

    // own: boolean()
    // .required('Required'),

    // rent: boolean()
    // .required('Required'),

    // residencystartdate: date()
    //   .required('Required'),

    // estimatedvalue: number()
    // .positive('Please enter a positive number')
    // .integer('Please enter a whole number')
    // .required('Required'),

    // ageofhome: number()
    // .positive('Please enter a positive number')
    // .integer('Please enter a whole number')
    // .required('Required'),

    // householdincome: number()
    // .positive('Please enter a positive number')
    // .integer('Please enter a whole number')
    // .required('Required'),

    // adults: number()
    // .min(0, 'Please enter a positive number')
    // .integer('Please enter a whole number')
    // .required('Required'),

    // children: number()
    //     .min(0, 'Please enter a positive number')
    //     .integer('Please enter a whole number')
    //     .required('Required'),

    // bedrooms: number()
    //     .positive('Please enter a positive number')
    //     .integer('Please enter a whole number')
    //     .required('Required'),

    // baths: number()
    //     .positive('Please enter a positive number')
    //     .integer('Please enter a whole number')
    //     .required('Required'),

    // squarefootage: number()
    //     .positive('Please enter a positive number')
    //     .integer('Please enter a whole number')
    //     .required('Required'),

    // recentlyrenovated: boolean()
    //     .required('Required'),

    // needsrenovation: boolean()
    //     .required('Required'),

    // previoushomeowner: boolean()
    //     .required('Required'),

    // veteran: boolean()
    //     .required('Required'),

    // accomodations: string()
    // .required('Required'),

})

export default class CaseEdit extends Component {

  constructor(props) {
    super(props);

    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      ethnicity: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phonenumber: '',
      homedescription: '',
      own: '',
      rent: '',
      residencystartdate: '',
      estimatedvalue: '',
      ageofhome: '',
      householdincome: '',
      numberofadults: '',
      numberofchildren: '',
      bedrooms: '',
      baths: '',
      squarefootage: '',
      recentlyrenovated: '',
      needsrenovation: '',
      previoushomeowner: '',
      veteran: '',
      accomodations: '',
    }
  }
   
  componentDidMount() {
    const caseId = "5f4c0f14e697a6084407d2ac";

    axios.get('http://localhost:5000/cases/' + caseId) // add object id param
    .then(response => {
      this.setState({
        firstName: response.data.firstname,
        lastName:response.data.lastname,
        ethnicity: response.data.ethnicity,
        gender: response.data.gender,
        address: response.data.address,
        phonenumber: response.data.phonenumber,
        homedescription: response.data.homedescription,
        own: response.data.own,
        rent: response.data.rent,
        residencystartdate: response.data.residencystartdate,
        estimatedvalue: response.data.estimatedvalue,
        ageofhome: response.data.ageofhome,
        householdincome: response.data.householdincome,
        adults: response.data.numberofresidents.adults,
        children: response.data.numberofresidents.children,
        bedrooms: response.data.bedrooms,
        baths: response.data.baths,
        squarefootage: response.data.squarefootage,
        recentlyrenovated: response.data.recentlyrenovated,
        needsrenovation: response.data.needsrenovation,
        previoushomeowner: response.data.previoushomeowner,
        veteran: response.data.veteran,
        accomodations: response.data.accomodations,
      })

    })
    .catch(error => {
      console.log("Error: ", error);
    })


  }
  
  // onSubmit(e) { 
  //   console.log("onsubmit calles");

  //   e.preventDefault();

  //   const caseId = "5f4c0f14e697a6084407d2ac";
  //   const editedCase = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //   }
    
  //   axios.post('http://localhost:5000/cases/update/' + caseId, editedCase)
  //     .then(
  //       console.log("Update made")
  //     )
  //     .catch(error => {
  //       console.log("Error: ", error);
  //     })
  // }

  render() {
    return(
      <Grid container>

        <Grid item xs={12}>
          <h3> Edit Case </h3>
        </Grid>
        <Grid item xs={12}>
        <Formik
            
            enableReinitialize
                        validationSchema={EditSchema}
                        initialValues={this.state}
                        onSubmit={(values, formikHelpers) => {
                          const caseId = "";
                          const editedCase = {
                            firstName: this.values.firstName,
                            lastName: this.values.lastName,
                          }
                          
                          console.log("onsubmit state", values);

                          axios.post('http://localhost:5000/cases/update/5f4c0f14e697a6084407d2ac', editedCase)
                            .then(
                              console.log("Update made")
                            )
                            .catch(error => {
                              console.log("Error: ", error);
                            })
                            return new Promise(res => {
                              setTimeout(() => {
                                console.log('timeout');
                            }, 3000);
                            })
                        }}>

                        {({ values, errors, isSubmitting, isValidating }) => (
                            <Form>
                                {/* Client personal info */}
                                <Box marginBottom={2}>
                                    <Field name="firstName" label="First Name" as={TextField} helperText={<ErrorMessage name="firstName" />} />
                                    <Field name="lastName" label="Last Name" as={TextField} helperText={<ErrorMessage name="lastName" />} />
                                </Box>

                                <Divider />

                                {/* <Box marginBottom={2}>
                                    <Field name="phonenumber" label="Phone Number" as={TextField} type="number" helperText={<ErrorMessage name="phoneNum" />} />
                                </Box>

                                <Divider />

                                {/* TODO: Implement street address validation to prefill boxes */}
                                {/* <Box marginBottom={2}>
                                    <Field name="address" label="Home Address" as={TextField} helperText={<ErrorMessage name="homeAddress" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <Field name="gender" label="Gender" as={TextField} select helperText={<ErrorMessage name="gender" />} >
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
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

                                <Divider /> */}

                                {/* Client Questionnaire */}
                                {/* <Box marginBottom={2}>
                                    <p>Are you a previous homeowner or own a home in another location?</p>
                                    <Field name="preHomeowner" label="Previous Homeowner" as={TextField} select helperText={<ErrorMessage name="preHomeowner" />} >
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

                                <Divider />  */}

                                {/* TODO: convert this to interval drop down */}
                                {/* <Box marginBottom={2}>
                                    <p>How long have you been living in the home? (in years)</p>
                                    <Field name="timeInHome" label="Time in home" as={TextField} type="number" helperText={<ErrorMessage name="timeInHome" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>What is the estimate current value of the home?</p>
                                    <Field name="homeValue" label="Home Value" as={TextField} type="number" helperText={<ErrorMessage name="homeValue" />} />
                                </Box>

                                <Divider /> */}

                                {/* TODO: convert this to interval drop down */}
                                {/* <Box marginBottom={2}>
                                    <p>What is the approximate age of the home? (in years)</p>
                                    <Field name="homeAge" label="Home Age" as={TextField} type="number" helperText={<ErrorMessage name="homeAge" />} />
                                </Box>

                                <Divider />

                                <Box marginBottom={2}>
                                    <p>How many people currently live in the home?</p>
                                    <Field name="adults" label="Adults in Household" as={TextField} type="number" helperText={<ErrorMessage name="adults" />} />
                                    <Field name="children" label="Children in Household" as={TextField} type="number" helperText={<ErrorMessage name="children" />} />
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
                                    <Field name="homedescription" label="Home Description" as={TextField} multiline rows={5} />
                                </Box>

                                <Divider /> */}

                                <Button type="submit" disabled={isSubmitting || isValidating}>submit</Button> 

                                {/* allows us to see state of errors in form for validation debugging */}
                                <pre>{JSON.stringify(errors, null, 4)}</pre>

                                {/* allows us to see the state of the form for debugging */}
                                <pre>{JSON.stringify(values, null, 4)}</pre>
                            </Form>
                        )}
                    </Formik>
        </Grid>
      </Grid>
    )
  }
}
