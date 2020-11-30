import React, { Component, Children } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Box, Card, CardContent, Divider, MenuItem, Button, TextField, Radio, FormHelperText} from "@material-ui/core";
import { object, string } from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { withStyles } from '@material-ui/core/styles'

const InitialValues = {
    caseID: "1111",
    needHomeRenovation: "",
    wantToAttendWealthSeminar: "",
    haveReverseMortgage: "",
    needMortgageOrDeedTransfer: "",
    wantFirstTimeBuyersCourse: "",
    needHealthyHomeInspection: "",
    needEnergyEfficiencyInspection: "",
    planToAbandonHome: "",
    needFinancialAssistance: "",
    needEmploymentAssistance: "",
    knowAboutHUDAssistance: "",
    haveOwnershipNeeds: "",
    haveFamilySuccessivePlan: "",
    needFinancialCounseling: ""
};

const SignupSchema = object().shape({
  needHomeRenovation: string().required("Required"),
  wantToAttendWealthSeminar: string().required("Required"),
  haveReverseMortgage: string().required("Required"),
  needMortgageOrDeedTransfer: string().required("Required"),
  wantFirstTimeBuyersCourse: string().required("Required"),
  needHealthyHomeInspection: string().required("Required"),
  needEnergyEfficiencyInspection: string().required("Required"),
  planToAbandonHome: string().required("Required"),
  needFinancialAssistance: string().required("Required"),
  needEmploymentAssistance: string().required("Required"),
  knowAboutHUDAssistance: string().required("Required"),
  haveOwnershipNeeds: string().required("Required"),
  haveFamilySuccessivePlan: string().required("Required"),
  needFinancialCounseling: string().required("Required")
});

const StyledFormHelperText = withStyles({
  root: {
    textAlign: 'center',
  },
})(FormHelperText)

export default class LegacyDecisionTree extends Component {
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
            <h4>Legacy Wealth Building Scheme Decision Tree</h4>

            <Formik
              // add form validation through Yup api
              validationSchema={SignupSchema}
              // initiate form values
              initialValues={InitialValues}
              // logic to send form data to the backend
              onSubmit={(values, formikHelpers) => {
                values.caseID = this.caseID;
                console.log(values);
                axios.put('/legacy-wealth-building/add', values, { headers: { "x-auth-token": this.token } })
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
                      Question 1. Does the house need renovation or repair?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needHomeRenovation" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needHomeRenovation" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needHomeRenovation" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 2. Do you plan to attend Building Legacy Wealth Seminar and Lecture series?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantToAttendWealthSeminar" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantToAttendWealthSeminar" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantToAttendWealthSeminar" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 3. Do you need assistance with Reverse Mortgage?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="haveReverseMortgage" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="haveReverseMortgage" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="haveReverseMortgage" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 4. Do you need assistance with mortgage or deed transfer?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needMortgageOrDeedTransfer" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needMortgageOrDeedTransfer" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needMortgageOrDeedTransfer" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 5. Do You Need First Time Home Buyers program?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantFirstTimeBuyersCourse" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantFirstTimeBuyersCourse" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantFirstTimeBuyersCourse" />
                  </Box>

                  <Divider />
                  
                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 6. Do you need healthy home inspection?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeInspection" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeInspection" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needHealthyHomeInspection" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 7. Do you need an energy efficiency audit or inspection?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyInspection" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyInspection" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needEnergyEfficiencyInspection" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 8. Do you plan to abandon the home at anytime?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="planToAbandonHome" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="planToAbandonHome" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="planToAbandonHome" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 9. Do you need financial assistance (i.e. loan modification)?
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
                      Question 10. Do you need assistance with employment?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needEmploymentAssistance" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needEmploymentAssistance" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needEmploymentAssistance" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 11. Do you know about Assistance from Enterprise, LISC, HUD, or Neighborhood Works?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="knowAboutHUDAssistance" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="knowAboutHUDAssistance" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="knowAboutHUDAssistance" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 12. Do you have any needs at this time related to ownership of the home? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="haveOwnershipNeeds" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="haveOwnershipNeeds" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="haveOwnershipNeeds" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 13. Have you developed a family successive plan for home ownership?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="haveFamilySuccessivePlan" value="true" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="haveFamilySuccessivePlan" value="false" />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="haveFamilySuccessivePlan" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 14. Do you need personal financial counseling? 
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

                  <Button
                    onClick={this.checkUnsuccessfulSubmit}
                    type="submit"
                    disabled={isValidating}
                  >
                    submit
                  </Button>

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
