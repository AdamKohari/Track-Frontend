import './SelectModal.scss';
import {Button} from "@material-ui/core";
import {useState} from "react";
import {connect} from "react-redux";
import {CalendarEventJson, setCalendar} from "../../../redux/thunks";

type SelectModalProps = {
    onDone: () => void,
    selectedDate: {
        year: number,
        month: number,
        day: number
    },
    setCalendar: (postData: CalendarEventJson) => void
}
function SelectModal({onDone, selectedDate, setCalendar}: SelectModalProps) {

    const [selected, setSelected]: any = useState([]);

    function symbolClicked(symbol: string): void {
        if (selected.includes(symbol)) {
            const selectedCopy = selected.slice();
            selectedCopy.splice(selectedCopy.indexOf(symbol), 1);
            setSelected(selectedCopy);
            // @ts-ignore
            document.getElementById(symbol).className = 'symbol';
        } else {
            setSelected([...selected, symbol]);
            // @ts-ignore
            document.getElementById(symbol).className = 'symbol symbol-selected';
        }
    }

    function done(): void {
        const postData = {
            ...selectedDate,
            selected
        };
        setCalendar(postData);
        onDone();
    }

    return(
        <div className="select-modal">
            <h2>Válassz szimbolúmokat</h2>
            <div className="symbol-list">
                <div className="symbol"
                     id="tick"
                     onClick={() => symbolClicked('tick')}>✅</div>
                <div className="symbol"
                     id="cross"
                     onClick={() => symbolClicked('cross')}>❌</div>
                <div className="symbol" id="heart"
                     onClick={() => symbolClicked('heart')}>🧡</div>

                <div className="symbol-action">
                    <Button variant="contained"
                            color="primary"
                            onClick={done}
                            disabled={selected.length === 0}>OK</Button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    setCalendar: (postData: CalendarEventJson) => dispatch(setCalendar(postData))
});

export default connect(null, mapDispatchToProps)(SelectModal);