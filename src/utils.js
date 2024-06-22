export const categorizeEvents = (events) => {
	const categories = {};
	events.forEach(event => {
		if (!(event.event_category in categories)) {
			categories[event.event_category] = [];
		}
		categories[event.event_category].push(event);
	});
	return categories;
}

// Using mock data for events
export const getEvents = (events, searchStr, selectedEvents) => {
	let filteredEvents = [...events];
	if (searchStr) {
		const searchStrLowerCase = searchStr.toLowerCase();
		filteredEvents = filteredEvents.filter(event => event.event_name.toLowerCase().includes(searchStrLowerCase))
	}
	if (selectedEvents.length > 0) {
		// Unselected events
		filteredEvents = filteredEvents.filter(event => !selectedEvents.find(evt => evt.id === event.id));
	}

	return categorizeEvents(filteredEvents);
}

export const formatTime = (dateTime) => {
	const time = new Date(dateTime);
	let hours = time.getHours();
	let minutes = time.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12 || 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	if (minutes !== "00") {
		return `${hours}:${minutes}${ampm}`;
	}
	return `${hours}${ampm}`;
}

export const hasTimeConflict = (time1, time2) => {
	const t1StartTime = new Date(time1[0]);
	const t1EndTime = new Date(time1[1]);
	const t2StartTime = new Date(time2[0]);
	const t2EndTime = new Date(time2[1]);

	if (t1StartTime < t2StartTime) {
		return t1EndTime >= t2StartTime
	}
	return t2EndTime >= t1StartTime
}