import * as React from "react";
import { Dialog } from "@mui/material";
import { PropTypes } from "prop-types";

export default function DialogComponent(props) {
  const { onClose, open } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          border: ".5em solid" + props.color,
        },
      }}
    >
      {props.children}
    </Dialog>
  );
}

DialogComponent.propTypes = {
  color: PropTypes.string,
};
