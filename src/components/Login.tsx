import { useState } from 'react';
import styled from "styled-components";
import { AxiosError } from 'axios';

import { useAppContext } from '../hooks/useAppContext';
import { useRequest } from '../hooks/useRequest';

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ConfirmButton = styled.button`
    width: 50%;
    height: 7%;
`

export default function Login() {
    const request = useRequest();
    const appContext = useAppContext();
    const [message, setMessage] = useState<string>();
    
    const submitForm = async () => {
        const loginValue = document.getElementById("inputEmail") as HTMLInputElement;
        const passwordValue = document.getElementById("inputPassword") as HTMLInputElement;

        try {
            const response = await request.post('/users/auth', {
                login: loginValue.value,
                password: passwordValue.value,
            });

            if (response.data) {
                appContext.setAccessToken(response.data.accessToken);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data.message) {
                  setMessage(error.response.data.message);
                }
              }
        }
    }
    
    return (
        <LoginForm>
            <span style={{ color: 'red' }}>{message}</span>
            <div className="mb-3 row">
                <label htmlFor="inputemail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail" name="inputEmail"></input>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Hasło</label>
                    <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword" name="inputPassword"></input>
                </div>
            </div>

            <ConfirmButton type="submit" className="btn btn-warning" onClick={ submitForm }>Dali</ConfirmButton>
        </LoginForm>
    )
}
