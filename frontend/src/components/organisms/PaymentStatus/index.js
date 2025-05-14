import React from "react";
import { Box, Typography, Button, Paper } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { THREE_DS_ROUTE } from "../../../utils/routes";

const PaymentStatus = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const hasSuccess = currentPath.includes("success");

  if (!hasSuccess) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#ffebee"
      >
        <Paper
          elevation={6}
          style={{
            padding: 32,
            textAlign: "center",
            maxWidth: 450,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <ErrorIcon
            style={{ fontSize: 50, color: "#d32f2f", marginBottom: 2 }}
          />
          <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
            Payment Failed
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Unfortunately, your payment could not be processed.
          </Typography>
          <Button
            variant="contained"
            size="large"
            style={{
              borderRadius: 4,
              textTransform: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: 8,
              color: "#99acc2",
            }}
            onClick={() => {
              navigate(THREE_DS_ROUTE);
            }}
          >
            <Typography variant="body3" color="textPrimary">
              Try Again
            </Typography>
          </Button>
        </Paper>
      </Box>
    );
  } else {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#e8f5e9"
      >
        <Paper
          elevation={6}
          style={{
            padding: 32,
            textAlign: "center",
            maxWidth: 450,
            borderRadius: 8,
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <CheckCircleIcon
            style={{ fontSize: 50, color: "#4caf50", marginBottom: 2 }}
          />
          <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Thank you for your purchase. Your payment was processed
            successfully.
          </Typography>
          <Typography variant="body3" color="textSecondary">
            {`Your transaction ID is: ${transactionId}`}
          </Typography>
          <Button
            variant="contained"
            size="large"
            style={{
              borderRadius: 4,
              textTransform: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              marginTop: 8,
              color: "#99acc2",
            }}
            onClick={() => {
              navigate(THREE_DS_ROUTE);
            }}
          >
            <Typography variant="body3" color="textPrimary">
              Continue Shopping
            </Typography>
          </Button>
        </Paper>
      </Box>
    );
  }
};

export default PaymentStatus;
