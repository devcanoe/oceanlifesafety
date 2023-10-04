import DashboardLayout from "@/common/layout/dashboard"
import { Badge } from "@mui/material";
import { PickersDayProps, PickersDay, DateCalendar, DayCalendarSkeleton, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from "react";

export default function CalendarComponent(){

    const requestAbortController = React.useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  
    const fetchHighlightedDays = (date: Dayjs) => {
      const controller = new AbortController();
      fakeFetch(date, {
        signal: controller.signal,
      })
        .then(({ daysToHighlight }) => {
          setHighlightedDays(daysToHighlight);
          setIsLoading(false);
        })
        .catch((error) => {
          // ignore the error if it's caused by `controller.abort`
          if (error.name !== 'AbortError') {
            throw error;
          }
        });
  
      requestAbortController.current = controller;
    };
  
    React.useEffect(() => {
      fetchHighlightedDays(initialValue);
      // abort request on unmount
      return () => requestAbortController.current?.abort();
    }, []);
  
    const handleMonthChange = (date: Dayjs) => {
      if (requestAbortController.current) {
        // make sure that you are aborting useless requests
        // because it is possible to switch between months pretty quickly
        requestAbortController.current.abort();
      }
  
      setIsLoading(true);
      setHighlightedDays([]);
      fetchHighlightedDays(date);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    defaultValue={initialValue}
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                    day: ServerDay,
                    }}
                    slotProps={{
                    day: {
                        highlightedDays,
                    } as any,
                    }}
                />
            </LocalizationProvider>
        </>
    )
}


function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [12, 13, 15];
  
        resolve({ daysToHighlight });
      }, 500);
  
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }

const initialValue = dayjs('2022-04-17');

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

return (
    <Badge
    key={props.day.toString()}
    overlap="circular"
    badgeContent={isSelected ? '🌚' : undefined}
    >
    <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
);
}