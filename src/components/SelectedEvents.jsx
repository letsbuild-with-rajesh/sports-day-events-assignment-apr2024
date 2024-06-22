import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Category from './Category'
import { categorizeEvents } from '../utils'

function SelectedEvents() {
	const { selectedEvents: events } = useSelector((state) => state.eventsReducer)

	const selectedEvents = categorizeEvents(events);
	const categories = useMemo(() => Object.keys(selectedEvents), [selectedEvents]);

	return (
		<div className='p-4'>
			<div className='p-3 flex justify-between'>
				<div className='text-3xl font-bold'>Selected Events</div>
			</div>
			<div className=''>
				{
					categories.map((category) => {
						return <Category key={category} category={category} events={selectedEvents[category]} />
					})
				}
			</div>
		</div>
	)
}

export default SelectedEvents
