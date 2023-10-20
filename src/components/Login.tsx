import styled from "styled-components";

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

const submitForm = () => {
    const login = document.getElementById("inputEmail")
    const pass = document.getElementById("inputPassword")
    console.log(login)
    console.log(pass)
}

export default function Login() {
    return (
        <LoginForm>
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
