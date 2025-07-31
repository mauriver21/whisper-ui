import { ENV } from '@constants/envs';
import { execCommand } from '@utils/execCommand';
import { getAppPath } from '@utils/getAppPath';

export const createEnv = () => {
  const get = () => ENV;

  const init = async () => {
    const promises = [initEnv()];
    await Promise.allSettled(promises);
  };

  const initEnv = async () => {
    ENV.DIRNAME = await getAppPath();
    ENV.HOME = (await execCommand('echo $HOME')).stdOut.trim();
    ENV.PYTHON_SCRIPTS_PATH = `${ENV.DIRNAME}/python`;
  };

  const dirname = () => ENV.DIRNAME;

  return {
    dirname,
    get,
    init,
  };
};
