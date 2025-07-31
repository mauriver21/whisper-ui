import { createEnv } from '@utils/createEnv';

export type Env = Omit<ReturnType<typeof createEnv>, 'init'>;
