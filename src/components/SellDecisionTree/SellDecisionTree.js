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
  wantHomeWealthGenerationCourse: false,
  wantFirstTimeBuyersCourse: false,
  wantToSellToInvestor: false,
  wantToUseBroker: false,
  needFinancialAssistance: false,
  needFinancialCounseling: false,
  needHomeRenovation: false,
  needKnowledgeOfSellingOptions: false,
  needManagingAssistance: false,
  needProfessionalCounselor: false,
  needHealthyHomeInspection: false,
  needEnergyEfficiencyInspection: false,
  oweBackTaxes: false,
  usedHUDCounselor: false,
  sellingHouseReason: "",
  familyWillingToTakeOver: false,
  haveReverseMortgage: false,
  houseDegradationBeyondRepair: false,
  needSignificantRepairs: false,
};

const SignupSchema = object().shape({
  wantHomeWealthGenerationCourse: string().required("Required"),
  wantHomeWealthGenerationCourse: string().required("Required"),
  wantFirstTimeBuyersCourse: string().required("Required"),
  wantToSellToInvestor: string().required("Required"),
  wantToUseBroker: string().required("Required"),
  needFinancialAssistance: string().required("Required"),
  needFinancialCounseling: string().required("Required"),
  needHomeRenovation: string().required("Required"),
  needKnowledgeOfSellingOptions: string().required("Required"),
  needManagingAssistance: string().required("Required"),
  needProfessionalCounselor: string().required("Required"),
  needHealthyHomeInspection: string().required("Required"),
  needEnergyEfficiencyInspection: string().required("Required"),
  oweBackTaxes: string().required("Required"),
  usedHUDCounselor: string().required("Required"),
  sellingHouseReason: string().required("Required"),
  familyWillingToTakeOver: string().required("Required"),
  haveReverseMortgage: string().required("Required"),
  houseDegradationBeyondRepair: string().required("Required"),
  needSignificantRepairs: string().required("Required"),
});

const StyledFormHelperText = withStyles({
  root: {
    textAlign: 'center',
  },
})(FormHelperText)

export default class SellDecisionTree extends Component {
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
            <h4>Sell the House Decision Tree</h4>

            <Formik
              // add form validation through Yup api
              validationSchema={SignupSchema}
              // initiate form values
              initialValues={InitialValues}
              // logic to send form data to the backend
              onSubmit={(values, formikHelpers) => {
                values.caseID = this.caseID;
                console.log(values);
                axios.put('http://localhost:5000/sell-House/add', values)
                                    .then(res => {
                                        console.log(res);
                                        console.log(res.data);
                                        this.setState({
                                            unsuccessfulSubmit: false,
                                            showSuccess: true,
                                        });
                                        document.body.scrollTop = document.documentElement.scrollTop = 0;

                                    })
              }} >
              {({ values, errors, isSubmitting, isValidating, touched }) => (
                <Form>
                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 1. Do you want to take the Home/Wealth Generation Course?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantHomeWealthGenerationCourse" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantHomeWealthGenerationCourse" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantHomeWealthGenerationCourse" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 2. Do you want to take the First Time Home Buyers Course?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantFirstTimeBuyersCourse" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantFirstTimeBuyersCourse" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantFirstTimeBuyersCourse" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 3. Do you want to sell to an investor or wholeseller?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantToSellToInvestor" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantToSellToInvestor" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantToSellToInvestor" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 4. Do you want to use a broker or real estate agent?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="wantToUseBroker" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="wantToUseBroker" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="wantToUseBroker" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 5. Do you need financial assistance  (i.e. loan modification)?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialAssistance" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialAssistance" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needFinancialAssistance" />
                  </Box>

                  <Divider />
                  
                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 6. Do you need personal financial counseling?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialCounseling" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needFinancialCounseling" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needFinancialCounseling" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 7. Do you need renovation done to the house?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needHomeRenovation" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needHomeRenovation" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needHomeRenovation" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 8. Do you need knowledge of Home Selling options?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needKnowledgeOfSellingOptions" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needKnowledgeOfSellingOptions" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needKnowledgeOfSellingOptions" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 9. Do you need assistance in managing the property?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needManagingAssistance" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needManagingAssistance" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needManagingAssistance" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 10. Do you need a professional counselor to guide you through the process?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needProfessionalCounselor" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needProfessionalCounselor" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needProfessionalCounselor" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 11. Do you need an Healthy Home inspection?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeInspection" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needHealthyHomeInspection" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needHealthyHomeInspection" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 12. Do you need an Energy Efficiency inspection?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyInspection" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needEnergyEfficiencyInspection" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needEnergyEfficiencyInspection" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 13. Do you owe back taxes? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="oweBackTaxes" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="oweBackTaxes" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="oweBackTaxes" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 14. Have you used a HUD certified counselor?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="usedHUDCounselor" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="usedHUDCounselor" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="usedHUDCounselor" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <p>Question 15. Why are you selling the house/moving? </p>
              <Field className="vetStatus" name="sellingHouseReason" label="Reason" as={TextField} select variant="outlined" helperText={<ErrorMessage name="sellingHouseReason"/>} error={touched.sellingHouseReason && Boolean(errors.sellingHouseReason)} >
                        <MenuItem value="Can’t afford it">Can’t afford it </MenuItem>
                        <MenuItem value="Family decision">Family decision </MenuItem>
                        <MenuItem value="Need proceeds of sale">Need proceeds of sale</MenuItem>
                        <MenuItem value="Beyond repair">Beyond repair</MenuItem>
                        <MenuItem value="Back taxes">Back taxes</MenuItem>
                        <MenuItem value="Reverse mortgage">Reverse mortgage</MenuItem>
                        <MenuItem value="No longer a desire to live in neighborhood">No longer a desire to live in neighborhood</MenuItem>
                        <MenuItem value="Moving out of state/country">Moving out of state/country</MenuItem>
                    </Field>
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 16. Are there family members willing to take over the house? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="familyWillingToTakeOver" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="familyWillingToTakeOver" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="familyWillingToTakeOver" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 17. Are you currently in a reverse mortgage condition? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="haveReverseMortgage" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="haveReverseMortgage" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="haveReverseMortgage" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 18. Do you feel the house is degraded beyond repair? 
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="houseDegradationBeyondRepair" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="houseDegradationBeyondRepair" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="houseDegradationBeyondRepair" />
                  </Box>

                  <Divider />

                  <Box marginBottom={2}>
                    <div id="my-radio-group">
                      Question 19. Are there any significant maintenance or repairs needed to the house at this point?
                    </div>
                    <div role="group" aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" as={Radio} name="needSignificantRepairs" value={true} />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" as={Radio} name="needSignificantRepairs" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage component={StyledFormHelperText} error={true} variant="filled" name="needSignificantRepairs" />
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
