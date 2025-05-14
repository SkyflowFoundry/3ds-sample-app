/* eslint-disable no-console */
import React from "react";
import {
  Box,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import theme from "../../../utils/theme";
import {
  CardNumberElement,
  CVVElement,
  ExpirationMonthElement,
  ExpirationYearElement,
  useMakeSkyflowStyles,
  InputFieldElement,
} from "skyflow-react-js";
import {
  FINTECH_TABLE_NAME,
  FINTECH_FORM_FIELDS,
} from "../../../utils/constants";
import { useCardDetails } from "./hook";

const useStyles = makeStyles((theme) => ({
  form: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "4px",
    width: "90%",
    padding: "16px",
    height: "fit-content",
    marginTop: "24px",
  },
  element: {
    height: "37px",
    marginTop: "12px",
    backgroundColor: "#EAF0F6",
    fontWeight: 500,
  },
  button: {
    textTransform: "none",
    width: "100%",
    borderRadius: "4px",
  },
  apiView: {
    background: theme.palette.grey[100],
    padding: "16px 4px 0px 16px",
    marginTop: "24px",
    maxHeight: "inherit",
  },
  formHighlight: {
    border: `1px solid ${theme.palette.grey[300]}`,
    width: "90%",
    padding: "16px",
    height: "fit-content",
    marginTop: "24px",
    borderRadius: "4px",
    animation: "$pulse-black 1500ms infinite",
    "&:hover": {
      animation: "none",
    },
  },
  buttonHighlight: {
    textTransform: "none",
    borderRadius: "4px",
    marginTop: "12px",
    padding: "4px",
    animation: "$pulse-black 1500ms infinite",
  },

  "@keyframes pulse-black": {
    "0%": {
      boxShadow: "0px 0px 2px 4px #4169e1",
    },

    "50%": {
      boxShadow: "0px 0px 0px 0px white",
    },

    "100%": {
      boxShadow: "0px 0px 2px 4px #4169e1",
    },
  },

  "@keyframes bounce": {
    "0%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(4px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
}));

export const CardDetailsStep = () => {
  const classes = useStyles();
  const {
    isSubmitDisabled,
    setValid,
    regexMatchRule,
    container,
    handleSubmitCardDetails,
    loading,
    setBinValue
  } = useCardDetails();
  const useSkyflowStyles = useMakeSkyflowStyles({
    inputStyles: {
      base: {
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: "10px 16px",
        "border-radius": "4px",
        color: theme.palette.text.primary,
      },
      complete: {
        color: theme.palette.text.primary,
      },
      empty: {},
      focus: {},
      invalid: {
        border: "1px solid #f44336",
      },
    },
    labelStyles: {
      styles: {
        base: {
          color: theme.palette.text.secondary,
          "font-family":
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontWeight: 500,
          fontSize: "12px",
        },
      },
    },
    errorTextStyles: {
      base: {
        fontSize: "16px",
        "font-family": "Roboto, sans-serif",
      },
    },
  });
  const skyflowClasses = useSkyflowStyles();
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box className={!loading ? classes.formHighlight : classes.form}>
        <Box id="name-container">
          <Box>
            <Typography variant="caption" color="textSecondary">
              Name on Card
            </Typography>
          </Box>
          <InputFieldElement
            id="input"
            container={container}
            table={FINTECH_TABLE_NAME}
            column={FINTECH_FORM_FIELDS.name}
            placeholder="Eg: Rachel Green"
            validations={[regexMatchRule]}
            classes={skyflowClasses}
            onChange={(state) => {
              setValid((prevState) => ({
                ...prevState,
                name: !state.isEmpty && state.isValid,
              }));
            }}
          />
        </Box>
        <Box
          marginTop="16px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          id="card-details-container"
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              Card Number
            </Typography>
            <CardNumberElement
              id={"collectCardNumber"}
              container={container}
              table={FINTECH_TABLE_NAME}
              classes={skyflowClasses}
              column={FINTECH_FORM_FIELDS.card_number}
              onChange={(state) => {
                setValid((prevState) => ({
                  ...prevState,
                  card_number: !state.isEmpty && state.isValid,
                }));
                setBinValue(state.value.slice(0, 8));
              }}
            />
          </Box>
          <Box marginLeft="24px">
            <Typography variant="caption" color="textSecondary">
              CVV
            </Typography>
            <CVVElement
              id="cvv"
              container={container}
              table={FINTECH_TABLE_NAME}
              classes={skyflowClasses}
              column={FINTECH_FORM_FIELDS.cvv}
              placeholder="3 or 4 Digit Card Security Code"
              onChange={(state) => {
                setValid((prevState) => ({
                  ...prevState,
                  cvv: !state.isEmpty && state.isValid,
                }));
              }}
            />
          </Box>
        </Box>
        <Box
          marginTop="16px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          id="expiration-container"
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              Expiration Month
            </Typography>
            <ExpirationMonthElement
              id="month"
              container={container}
              table={FINTECH_TABLE_NAME}
              column={FINTECH_FORM_FIELDS.expiry_month}
              classes={skyflowClasses}
              placeholder="MM"
              onChange={(state) => {
                setValid((prevState) => ({
                  ...prevState,
                  exp_month: !state.isEmpty && state.isValid,
                }));
              }}
            />
          </Box>
          <Box marginLeft="24px">
            <Typography variant="caption" color="textSecondary">
              Expiration Year
            </Typography>
            <Box>
              <ExpirationYearElement
                id="year"
                container={container}
                classes={skyflowClasses}
                table={FINTECH_TABLE_NAME}
                column={FINTECH_FORM_FIELDS.expiry_year}
                placeholder="YY"
                onChange={(state) => {
                  setValid((prevState) => ({
                    ...prevState,
                    exp_year: !state.isEmpty && state.isValid,
                  }));
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          className={
            !(isSubmitDisabled || loading) ? classes.buttonHighlight : classes
          }
          marginTop="12px"
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={isSubmitDisabled || loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : undefined
            }
            onClick={handleSubmitCardDetails}
            fullWidth
          >
            {loading ? "Processing Payment" : "Submit Payment"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
