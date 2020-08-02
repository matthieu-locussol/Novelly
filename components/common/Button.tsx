import React from "react";

import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const Button = ({ children, ...rest }: ButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiButton {...rest}>{children}</MuiButton>
    </div>
  );
};

export default Button;
