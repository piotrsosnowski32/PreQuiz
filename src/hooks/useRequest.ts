import axios from "axios";
import { useAppContext } from "./useAppContext";

// TYMCZASOWE STAŁE - DOMYŚLNIE W .ENV
const BASE_URL = 'http://localhost:5000';

const request = axios.create({
  baseURL: BASE_URL,
});

export function useRequest() {
  const { accessToken, setAccessToken } = useAppContext();
  
  request.interceptors.request.use(
    req => {
      if (accessToken) {
        req.headers.Authorization = accessToken;
      }
  
      return req;
    }
  );
  
  request.interceptors.response.use(
    response => {
      return response; 
    },
    error => {      
      if (error.response.status === 401) {
        setAccessToken(undefined);
      }

      throw error;
    }
  )
  
  return request;
}
