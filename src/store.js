import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './components/eventsReducer'

export default configureStore({
	reducer: {
		eventsReducer,
	},
})