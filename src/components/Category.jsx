import React from 'react'
import EventCard from './EventCard'

function Category(props) {
	const { events, category } = props;
	return (
		<div className='flex flex-col items-start py-4'>
			<div className='py-2 text-xl underline decoration-2 font-bold'>{category}</div>
			<div className='w-full grid grid-cols-2 gap-4'>
				{
					events.map((event) => {
						return <EventCard key={event.id} event={event} />
					})
				}
			</div>
		</div>
	)
}

export default Category
