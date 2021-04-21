import './TopBar.scss';
import {ArrowBack, AssessmentRounded, ExitToAppOutlined} from "@material-ui/icons";
import {Redirect, useHistory} from 'react-router-dom';
import {useState} from "react";

type TopBarProps = {
    place: string
}

function TopBar({place}: TopBarProps) {
    const backActive = place !== 'dashboard' && place !== 'login';
    const logoutActive = place !== 'login' && place !== 'registration';
    const history = useHistory();
    const [exitRouteActive, setExitRouteActive] = useState(false);

    function back(): void {
        if (backActive) {
            if (place === 'registration') {
                history.push('');
            } else {
                history.push('dashboard');
            }
        }
    }

    function logout(): void {
        if (logoutActive) {
            sessionStorage.clear();
            setExitRouteActive(true);
        }
    }

    return (
        <div className="top-bar">
            <ArrowBack className={backActive ? '' : 'svg-button-disabled'} onClick={back}/>
            <div className="logo">
                <AssessmentRounded />
                <span>Track</span>
                <span>You</span>
            </div>
            <ExitToAppOutlined className={logoutActive ? '' : 'svg-button-disabled'} onClick={logout}/>
            {exitRouteActive && <Redirect to="//" />}
        </div>
    )
}

export default TopBar;