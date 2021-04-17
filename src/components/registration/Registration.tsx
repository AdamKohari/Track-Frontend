import './Registration.scss';
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";

function Registration() {
    return (
        <div className="registration">
            <h1>Regisztráció</h1>
            <div className="card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <form>
                        <div className="input-field">
                            <TextField label="Felhasználónév" variant='outlined' fullWidth={true}/>
                        </div>

                        <div className="input-field">
                            <TextField label="Jelszó" type="password" variant='outlined' fullWidth={true}/>
                        </div>

                        <div className="accept-checkbox">
                            <FormControlLabel
                                control={<Checkbox checked={false} onChange={() => {}} />}
                                label="Elfogadom, hogy a GDPR abszolút nincs betartva itt"
                            />
                        </div>

                        <div className="action-button">
                            <Button variant="contained" color="primary" disabled>Regisztráció</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration;