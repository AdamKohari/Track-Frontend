import './Login.scss';
import {Button, TextField} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {loginToApp} from "../../redux/thunks";
import {useFormik} from "formik";
import * as Yup from 'yup';

type LoginProps = {
    login: (username: string, password: string) => void
};
function Login({login}: LoginProps) {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: (values) => {
            login(values.username, values.password);
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
        <div className="login">
            <h1>Bejelentkezés</h1>
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

                        <div className="action-button">
                            <Button variant="contained" color="primary"
                                    disabled={!formik.isValid}
                                    type="submit">Bejelentkezés</Button>
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

// const mapStateToProps = (state: AppState) => ({
// });

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(loginToApp(username, password))
});

export default connect(null, mapDispatchToProps)(Login);

