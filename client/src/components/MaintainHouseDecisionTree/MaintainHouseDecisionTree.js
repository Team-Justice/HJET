import React, { Component } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Box, Card, CardContent, Divider, MenuItem, Button, TextField, Radio, FormHelperText} from "@material-ui/core";
import { object, string } from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { withStyles } from '@material-ui/core/styles'

const InitialValues = {
  caseID: "1111",
  needSignificantRepairs: "",
  needHealthyHomeAudit: "",
  needEnergyEfficiencyAudit: "",
  needRenovationResources: "",
  needFinancingAssistance: "",
  needFinancialAssistance: "",
  needFinancialCounseling: "",
  needEmploymentCounseling: "",
  soleHomeowner: "",
  oweBackTaxes: "",
  reverseMortgage: "",
  comfortableInCommunity: "",
  timeInCommunity: ""
};

const SignupSchema = object().shape({
  needSignificantRepairs: string().required("Required"),
  needHealthyHomeAudit: string().required("Required"),
  needEnergyEfficiencyAudit: string().required("Required"),
  needRenovationResources: string().required("Required"),
  needFinancingAssistance: string().required("Required"),
  needFinancialAssistance: string().required("Required"),
  needFinancialCounseling: string().required("Required"),
  needEmploymentCounseling: string().required("Required"),
  soleHomeowner: string().required("Required"),
  oweBackTaxes: string().required("Required"),
  reverseMortgage: string().required("Required"),
  comfortableInCommunity: string().required("Required"),
  timeInCommunity: string().required("Required")
});

const StyledFormHelperText = withStyles({
  root: {
    textAlign: 'center',
  },
})(FormHelperText)

export default class MaintainHouseDecisionTree extends Component {
  constructor(props) {
    super(props);
    this.caseID = "";
    this.state = {
      unsuccessfulSubmit: false,
      showSuccess: false,
    };
    this.checkUnsuccessfulSubmit = this.checkUnsuccessfulSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.caseID = id;
    this.token = localStorage.getItem("auth-token");
  }
  
  checkUnsuccessfulSubmit() {
    if (this.state.showSuccess === false) {
      this.setState({
        unsuccessfulSubmit: true,
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  close() {
    this.setState({
      unsuccessfulSubmit: false,
    });
  }

  render() {
    return (
      <div>
        <Alert show={this.state.showSuccess} variant="success">
          <Alert.Heading>Your Decision Tree Was Saved!</Alert.Heading>
          <p>You can now return back home by pressing the button below.</p>
          <div className="d-flex justify-content-end">
            <Link to="/cases">
              <Button variant="outline-success">
                Go back to case home page!
              </Button>
            </Link>
          </div>
        </Alert>

        <Alert
          show={this.state.unsuccessfulSubmit}
          onClose={this.close}
          dismissible
          variant="danger"
        >
          <Alert.Heading>Error Submitting Case!</Alert.Heading>
          <p>
            There was an error submitting your case, please check through your
            entries and try again.
          </p>
        </Alert>

        <Card>
          <CardContent>
            <h4>Maintain Current Home Decision Tree</h4>

            <Formik
              // add form validation through Yup api
              validationSchema={SignupSchema}
              // initiate form values
              initialValues={InitialValues}
              // logic to send form data to the backend
              onSubmit={(values, formikHelpers) => {
                values.caseID = this.caseID;
                console.log(values);
                axios.put('/maintain-current-home/add', values, { headers: { "x-auth-token": this.token } })
                                    .then(res => {
                                        console.log(res);
                                        console.log(res.data);
                                        this.setState({
                                            unsuccessfulSubmit: false,
                                            showSuccess: true,
                                        });
                                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                                    })
              }}>
              {({ values, errors, isSubmitting, isValidating, touched }) => (
                <Form>
                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 1. Do you need maintenance or repair?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needSignificantRepairs" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needSignificantRepairs" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needSignificantRepairs" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 2. Do you need a healthy home audit?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeAudit" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeAudit" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needHealthyHomeAudit" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 3. Do you need a energy efficiency audit?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyAudit" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyAudit" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needEnergyEfficiencyAudit" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 4. Do you need advice and resources to renovate your home
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needRenovationResources" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needRenovationResources" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needRenovationResources" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 5. Do you need assistance in financing your home?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needFinancingAssistance" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needFinancingAssistance" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needFinancingAssistance" />
                  </Box>

                  <Divider />
                  
                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 6. Do you need financial assistance (i.e. loan modification)?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialAssistance" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialAssistance" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needFinancialAssistance" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 7. Do you need personal financial counseling?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialCounseling" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialCounseling" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needFinancialCounseling" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 8. Do you need employment counseling?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needEmploymentCounseling" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needEmploymentCounseling" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needEmploymentCounseling" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 9. Are you the sole homeowner?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="soleHomeowner" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="soleHomeowner" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="soleHomeowner" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 10. Do you owe back taxes?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="oweBackTaxes" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="oweBackTaxes" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="oweBackTaxes" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 11. Are you currently in a reverse mortgage condition?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="reverseMortgage" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="reverseMortgage" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="reverseMortgage" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 12. Do you feel comfortable living in this community? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="comfortableInCommunity" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="comfortableInCommunity" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="comfortableInCommunity" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <p>Question 13. How many years have you lived in this community?</p>
                    <Field className="vetStatus" name="timeInCommunity" label="Reason" as={TextField} select variant="outlined" helperText={<ErrorMessage name="timeInCommunity"/>} error={touched.timeInCommunity && Boolean(errors.timeInCommunity)} >
                        <MenuItem value="0-10">0-10</MenuItem>
                        <MenuItem value="11-20">11 - 20</MenuItem>
                        <MenuItem value="21-30">21 - 30</MenuItem>
                        <MenuItem value="31-40">31 - 40</MenuItem>
                        <MenuItem value="41+">41+</MenuItem>
                    </Field>
                  </Box>

                  <Divider />

                  <Button
                    onClick={this.checkUnsuccessfulSubmit}
                    type="submit"
                    disabled={isValidating}
                  >
                    submit
                  </Button>

                  {/* allows us to see state of errors in form for validation debugging */}
                   {/* <pre>{JSON.stringify(errors, null, 4)}</pre>  */}

                  {/* allows us to see the state of the form for debugging */}
                   {/* <pre>{JSON.stringify(values, null, 4)}</pre>  */}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    );
  }
}
