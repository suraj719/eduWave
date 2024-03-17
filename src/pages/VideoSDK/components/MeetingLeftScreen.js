import { Box, Button, Link, Typography, useTheme } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";

import useIsLGDesktop from "../utils/useIsLGDesktop";
import useIsSMDesktop from "../utils/useIsSMDesktop";
import useResponsiveSize from "../utils/useResponsiveSize";

const StarsBG = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1366"
      height="768"
      fill="none"
      viewBox="0 0 1366 768"
      {...props}
    >
      <g fill={props.fill} clipPath="url(#clip0_13_15)" opacity="0.2">
        <path d="M320.433 393.131a2.34 2.34 0 01.378 3.595 2.334 2.334 0 01-3.599-.33 2.34 2.34 0 011.464-3.602 2.333 2.333 0 011.757.337zM139.983 374.005a2.333 2.333 0 011.012 2.394 2.343 2.343 0 01-1.824 1.851 2.345 2.345 0 01-2.409-.978 2.343 2.343 0 01-.018-2.599 2.34 2.34 0 013.239-.668zM10.213 317.297a2.338 2.338 0 11-2.567 3.909 2.338 2.338 0 012.567-3.909zM168.702 279.077a2.337 2.337 0 11-2.57 3.905 2.337 2.337 0 012.57-3.905zM-1.116 69.938a2.339 2.339 0 11-2.574 3.906 2.339 2.339 0 012.574-3.906zM122.872 156.563c.386.254.688.618.867 1.044a2.34 2.34 0 01-1.682 3.198 2.334 2.334 0 01-2.424-3.575 2.338 2.338 0 013.239-.667zM360.877 95.133a2.335 2.335 0 011.012 2.395 2.337 2.337 0 01-4.232.873 2.336 2.336 0 01.622-3.25 2.336 2.336 0 012.598-.017zM700.296 406.572a2.341 2.341 0 01.38 3.597 2.335 2.335 0 01-2.545.525 2.338 2.338 0 01.407-4.458 2.343 2.343 0 011.758.336zM505.798 95.584a2.34 2.34 0 01.378 3.594 2.332 2.332 0 01-2.544.524 2.343 2.343 0 01-1.458-2.15 2.341 2.341 0 011.867-2.306 2.337 2.337 0 011.757.338zM700.058 233.663c.386.254.688.617.867 1.043a2.34 2.34 0 01-1.682 3.199 2.338 2.338 0 11.815-4.242zM334.559 217.612a2.337 2.337 0 011.009 2.393 2.337 2.337 0 11-1.009-2.393zM213.448 128a2.333 2.333 0 011.012 2.394 2.337 2.337 0 01-3.177 1.727 2.338 2.338 0 112.165-4.121zM97.455 22.38a2.335 2.335 0 01.667 3.239 2.339 2.339 0 11-.667-3.24zM624.003 294.925c.387.254.689.617.87 1.043a2.342 2.342 0 01-1.682 3.202 2.346 2.346 0 01-2.408-.978 2.336 2.336 0 01-.018-2.599 2.34 2.34 0 013.238-.668zM564.837 398.01a2.337 2.337 0 11-2.57 3.905 2.337 2.337 0 012.57-3.905zM568.294 198.615a2.339 2.339 0 11-2.57 3.91 2.339 2.339 0 012.57-3.91zM450.022 278.591a2.332 2.332 0 011.01 2.393 2.34 2.34 0 01-1.824 1.849 2.33 2.33 0 01-2.406-.977 2.334 2.334 0 01-.018-2.598 2.338 2.338 0 013.238-.667zM269.491 18.603a2.344 2.344 0 011.011 2.394 2.338 2.338 0 11-1.011-2.394zM1321.13 63.696a2.264 2.264 0 01-.65-.64c-.17-.255-.29-.54-.36-.84-.06-.302-.06-.612 0-.913.06-.302.17-.59.34-.846s.39-.477.64-.65c.26-.172.54-.293.84-.355.3-.061.61-.063.92-.006.3.058.58.175.84.344.52.342.88.874 1 1.482.13.607.01 1.24-.33 1.757-.34.518-.88.88-1.48 1.004-.61.126-1.24.004-1.76-.337zM1366.96 186.21a2.316 2.316 0 01-.87-1.043 2.317 2.317 0 01-.14-1.351c.08-.454.3-.873.63-1.202a2.324 2.324 0 012.54-.525c.43.174.8.471 1.06.854s.4.834.4 1.297c.01.462-.13.915-.38 1.302-.34.518-.88.879-1.48 1.005-.61.125-1.24.004-1.76-.337zM1128.96 247.639a2.324 2.324 0 01-1.01-2.394 2.33 2.33 0 013.17-1.725c.43.174.8.471 1.06.854s.4.834.4 1.296a2.317 2.317 0 01-1.02 1.951c-.26.173-.54.293-.84.355-.3.062-.61.064-.92.006-.3-.058-.59-.174-.84-.343zM984.033 247.189a2.333 2.333 0 01-1.012-2.394 2.343 2.343 0 011.825-1.851 2.342 2.342 0 012.811 2.275 2.343 2.343 0 01-1.866 2.307 2.34 2.34 0 01-1.758-.337zM914.344 357.315a2.341 2.341 0 01-.381-3.597 2.338 2.338 0 012.546-.525 2.338 2.338 0 01-.407 4.458 2.343 2.343 0 01-1.758-.336zM831.917 279.47a2.337 2.337 0 112.57-3.905 2.337 2.337 0 01-2.57 3.905zM675.581 98.046a2.341 2.341 0 01-.38-3.596 2.34 2.34 0 11.38 3.596zM1193.66 103.218a2.389 2.389 0 01-.87-1.044 2.313 2.313 0 01-.14-1.35c.09-.455.31-.873.63-1.203a2.353 2.353 0 012.55-.525c.43.174.79.472 1.05.855.26.382.4.834.41 1.296 0 .463-.13.916-.39 1.303a2.344 2.344 0 01-3.24.668zM1276.38 214.772a2.38 2.38 0 01-.87-1.043 2.397 2.397 0 01-.14-1.35c.09-.454.31-.872.63-1.201a2.352 2.352 0 012.55-.524c.43.174.79.471 1.05.854.26.382.4.833.41 1.296 0 .462-.13.915-.39 1.301-.34.518-.87.879-1.48 1.004s-1.24.004-1.76-.337zM865.828 47.847a2.328 2.328 0 01-1.005-1.48 2.316 2.316 0 01.337-1.759 2.339 2.339 0 11.668 3.24zM990.578 415.804a2.337 2.337 0 01-1.009-2.393 2.34 2.34 0 011.824-1.849 2.33 2.33 0 012.406.977 2.334 2.334 0 01.018 2.598 2.338 2.338 0 01-3.239.667zM921.537 144.157a2.337 2.337 0 112.57-3.905 2.337 2.337 0 01-2.57 3.905zM1021.31 82.903a2.318 2.318 0 01-.87-1.044 2.315 2.315 0 01-.14-1.35c.08-.455.3-.873.63-1.203a2.323 2.323 0 012.54-.525c.43.174.8.471 1.06.854s.4.835.4 1.297c0 .463-.13.916-.38 1.302-.35.519-.88.88-1.49 1.005-.6.125-1.23.004-1.75-.336zM1318.77 417.388a2.316 2.316 0 01-.87-1.043 2.315 2.315 0 01-.14-1.351c.08-.454.3-.873.63-1.202a2.324 2.324 0 012.54-.525c.43.174.8.471 1.06.854s.4.834.4 1.297c.01.462-.13.916-.38 1.302-.34.518-.88.879-1.48 1.005-.61.125-1.24.004-1.76-.337zM1220.34 324.171a2.389 2.389 0 01-.87-1.044 2.488 2.488 0 01-.14-1.35c.09-.454.31-.872.63-1.201.33-.329.74-.554 1.2-.648.45-.093.92-.05 1.35.124.43.174.79.471 1.05.854s.4.834.41 1.296c0 .462-.13.915-.39 1.301a2.33 2.33 0 01-1.48 1.005c-.61.125-1.24.003-1.76-.337zM1076.01 382.097a2.324 2.324 0 01-1.01-2.394c.09-.455.31-.873.63-1.203.33-.329.74-.555 1.19-.648.46-.094.93-.051 1.36.123.42.174.79.471 1.05.854s.4.835.41 1.297c0 .463-.14.916-.39 1.302-.34.518-.87.88-1.48 1.005-.61.125-1.24.004-1.76-.336zM122.871 714.789a2.34 2.34 0 01-2.165 4.121 2.335 2.335 0 01-1.459-2.151 2.34 2.34 0 013.624-1.97zM47.644 489.904a2.335 2.335 0 01.378 3.594 2.337 2.337 0 11-.378-3.594zM360.877 653.36a2.345 2.345 0 011.01 2.394 2.334 2.334 0 01-1.824 1.849 2.342 2.342 0 01-2.407-.978 2.341 2.341 0 011.464-3.602 2.333 2.333 0 011.757.337zM505.798 653.81a2.337 2.337 0 11-2.57 3.905 2.337 2.337 0 012.57-3.905zM575.487 543.684a2.345 2.345 0 011.01 2.394 2.334 2.334 0 01-1.824 1.849 2.342 2.342 0 01-2.407-.978 2.345 2.345 0 01-.018-2.598 2.344 2.344 0 013.239-.667zM718.018 509.286a2.343 2.343 0 011.01 2.393 2.342 2.342 0 01-1.825 1.849 2.334 2.334 0 01-2.424-3.575 2.343 2.343 0 011.481-1.005 2.338 2.338 0 011.758.338zM213.448 686.227a2.337 2.337 0 11-2.57 3.905 2.337 2.337 0 012.57-3.905zM97.455 580.605a2.34 2.34 0 01.379 3.595 2.343 2.343 0 01-2.544.524 2.342 2.342 0 01-1.458-2.149 2.34 2.34 0 011.865-2.307 2.335 2.335 0 011.758.337zM499.253 485.194a2.337 2.337 0 01.38 3.596 2.333 2.333 0 01-2.545.525 2.338 2.338 0 112.165-4.121zM568.294 756.839a2.341 2.341 0 01-.812 4.245 2.337 2.337 0 01-2.426-3.576 2.342 2.342 0 013.238-.669zM171.062 483.611a2.34 2.34 0 11-2.571 3.91 2.34 2.34 0 012.571-3.91zM269.491 576.828a2.337 2.337 0 011.009 2.394 2.34 2.34 0 01-1.824 1.849 2.338 2.338 0 11.815-4.243zM413.819 518.894a2.34 2.34 0 11-2.571 3.91 2.34 2.34 0 012.571-3.91zM1169.4 507.868a2.324 2.324 0 01-1.01-2.393c.08-.454.3-.872.63-1.202a2.33 2.33 0 012.54-.524c.43.174.8.472 1.06.854.26.383.4.834.4 1.296 0 .463-.13.916-.38 1.302-.35.518-.88.879-1.49 1.004a2.32 2.32 0 01-1.75-.337zM1349.85 526.992a2.316 2.316 0 01-.87-1.043 2.317 2.317 0 01-.14-1.351c.08-.454.3-.873.63-1.202a2.324 2.324 0 012.54-.525c.43.174.8.471 1.06.854s.4.834.4 1.297a2.315 2.315 0 01-1.02 1.952c-.26.172-.54.293-.84.355-.31.062-.62.064-.92.007a2.28 2.28 0 01-.84-.344zM1321.13 621.922a2.316 2.316 0 01-.87-1.043 2.313 2.313 0 01-.14-1.35c.09-.454.31-.872.63-1.201.33-.329.74-.555 1.19-.648.46-.093.93-.05 1.36.124.42.174.79.471 1.05.854.26.382.4.833.4 1.296a2.311 2.311 0 01-1.02 1.951c-.26.172-.54.293-.84.355-.3.062-.61.064-.92.006-.3-.058-.58-.175-.84-.344zM1366.96 744.436a2.319 2.319 0 01-.87-1.044 2.313 2.313 0 01-.14-1.35c.08-.455.3-.873.63-1.203.32-.329.74-.555 1.19-.648a2.345 2.345 0 012.41.978c.26.382.4.834.4 1.296.01.463-.13.916-.38 1.303a2.34 2.34 0 01-3.24.668zM789.535 494.427a2.347 2.347 0 01-1.012-2.395 2.341 2.341 0 013.177-1.727 2.338 2.338 0 01-.407 4.458 2.344 2.344 0 01-1.758-.336zM675.581 656.272a2.34 2.34 0 112.571-3.91 2.34 2.34 0 01-2.571 3.91zM1193.66 661.443a2.38 2.38 0 01-.87-1.043 2.315 2.315 0 01-.14-1.351c.09-.454.31-.872.63-1.202a2.36 2.36 0 011.2-.649c.45-.093.92-.05 1.35.124.43.174.79.471 1.05.854s.4.834.41 1.297c0 .463-.13.916-.39 1.302-.34.518-.87.88-1.48 1.005-.61.125-1.24.004-1.76-.337zM865.828 606.073a2.337 2.337 0 112.57-3.905 2.337 2.337 0 01-2.57 3.905zM924.999 502.989a2.341 2.341 0 01.812-4.245 2.336 2.336 0 012.812 2.274 2.337 2.337 0 01-3.624 1.971zM921.537 702.383a2.339 2.339 0 112.57-3.91 2.339 2.339 0 01-2.57 3.91zM1021.31 641.128a2.316 2.316 0 01-.87-1.043 2.313 2.313 0 01-.14-1.35c.08-.454.3-.872.63-1.201.32-.329.74-.555 1.19-.648a2.343 2.343 0 012.41.978c.26.383.4.834.4 1.296 0 .462-.13.915-.38 1.301-.35.518-.88.879-1.49 1.004-.6.126-1.23.004-1.75-.337z"></path>
      </g>
      <defs>
        <clipPath id="clip0_13_15">
          <path
            fill={props.fill}
            d="M0 0H1426V1051H0z"
            transform="translate(-30 -75)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
};

const MeetingLeftScreen = ({
  setMeetingLeft,
  leftScreenActionButtonLabel,
  leftScreenActionButtonHref,
  leftScreenRejoinButtonEnabled,
  backgroundColor,
  color,
  animationData,
}) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const jsonSize = useResponsiveSize({
    xl: 720,
    lg: 640,
    md: 520,
    sm: 480,
    xs: 360,
  });

  const isSMDesktop = useIsSMDesktop();
  const isLGDesktop = useIsLGDesktop();

  return (
    <div
      style={{
        height: "90vh",
        width: "90vw",
        position: "relative",
        overflow: "hidden",
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StarsBG height={"100%"} width={"100%"} fill={color} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div style={{ width: jsonSize, backgroundColor: backgroundColor }}>
          <Lottie
            options={defaultOptions}
            eventListeners={[{ eventName: "done" }]}
            width={jsonSize}
            isClickToPauseDisabled
          />
        </div>
        <Box mt={6}>
          <Typography variant={"h4"} style={{ fontWeight: "bold" }}>
            You have left the meeting!
          </Typography>
        </Box>
        <Box
          mt={3}
          style={{
            display: "flex",
            flexDirection: isSMDesktop || isLGDesktop ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {leftScreenRejoinButtonEnabled && (
            <Button
              onClick={() => {
                setMeetingLeft(false);
              }}
              size={isSMDesktop || isLGDesktop ? "large" : "medium"}
              variant="contained"
              color={"primary"}
              style={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              Rejoin Meeting
            </Button>
          )}
          {leftScreenActionButtonLabel &&
          leftScreenActionButtonLabel !== "undefined" &&
          leftScreenActionButtonHref &&
          leftScreenActionButtonHref !== "undefined" ? (
            <Box
              mt={
                leftScreenRejoinButtonEnabled
                  ? isSMDesktop || isLGDesktop
                    ? 0
                    : 2
                  : 0
              }
              ml={
                leftScreenRejoinButtonEnabled
                  ? isSMDesktop || isLGDesktop
                    ? 3
                    : 0
                  : 0
              }
            >
              <Link target={"_top"} href={leftScreenActionButtonHref}>
                <Button
                  size={isSMDesktop || isLGDesktop ? "large" : "medium"}
                  variant="outlined"
                  style={{ fontWeight: "bold" }}
                >
                  {leftScreenActionButtonLabel}
                </Button>
              </Link>
            </Box>
          ) : null}
        </Box>
      </div>
    </div>
  );
};

export default MeetingLeftScreen;
