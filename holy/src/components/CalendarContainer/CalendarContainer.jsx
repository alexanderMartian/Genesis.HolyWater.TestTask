import Calendar from "../Calendar/Calendar";
import DatePicker from "../DatePicker/DatePicker";
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import {useCalendar} from "../../hooks/useCalendar";
import {getFromLS, saveToLS} from "../../functions/localStorage";
import {createMonth} from "../../functions/createMonth";


const CalendarContainer = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {state, functions} = useCalendar({locale: "en-US", date: new Date(), firstWeekDayNumber: 2});

  useEffect( () => {
    if (getFromLS("dateFilterInfo")) {
      const monthIndex = getFromLS("dateFilterInfo").monthIndex;
      const year = getFromLS("dateFilterInfo").year;
      functions.setSelectedMonth(createMonth({ date: new Date(year, monthIndex), locale: "en-US" }));
      functions.setSelectedYear(year);
    }
  }, []);

  useEffect( () =>  {
    if (state.calendarDays) {
      saveToLS("dateFilterInfo", state.selectedMonth);
    }
  }, [state.calendarDays]);

  const switchDatePicker = () => setIsDatePickerOpen(prev => !prev);

  return (
    <>
      <Calendar switchDatePicker={switchDatePicker} state={state} functions={functions}/>
      <DatePicker state={state} functions={functions} switchDatePicker={switchDatePicker} isDatePickerOpen={isDatePickerOpen}/>
      <Modal state={state} functions={functions} />
    </>
  )
}

export default CalendarContainer;