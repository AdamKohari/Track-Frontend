import './TopBar.scss';
import {ArrowBack, AssessmentRounded, ExitToAppOutlined} from "@material-ui/icons";

function TopBar() {
    return (
        <div className="top-bar">
            <ArrowBack className="svg-button-disabled"/>
            <div className="logo">
                <AssessmentRounded />
                <span>Track</span>
                <span>You</span>
            </div>
            <ExitToAppOutlined />
        </div>
    )
}

export default TopBar;