import './Registration.scss';
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {registerToApp} from "../../redux/thunks";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";

type RegisterProps = {
    register: (username: string, password: string) => void
};
function Registration({register}: RegisterProps) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: (values) => {
            register(values.username, values.password);
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .required('A felhasználónév megadása kötelező!')
                .min(4, 'A felhasználónév minimális hossza 4 karakter!'),
            password: Yup.string()
                .required('A jelszó megadása kötelező!')
                .min(6, 'A jelszó minimális hossza 6 karakter!')
        })
    });


    return (
        <div className="registration">
            <h1>Regisztráció</h1>
            <div className="card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-field">
                            <TextField label="Felhasználónév" variant='outlined'
                                       name="username"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       fullWidth={true}/>
                        </div>
                        { formik.touched.username && formik.errors.username &&
                        <div className="validation-error">
                            {formik.errors.username}
                        </div>}

                        <div className="input-field">
                            <TextField label="Jelszó" type="password" variant='outlined'
                                       name="password"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       fullWidth={true}/>
                        </div>
                        { formik.touched.password && formik.errors.password &&
                        <div className="validation-error">
                            {formik.errors.password}
                        </div>}

                        <div className="accept-checkbox">
                            <FormControlLabel
                                control={<Checkbox checked={acceptedTerms}
                                onChange={(event) => setAcceptedTerms(event.target.checked)} />}
                                label="Elfogadom, hogy a GDPR abszolút nincs betartva itt"
                            />
                        </div>

                        <div className="action-button">
                            <Button variant="contained" type="submit"
                                    disabled={!formik.isValid || !acceptedTerms}
                                    color="primary">Regisztráció</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state: AppState) => ({
// });

const mapDispatchToProps = (dispatch: any) => ({
    register: (username: string, password: string) => dispatch(registerToApp(username, password))
});

export default connect(null, mapDispatchToProps)(Registration);