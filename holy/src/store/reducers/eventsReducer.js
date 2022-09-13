import {createSlice} from '@reduxjs/toolkit';
import {getFromLS} from '../../functions/localStorage';

const initialState = {
  events: getFromLS('events') ? getFromLS('events') : [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, payload) {
      state.events.push(payload.payload);
    },
    editEvent(state, payload) {
      const index = state.events.findIndex((item) => item.id === payload.payload.id);
      state.events[index] = payload.payload;
    },
    deleteEvent(state, payload) {
      const index = state.events.findIndex((item) => item.id === payload.payload);
      state.events.splice(index);
    },
  },
});

export default eventSlice.reducer;
export const {addEvent, editEvent, deleteEvent} = eventSlice.actions;
