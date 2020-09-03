import axios from 'axios';
const initialState = [];

const GET_TODAY_APPOINTMENT = 'GET_TODAY_APPOINTMENT';
const UPDATE_TODAY_APPOINTMENT = 'UPDATE_TODAY_APPOINTMENT';

export const getTodayAppointment = todayAppointment => {
  return {
    type: GET_TODAY_APPOINTMENT,
    todayAppointment
  }
}
const updateTodayAppointment = todayAppointment => {
  return {
    type: UPDATE_TODAY_APPOINTMENT,
    todayAppointment
  }
}

export const getTodayAppointmentThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/dailycheckin/dcappointment`);
      dispatch(getTodayAppointment(data));
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateTodayAppointmentThunk = (
  id,
  todayAppointment
) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/dailycheckin/dcappointment/${id}`,
        todayAppointment
      );
      const allData = await axios.get(`/api/dailycheckin/dcappointment`);
      dispatch(updateTodayAppointment(data));
      dispatch(getTodayAppointment(allData.data));
    } catch (error) {
      console.log(error)
    }
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_APPOINTMENT:
      return action.todayAppointment;
    case UPDATE_TODAY_APPOINTMENT:
      let updated = { ...state.todayAppointment }
      updated.firstName = action.todayAppointment.firstName;
      updated.lastName = action.todayAppointment.lastName;
      updated.time = action.todayAppointment.time;
      return updated
    default:
      return state;
  }
}
