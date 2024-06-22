import { createSlice } from '@reduxjs/toolkit'
import { getEvents } from '../utils';
import { eventsMockResponse } from '../mockData';

export const eventsSlice = createSlice({
	name: 'Events',
	initialState: {
		events: getEvents(eventsMockResponse, "", []),  // Categories of events
		selectedEvents: [], // events
		search: '',
	},
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload;
			state.events = getEvents(eventsMockResponse, state.search, state.selectedEvents);
		},
		selectEvent: (state, action) => {
			const { event, select } = action.payload;
			if (select) {
				state.selectedEvents.push(event);
			} else {
				state.selectedEvents = state.selectedEvents.filter(e => e.id !== event.id);
			}
			state.events = getEvents(eventsMockResponse, state.search, state.selectedEvents);
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSearch, selectEvent } = eventsSlice.actions

export default eventsSlice.reducer