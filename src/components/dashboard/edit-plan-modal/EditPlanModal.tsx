import './EditPlanModal.scss';
import {Button, CircularProgress, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {connect} from "react-redux";
import {AppState} from "../../../redux/reducers";
import {useFormik} from "formik";
import * as Yup from "yup";
import {setUserData} from "../../../redux/thunks";

type EditPlanModalProps = {
    close: () => void,
    trackedFields: string[],
    mainGoal: {
        field: string,
        value: number,
        due: string
    },
    addNewDataType: (datatype: string[]) => void,
    saveMainGoal: (mainGoal: {field: string, value: number, due: string}) => void,
    generalLoading: boolean
};
function EditPlanModal({close, trackedFields, mainGoal, addNewDataType, saveMainGoal, generalLoading}: EditPlanModalProps) {
    const [newDataType, setNewDataType] = useState('');
    const formik = useFormik({
        initialValues: {
            field: mainGoal.field,
            value: mainGoal.value,
            due: mainGoal.due
        },
        onSubmit: (values) => {
            saveMainGoal(values);
        },
        validationSchema: Yup.object({
            field: Yup.string().required('Kötelező mező!'),
            value: Yup.number().required('Kötelező mező!'),
            due: Yup.date().required('Kötelező mező!')
        })
    });

    return (
        <div className="edit-plan-modal">
            <h2>A terved</h2>
            <h3>A trackelt adatok:</h3>
            <div>
                {trackedFields.length > 0
                ?   <span>{trackedFields.join(', ')}</span>
                :   <span>Jelenleg nincs trackelt adattípusod</span>}
            </div>
            <div className="add-new-data-type">
                <TextField type="text" fullWidth={true} variant="outlined"
                           onChange={$event => setNewDataType($event.target.value)}/>
                {generalLoading
                    ?   <div className="loading-small">
                            <CircularProgress variant="indeterminate" size={30} />
                        </div>
                    :   <Button
                        size="small"
                        variant="contained"
                        disabled={!newDataType}
                        onClick={() => addNewDataType([...trackedFields, newDataType])}
                        color="primary">Hozzáad</Button>}
            </div>

            <form onSubmit={formik.handleSubmit}>
                <h3>A cél:</h3>
                <div>E mező:</div>
                <div>
                    <Select variant="outlined" fullWidth={true} name="field"
                            value={formik.values.field}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={trackedFields.length === 0}>
                        { trackedFields.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>) }
                    </Select>
                    { formik.touched.field && formik.errors.field &&
                    <div className="validation-error">
                        {formik.errors.field}
                    </div>}
                </div>

                <div style={{marginTop: '1rem'}}>Legyen:</div>
                <div>
                    <TextField type="number" fullWidth={true} variant="outlined"
                               value={formik.values.value}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               name="value" disabled={trackedFields.length === 0}/>
                        { formik.touched.value && formik.errors.value &&
                    <div className="validation-error">
                        {formik.errors.value}
                    </div>}
                </div>

                <div style={{marginTop: '1rem'}}>Eddig:</div>
                <div>
                    <TextField type="date" fullWidth={true} variant="outlined"
                               value={formik.values.due}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               name="due" disabled={trackedFields.length === 0}/>
                    { formik.touched.due && formik.errors.due &&
                    <div className="validation-error">
                        {formik.errors.due}
                    </div>}
                </div>

                <div className="save-plan-button">
                    {generalLoading
                        ?   <div className="loading-small">
                                <CircularProgress variant="indeterminate" size={30} />
                            </div>
                        :   <div className="action-button">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!formik.isValid}
                                    color="primary">Cél mentése</Button>
                            </div>}
                    <Button
                        onClick={close}
                        disabled={generalLoading}
                        variant="contained"
                        color="secondary">Bezárás</Button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    trackedFields: state.appRedux.trackedFields,
    mainGoal: state.appRedux.mainGoal,
    generalLoading: state.appRedux.generalLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    addNewDataType: (datatype: string[]) => dispatch(setUserData({
        isDataType: true, dataType: datatype})),
    saveMainGoal: (values: {field: string, value: number, due: string}) => dispatch(setUserData({
        isDataType: false, mainGoal: values}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlanModal);