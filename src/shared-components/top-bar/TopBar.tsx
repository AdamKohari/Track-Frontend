import './TopBar.scss';
import {AssessmentRounded} from "@material-ui/icons";

function TopBar() {
    return (
        <div className="top-bar">
            <div className="logo">
                <AssessmentRounded />
                <span>Track</span>
                <span>You</span>
            </div>
        </div>
    )
}

export default TopBar;