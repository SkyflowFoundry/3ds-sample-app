import React from "react";
import { Box, Typography } from "@material-ui/core";
import theme from "../../../utils/theme";
import logo from "../../../../public/assets/skyflow-logo.svg";


const Background = (props) => {
  return (
    <Box
      bgcolor="#f9fafd"
      width="100%"
      height={"100%"}
      justifyContent="spaceAround"
      minHeight={"100vh"}
      pb={"1px"}
    >
      <Box
        display="flex"
        width="1160px"
        pt={"26px"}
        mx="auto"
        alignItems="center"
      >
        <Box display="flex" width="100%" mx="auto" alignItems="center">
          <Typography variant="caption">Powered by </Typography>
          <img
            style={{ marginLeft: "2px", marginTop: "1px", width: "50px" }}
            src={logo}
          ></img>
        </Box>
        {props.documentationLink && (
          <Box display="flex">
            <Typography variant="body2">
              <a
                href={props.documentationLink}
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#4169e1",
                }}
              >
                Documentation
              </a>
            </Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="center" minWidth="1134px">
        <Box
          my={6}
          mx="116px"
          pb={7.5}
          padding="40px"
          borderRadius="12px"
          boxShadow={theme.shadows[1]}
          bgcolor={theme.palette.common.white}
        >
          <Box display="flex" justifyContent="center">
            <Box width="100%">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h5"
                  color="textPrimary"
                  style={{ fontWeight: "bold" }}
                >
                  {props.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  style={{ marginTop: "12px" }}
                >
                  {props.subtitle}
                </Typography>
              </Box>
              <Box display="flex">{props.body}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Background;
