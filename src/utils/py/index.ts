import { ENV } from '@constants/envs';

export const py = (cmd: string) => {
  const { PYTHON_SCRIPTS_PATH } = ENV;
  cmd = cmd.replace(/^\//, '');
  return `${PYTHON_SCRIPTS_PATH}/.venv/bin/python ${PYTHON_SCRIPTS_PATH}/${cmd}`;
};
