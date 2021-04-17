import './Login.scss';
import {Button, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';

function Login() {
    return (
        <div className="login">
            <h1>Bejelentkezés</h1>
            <div className="card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <form>
                        <div className="input-field">
                            <TextField label="Felhasználónév" variant='outlined' fullWidth={true}/>
                        </div>

                        <div className="input-field">
                            <TextField label="Jelszó" type="password" variant='outlined' fullWidth={true}/>
                        </div>

                        <div className="action-button">
                            <Button variant="contained" color="primary" disabled>Bejelentkezés</Button>
                        </div>
                    </form>

                    <div className="not-registered">
                        <Link to="/registration">Nem vagy még tag? Regisztrálj!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

