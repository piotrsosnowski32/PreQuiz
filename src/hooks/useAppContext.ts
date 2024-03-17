import { useContext } from 'react';

import AppContext from '../AppContext';

export function useAppContext() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('The hook has to be used in the AppContext.Provider');
  }

  return appContext;
}
