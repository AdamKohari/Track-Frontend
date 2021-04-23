import './Graphs.scss';
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AppState, DataLog} from "../../redux/reducers";
import {getDataLogs} from "../../redux/thunks";
import {CircularProgress, MenuItem, Select} from "@material-ui/core";

type GraphsProps = {
    trackedFields: string[],
    generalLoading: boolean,
    getDataLogs: () => void,
    dataLogs: DataLog[]
};
function Graphs({trackedFields, generalLoading, getDataLogs, dataLogs}: GraphsProps) {

    const [selectedType, setSelectedType] = useState('NONE');
    const [dateDataPairs, setDateDataPairs] = useState([] as DataPair[]);
    useEffect(() => {
        getDataLogs();
    }, [getDataLogs]);

    function selectionChanged(event: any): void {
        setSelectedType(event.target.value);
        genDataDataPairs(event.target.value);
    }

    type DataPair = {
        date: string,
        value: number
    }
    function genDataDataPairs(selectedType: string): void {
        const filtered = dataLogs.filter(datalog => datalog.data[selectedType] !== undefined);
        const dataPairs: DataPair[] = filtered.map(datalog => ({
            date: datalog.date,
            value: datalog.data[selectedType]
        }));
        setDateDataPairs(dataPairs);
    }

    const content = (
        <div>
            <Select variant="outlined" fullWidth={true} value={selectedType}
                    onChange={selectionChanged}>
                { trackedFields.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>) }
                {selectedType === 'NONE' && <MenuItem value="NONE">Válassz adattípust!</MenuItem>}
            </Select>
            <div>
                {dateDataPairs.length !== 0 &&
                <React.Fragment>
                    <h3>Adatelőzmények:</h3>
                    <div className="data-log-table">
                        {dateDataPairs.map((pair, id) => (
                            <div className="row" key={id}>
                                <div>{new Date(pair.date).toLocaleDateString()}</div>
                                <div>{pair.value}</div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>}
            </div>
        </div>
    );
    const loading = (
        <div className="loading-small">
            <CircularProgress variant="indeterminate" size={80} />
        </div>
    );
    return (
        <div className="graphs">
            <h1>Grafikonok</h1>
            <div className="my-card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    {generalLoading ? loading : content}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    trackedFields: state.appRedux.trackedFields,
    generalLoading: state.appRedux.generalLoading,
    dataLogs: state.appRedux.dataLogs
});

const mapDispatchToProps = (dispatch: any) => ({
    getDataLogs: () => dispatch(getDataLogs())
});
export default connect(mapStateToProps, mapDispatchToProps)(Graphs);