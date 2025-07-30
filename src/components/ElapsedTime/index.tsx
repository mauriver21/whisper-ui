import { useEffect, useState } from 'react';
import moment from 'moment';
import { getElapsedTime } from '@utils/getElapsedTime';
import { Typography, TypographyProps } from 'reactjs-ui-core';

const ONE_HOUR_IN_MS = 3600000;

export interface ElapsedTimeProps extends Omit<TypographyProps, 'children'> {
  startTime?: number;
  endTime?: number;
  showAlwaysHours?: boolean;
}

export const ElapsedTime: React.FC<ElapsedTimeProps> = ({
  startTime = 0,
  endTime = startTime,
  showAlwaysHours = true,
  ...rest
}) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const seconds = getElapsedTime(endTime, startTime, { duration: 'seconds' });
    const duration = moment.duration(seconds, 'seconds');
    const ms = duration.asMilliseconds();
    const hours = Math.floor(duration.asHours());
    let mmss = moment.utc(ms).format('mm:ss');

    if (showAlwaysHours && ms < ONE_HOUR_IN_MS) {
      mmss = `00:${mmss}`;
    }

    const elapsedTime = hours ? `${hours}:${mmss}` : mmss;

    setElapsedTime(elapsedTime);
  }, [startTime, endTime]);

  return (
    <Typography variant="body1" component="span" {...rest}>
      {elapsedTime}
    </Typography>
  );
};
