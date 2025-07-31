import { Env } from '@interfaces/Env';
import { createContext } from 'react';

export const EnvContext = createContext<Env>({} as any);
