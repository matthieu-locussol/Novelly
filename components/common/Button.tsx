import React from 'react';

import MuiButton, { ButtonProps } from '@material-ui/core/Button';

const Button = ({ children, ...rest }: ButtonProps) => <MuiButton {...rest}>{children}</MuiButton>;

export default Button;
