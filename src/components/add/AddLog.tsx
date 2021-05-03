import './AddLog.scss';
import {connect} from "react-redux";
import {AppState} from "../../redux/reducers";
import {useFormik} from "formik";
import {Button, CircularProgress, TextField} from "@material-ui/core";
import React from "react";
import {setDataLog} from "../../redux/thunks";

type AddLogProps = {
    trackedFields: string[],
    setDataLog: (fieldsObject: any) => void,
    generalLoading: boolean
}
function AddLog({trackedFields, setDataLog, generalLoading}: AddLogProps) {

    const now = new Date();
    const formik = useFormik({
        initialValues: {
            date: '' + now.getFullYear() + '-' + (now.getMonth() < 9 ? '0' : '') +
                (now.getMonth() + 1) + '-' + (now.getDate() < 10 ? '0' : '') + now.getDate()
        },
        onSubmit: (values) => {
            setDataLog(values);
        },
    });

    const fieldInputs = trackedFields.map(field => (
       <div key={field} className="log-input-field">
           <span>{field}</span>
           <TextField type="number" fullWidth={true}
                      inputProps={{"step": 0.1}}
                      onChange={formik.handleChange}
                      variant="outlined" name={field} />
       </div>
    ));

    return (
        <div className="add-log">
            <h1>Adat rögzítése</h1>

            <div className="my-card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    {trackedFields.length !== 0 && !generalLoading &&
                    <form onSubmit={formik.handleSubmit}>
                        {fieldInputs}
                        <div className="log-input-field" style={{marginTop: '2rem'}}>
                            <span>Dátum</span>
                            <TextField type="date" fullWidth={true}
                                       value={formik.values.date}
                                       onChange={formik.handleChange}
                                       variant="outlined" name="date" />
                        </div>
                        <div className="save-button-cont">
                            <Button variant="contained" color="primary"
                                    type="submit">Mentés</Button>
                        </div>
                    </form>}

                    {trackedFields.length === 0 &&
                    <div>Jelenleg nincs egyetlen trackelt adattípusod sem, ezért nem tudsz új adatot rögzíteni.</div>}

                    {generalLoading &&
                    <div className="loading-small">
                        <CircularProgress variant="indeterminate" size={80} />
                    </div>}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    trackedFields: state.appRedux.trackedFields,
    generalLoading: state.appRedux.generalLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    setDataLog: (fieldsObject: any) => dispatch(setDataLog(fieldsObject))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddLog);