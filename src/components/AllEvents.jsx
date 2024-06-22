import { useEffect, useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Category from './Category'
import { setSearch } from './eventsReducer'

function AllEvents() {
	const { events } = useSelector((state) => state.eventsReducer)
	const dispatch = useDispatch();
	const searchRef = useRef(null);

	const categories = useMemo(() => Object.keys(events), [events]);

	const handleSearch = () => {
		dispatch(setSearch(searchRef.current.value));
	};

	const handleOnChange = (e) => {
		// Show entire list if search is cleared
		if (!e.target.value) {
			handleSearch();
		}
	};

	useEffect(() => {
		searchRef?.current?.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				handleSearch();
			}
		});
	}, []);

	return (
		<div className='p-4'>
			<div className='p-3 flex justify-between'>
				<div className='text-3xl font-bold'>All Events</div>
				<div className='border-2 p-0 rounded-sm w-1/3 flex justify-center items-center'>
					<input type='text' className='w-full' ref={searchRef} onChange={handleOnChange} />
					<div className='px-1 cursor-pointer' onClick={handleSearch}>&#128269;</div>
				</div>
			</div>
			<div className=''>
				{
					categories.map((category) => {
						return <Category key={category} category={category} events={events[category]} />
					})
				}
			</div>
		</div>
	)
}

export default AllEvents
