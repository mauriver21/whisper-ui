import { EnvContext } from '@contexts/EnvContext';
import { createEnv } from '@utils/createEnv';
import { useEffect, useState } from 'react';

export interface EnvProviderProps {
  children?: React.ReactNode;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);

  const { init, ...env } = createEnv();

  useEffect(() => {
    (async () => {
      setInitializing(true);
      await init();
      setInitializing(false);
    })();
  }, []);

  return (
    <EnvContext.Provider value={env}>
      {initializing ? <></> : children}
    </EnvContext.Provider>
  );
};
