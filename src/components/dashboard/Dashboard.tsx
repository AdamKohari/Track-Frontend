import "./Dashboard.scss";
import ProgressCircle from "../../shared-components/progress-circle/ProgressCircle";
import {Button} from "@material-ui/core";

function Dashboard () {
    return (
        <div className="dashboard">
            <h1>Hello, {'{username}'}!</h1>

            <div className="dashboard-card-cont">
                <div className="dashboard-card">
                    <h2>Előrehaladásod üteme:</h2>
                    <div className="progress-circle">
                        <ProgressCircle
                            size={120}
                            value={100}/>
                    </div>
                    <h3>{'{progress}'}%-ban terv szerint</h3>
                    <h2 style={{marginBottom: 0}}>Ügyes!</h2>
                </div>
            </div>

            <div className="dashboard-card-cont" style={{marginBottom: '1rem'}}>
                <div className="dashboard-card">
                    <h2>Lehetőségek</h2>
                    <div>
                        <div className="menu-button">
                            <Button variant="contained" color="primary">Terv módosítása</Button>
                        </div>

                        <div className="menu-button">
                            <Button variant="contained" color="primary">Adat rögzítése</Button>
                        </div>

                        <div className="menu-button">
                            <Button variant="contained" color="primary">Előrehaladás grafikonok</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;