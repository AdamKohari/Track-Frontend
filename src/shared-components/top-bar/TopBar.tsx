import './TopBar.scss';
import {ArrowBack, AssessmentRounded, ExitToAppOutlined} from "@material-ui/icons";
import {useHistory} from 'react-router-dom';

type TopBarProps = {
    place: string
}

function TopBar({place}: TopBarProps) {
    const backActive = place !== 'dashboard' && place !== 'login';
    const logoutActive = place !== 'login' && place !== 'registration';
    const history = useHistory();

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
            localStorage.clear();
            history.push('');
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
        </div>
    )
}

export default TopBar;