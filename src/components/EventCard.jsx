import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectEvent } from './eventsReducer'
import { formatTime, hasTimeConflict } from '../utils';

const MAX_EVENTS_ALLOWED_TO_SELECT = 3;

function EventCard(props) {
	const { selectedEvents } = useSelector((state) => state.eventsReducer)
	const dispatch = useDispatch();
	const { event } = props;

	const isEventSelected = useMemo(() => !!selectedEvents.find(evt => evt.id === event.id), [selectedEvents])

	const handleSelectEvent = () => {
		if (!isEventSelected && selectedEvents.length === MAX_EVENTS_ALLOWED_TO_SELECT) {
			alert("Only maximum of 3 events can be selected!");
			return;
		}
		dispatch(selectEvent({ event, select: !isEventSelected }));
	}

	const hasConflict = useMemo(() => {
		return !!selectedEvents.find(e => {
			if (event.id === e.id) {
				return false;
			}
			return hasTimeConflict([e.start_time, e.end_time], [event.start_time, event.end_time]);;
		})
	}, [event, selectedEvents]);

	const selectBtnBg = isEventSelected ? "bg-red-500" : hasConflict ? "bg-slate-500 cursor-not-allowed" : "bg-green-500"
	const selectBtnText = isEventSelected ? "Remove" : "Select"
	const cardBg = hasConflict ? "bg-slate-300" : "bg-sky-300"

	return (
		<div className={`rounded-3xl ${cardBg} p-3 grid grid-cols-4 divide-x-2 divide-black`}>
			<div className='col-span-1 text-center self-center text-5xl font-black'>{event.event_category[0]}</div>
			<div className='col-span-3 w-full flex flex-col items-start px-3'>
				<div className='text-lg font-black'>{event.event_name}</div>
				<div>({event.event_category})</div>
				<div>{formatTime(event.start_time)} - {formatTime(event.end_time)}</div>
				<button className={`self-center w-full p-1 mt-1 ${selectBtnBg} text-white`} disabled={hasConflict} onClick={handleSelectEvent}>
					{selectBtnText}
				</button>
			</div>
		</div>
	)
}

export default EventCard
