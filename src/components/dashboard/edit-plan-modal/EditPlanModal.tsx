import './EditPlanModal.scss';
import {Button, Select, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {connect} from "react-redux";
import {AppState} from "../../../redux/reducers";

type EditPlanModalProps = {
    close: () => void,
    trackedFields: string[]
};
function EditPlanModal({close, trackedFields}: EditPlanModalProps) {
    const [newDataType, setNewDataType] = useState('');

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
                <Button
                    size="small"
                    variant="contained"
                    disabled={!newDataType}
                    color="primary">Hozzáad</Button>
            </div>

            <div>
                <h3>A cél:</h3>
                <div>E mező:</div>
                <div>
                    <Select variant="outlined" fullWidth={true}>
                    </Select>
                </div>
                <div style={{marginTop: '1rem'}}>Legyen:</div>
                <div>
                    <TextField type="number" fullWidth={true} variant="outlined" />
                </div>
                <div style={{marginTop: '1rem'}}>Eddigre:</div>
                <div>
                    <TextField type="date" fullWidth={true} variant="outlined" />
                </div>
                <div className="save-plan-button">
                    <Button
                        variant="contained"
                        color="primary">Cél mentése</Button>
                    <Button
                        onClick={close}
                        variant="contained"
                        color="secondary">Bezárás</Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    trackedFields: state.appRedux.trackedFields
});

export default connect(mapStateToProps)(EditPlanModal);