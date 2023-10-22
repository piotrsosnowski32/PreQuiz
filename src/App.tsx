import { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from "./components/Routes";
import AppContext, { AppContextInterface } from "./AppContext";
import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState(window.localStorage.getItem('AUTH_TOKEN') ?? undefined);
  const appContextValue: AppContextInterface = useMemo(() => ({
    accessToken,
    setAccessToken: (token) => {
      if (token) {
        window.localStorage.setItem('AUTH_TOKEN', token);
      } else {
        window.localStorage.removeItem('AUTH_TOKEN');
      }

      setAccessToken(token);
    },
  }), [accessToken]);
  
  return (
    <BrowserRouter>
      <div className="p-3 mb-2 bg-dark text-white">
        <AppContext.Provider value={appContextValue}>
          <AppRouter />
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
