import { createContext } from 'react';

export interface AppContextInterface {
  accessToken?: string;
  setAccessToken: (token: string | undefined) => void;
}

export default createContext<AppContextInterface | undefined>(undefined);
