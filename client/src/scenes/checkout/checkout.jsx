import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import Confirmation from "./Confirmation";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isThirdStep = activeStep === 2;
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep+1} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Order</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isThirdStep && <Confirmation />}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                {!isThirdStep && (
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                  >
                      {!isSecondStep ? "Next" : "Place Order"}
                  </Button>
                )}

                {isThirdStep && (
                  <Button
                    onClick={() => navigate("/")}
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                  >
                    Return to mane page
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

export default Checkout;
