import './ProgressCalendar.scss';
import Calendar, {CalendarTileProperties, ViewCallbackProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ProgressCalendar() {

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
        console.log(date.getDate(), date.getMonth(), date.getFullYear());
    }

    function viewChanged({activeStartDate, view}: ViewCallbackProperties): void {
        if (view === 'month') {
            const selectedMonth = activeStartDate.getMonth() + 1;
            const selectedYear = activeStartDate.getFullYear();
            console.log('Adatbázis lekérdezés', selectedMonth, selectedYear);
        }
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
        </div>
    );
}

export default ProgressCalendar;