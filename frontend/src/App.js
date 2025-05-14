import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate
} from "react-router-dom";
import theme from "./utils/theme";
import { SnackbarProvider } from "notistack";

import {
  THREE_DS_PAYMENT_ROUTE,
  THREE_DS_PAYMENT_FAILURE_ROUTE,
  THREE_DS_PAYMENT_CHALLENGE_ROUTE,
} from "./utils/routes";
import Home from "./components/pages/Home";
import PaymentStatus from "./components/organisms/PaymentStatus";
import ChallengeScreen from "./components/organisms/ChallengeStep";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Routes>
              {/* <Route
                index
                element={<Navigate to={THREE_DS_ROUTE} replace />}
              /> */}
              <Route index element={<Home />} />
              <Route
                path={THREE_DS_PAYMENT_ROUTE}
                element={<PaymentStatus />}
              />
              <Route
                path={THREE_DS_PAYMENT_FAILURE_ROUTE}
                element={<PaymentStatus />}
              />
              <Route
                path={THREE_DS_PAYMENT_CHALLENGE_ROUTE}
                element={<ChallengeScreen />}
              />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
