import "./Dashboard.scss";
import ProgressCircle from "../../shared-components/progress-circle/ProgressCircle";
import {Button, CircularProgress, Modal} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import EditPlanModal from "./edit-plan-modal/EditPlanModal";
import {connect} from "react-redux";
import {AppState} from "../../redux/reducers";
import {getUserData} from "../../redux/thunks";

type DashboardProps = {
    mainGoal: {field: string, initValue: number, value: number, due: string},
    latestMainData: {date: string, value: number},
    goalStart: string,
    getUserData: () => void,
    generalLoading: boolean
}
function Dashboard ({mainGoal, latestMainData, goalStart, getUserData, generalLoading}: DashboardProps) {
    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);

    function navigateTo(path: string): void {
        history.push(path);
    }

    function calculatePercent(): number {
        // @ts-ignore
        const timePassed = new Date(latestMainData.date) - new Date(goalStart);
        if (timePassed === 0) {
            return 100;
        }
        // @ts-ignore
        const availableTime = new Date(mainGoal.due) - new Date(goalStart);
        const timePassedRatio = timePassed / availableTime;
        const plannedChange = mainGoal.value - mainGoal.initValue;
        const actualChange = latestMainData.value - mainGoal.initValue;
        const progressRatio = Math.abs(actualChange / plannedChange);
        return (progressRatio / timePassedRatio) * 100;
    }

    const percent = Math.round(calculatePercent());

    return (
        <div className="dashboard">
            <h1>Hello, {localStorage.getItem('username')}!</h1>

            <div className="my-card-cont">
                <div className="my-card">
                    <h2>Előrehaladásod:</h2>
                    {generalLoading
                        ?   <div className="loading-small">
                                <CircularProgress variant="indeterminate" size={80} />
                            </div>
                        :   <div>
                                {mainGoal.field && <div>
                                    <div className="progress-circle">
                                        <ProgressCircle
                                            size={120}
                                            value={percent > 100 ? 100 : percent}/>
                                    </div>
                                    <h3>{percent}%-ban terv szerint</h3>
                                </div> }
                                {!mainGoal.field && <h3><em>Jelenleg nincs beállított terved!</em></h3>}
                                {percent > 75 && percent < 90 && <h2>Ügyes!</h2> }
                                {percent >= 90 && <h2>Nagyon ügyes!</h2> }
                                <h4 className="last-data-title">Legfrissebb adat:</h4>
                                <h4 className="last-data-date">
                                    {latestMainData.date
                                        ? new Date(latestMainData.date).toLocaleDateString()
                                        : 'N/A'}
                                </h4>
                            </div>}
                </div>
            </div>

            <div className="my-card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <h2>Lehetőségek</h2>
                    <div>
                        <div className="menu-button">
                            <Button variant="contained"
                                    onClick={() => setModalOpen(true)}
                                    color="primary">Terv módosítása</Button>
                        </div>

                        <div className="menu-button">
                            <Button variant="contained"
                                    onClick={() => navigateTo('/add')}
                                    color="primary">Adat rögzítése</Button>
                        </div>

                        <div className="menu-button">
                            <Button variant="contained"
                                    onClick={() => navigateTo('/progress-calendar')}
                                    color="primary">Teljesítmény naptár</Button>
                        </div>

                        <div className="menu-button">
                            <Button variant="contained"
                                    onClick={() => navigateTo('/graphs')}
                                    color="primary">Előrehaladás grafikonok</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {<React.Fragment>
                    <EditPlanModal close={() => setModalOpen(false)}/>
                </React.Fragment>}
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    mainGoal: state.appRedux.mainGoal,
    latestMainData: state.appRedux.latestMainData,
    goalStart: state.appRedux.goalStart,
    generalLoading: state.appRedux.generalLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getUserData: () => dispatch(getUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);