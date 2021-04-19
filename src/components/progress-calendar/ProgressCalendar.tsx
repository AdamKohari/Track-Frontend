import './ProgressCalendar.scss';
import Calendar, {CalendarTileProperties, ViewCallbackProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";
import {Modal} from "@material-ui/core";
import SelectModal from "./select-modal/SelectModal";

function ProgressCalendar() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState({year: 0, month: 0, day: 0});

    const mocked = [
        {day: 11, tick: true, heart: true, cross: false},
        {day: 12, tick: true, heart: false, cross: false},
        {day: 13, tick: false, heart: false, cross: true}
    ];

    function getSymbol(day: number): string {
        const dayObj = mocked.find(item => item.day === day);
        if (dayObj) {
            let retStr = '';
            if (dayObj.tick) retStr += '✅';
            if (dayObj.cross) retStr += '❌';
            if (dayObj.heart) retStr += '🧡';
            return retStr;
        }
        return '';
    }

    function tileContent(props: CalendarTileProperties) {
        return (
          <div className="tile-content">
              {getSymbol(props.date.getDate())}
          </div>
        );
    }

    function dayClicked(date: Date): void {
        setSelectedDate({year: date.getFullYear(), month: date.getMonth(), day: date.getDate()});
        setModalOpen(true);
    }

    function viewChanged({activeStartDate, view}: ViewCallbackProperties): void {
        if (view === 'month') {
            const selectedMonth = activeStartDate.getMonth() + 1;
            const selectedYear = activeStartDate.getFullYear();
            console.log('Adatbázis lekérdezés', selectedMonth, selectedYear);
        }
    }

    function onSelectionDone(): void {
        setModalOpen(false);
        // TODO reload calendar with some delay
    }

    return (
        <div className="progress-calendar">
            <h1>Teljesítmény naptár</h1>

            <div className="my-card-cont">
                <div className="my-card">
                    <Calendar
                        showNeighboringMonth={false}
                        onViewChange={viewChanged}
                        onClickDay={dayClicked}
                        tileContent={tileContent} />
                </div>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {<SelectModal onDone={onSelectionDone} selectedDate={selectedDate} />}
            </Modal>
        </div>
    );
}

export default ProgressCalendar;