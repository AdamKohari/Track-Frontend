import "./Dashboard.scss";
import ProgressCircle from "../../shared-components/progress-circle/ProgressCircle";
import {Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

function Dashboard () {
    const history = useHistory();

    function navigateTo(path: string): void {
        history.push(path);
    }

    return (
        <div className="dashboard">
            <h1>Hello, {localStorage.getItem('username')}!</h1>

            <div className="my-card-cont">
                <div className="my-card">
                    <h2>Előrehaladásod:</h2>
                    <div className="progress-circle">
                        <ProgressCircle
                            size={120}
                            value={100}/>
                    </div>
                    <h3>{'{progressPc}'}%-ban terv szerint</h3>
                    <h2>Ügyes!</h2>
                    <h4 className="last-data-title">Legfrissebb adat:</h4>
                    <h4 className="last-data-date">{'{latestDataDate}'}</h4>
                </div>
            </div>

            <div className="my-card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <h2>Lehetőségek</h2>
                    <div>
                        <div className="menu-button">
                            <Button variant="contained" color="primary">Terv módosítása</Button>
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
        </div>
    )
}

export default Dashboard;