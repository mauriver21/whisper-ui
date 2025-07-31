import { ENV } from '@constants/envs';

export const py = (cmd: string | string[]) => {
  const { PYTHON_SCRIPTS_PATH } = ENV;
  let result = '';

  if (typeof cmd === 'string') {
    result = cmd.replace(/^\//, '');
  } else if (Array.isArray(cmd)) {
    result = cmd.join(' ');
  }

  return `${PYTHON_SCRIPTS_PATH}/.venv/bin/python ${PYTHON_SCRIPTS_PATH}/${result}`;
};
