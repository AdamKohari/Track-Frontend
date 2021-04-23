import './ProgressCalendar.scss';
import Calendar, {CalendarTileProperties, ViewCallbackProperties} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, {useEffect, useState} from "react";
import {CircularProgress, Modal} from "@material-ui/core";
import SelectModal from "./select-modal/SelectModal";
import {connect} from "react-redux";
import {AppState} from "../../redux/reducers";
import {loadCalendar} from "../../redux/thunks";
import {calendarLoadingStart} from "../../redux/actions";

export type DayLog = {
    day: number,
    tick: boolean,
    heart: boolean,
    cross: boolean
}
type ProgressCalendarProps = {
    isLoading: boolean,
    dayLogs: DayLog[],
    loadCalendar: (year: number, day: number) => void,
    showLoadingSpinner: () => void
}
function ProgressCalendar({isLoading, dayLogs, loadCalendar, showLoadingSpinner}: ProgressCalendarProps) {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState({year: 0, month: 0, day: 0});

    useEffect(() => {
        loadCalendar(new Date().getFullYear(), new Date().getMonth());
    }, [loadCalendar]);

    function getSymbol(day: number): string {
        const dayObj = dayLogs.find(item => item.day === day);
        if (dayObj) {
            let retStr = '';
            if (dayObj.tick) retStr += '✅\n';
            if (dayObj.cross) retStr += '❌\n';
            if (dayObj.heart) retStr += '🧡\n';
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
            const selectedMonth = activeStartDate.getMonth();
            const selectedYear = activeStartDate.getFullYear();
            loadCalendar(selectedYear, selectedMonth);
        }
    }

    function onSelectionDone(): void {
        setModalOpen(false);
        showLoadingSpinner();
        setTimeout(() => {
            loadCalendar(new Date().getFullYear(), new Date().getMonth());
        }, 2000);
    }

    const loadingVisible = {
        display: isLoading ? 'flex' : 'none',
    };

    const calendarVisible = {
        display: isLoading ? 'none' : 'flex',
    };

    return (
        <div className="progress-calendar">
            <h1>Teljesítmény naptár</h1>

            <div className="my-card-cont" style={{marginBottom: '1rem'}}>
                <div className="my-card">
                    <div style={calendarVisible}>
                        <Calendar
                            showNeighboringMonth={false}
                            onViewChange={viewChanged}
                            onClickDay={dayClicked}
                            tileContent={tileContent} />
                    </div>
                    <div style={loadingVisible} className="loading-small">
                        <CircularProgress variant="indeterminate" size={80} />
                    </div>
                </div>
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {<React.Fragment>
                    <SelectModal onDone={onSelectionDone} selectedDate={selectedDate} />
                </React.Fragment>}
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.calendar.isLoading,
    dayLogs: state.calendar.dayLogs
});

const mapDispatchToProps = (dispatch: any) => ({
    loadCalendar: (year: number, month: number) => dispatch(loadCalendar(year, month)),
    showLoadingSpinner: () => dispatch(calendarLoadingStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCalendar);