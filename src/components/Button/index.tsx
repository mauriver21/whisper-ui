import React from 'react';
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from 'reactjs-ui-core';

export interface ButtonProps extends BaseButtonProps {}

export const Button: React.FC<ButtonProps> = (props) => {
  return <BaseButton color="secondary" {...props} />;
};
