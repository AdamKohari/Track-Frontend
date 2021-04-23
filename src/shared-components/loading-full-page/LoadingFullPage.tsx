import './LoadingFullPage.scss';
import {CircularProgress} from "@material-ui/core";

function LoadingFullPage() {
    return (
        <div className="loading-full-page">
            <div>
                <div><CircularProgress style={{color: "white"}} size={80}/></div>
                <div>Loading</div>
            </div>
        </div>
    )
}

export default LoadingFullPage;