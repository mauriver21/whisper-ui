import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material';
import { withTooltip, WithTooltipProps } from 'reactjs-ui-core';

export interface IconButtonProps extends MuiIconButtonProps, WithTooltipProps {}

export const IconButton: React.FC<IconButtonProps> = withTooltip(
  ({ fullWidth: _, ...rest }) => <MuiIconButton {...rest} />
);
