import { ActionSubmit } from "core/theme/styles/auth.styled";
import { CircularProgress, Typography } from "node_modules/@material-ui/core/index";
import React from "react";

function ActionButton(props) {
  const { loading, children, ...rest } = props;
  return (
      <ActionSubmit {...rest}>
          
      {loading && <CircularProgress size="16px" mr={2} /> }
     
         {children}
   
    </ActionSubmit>
  );
}

export default ActionButton;
