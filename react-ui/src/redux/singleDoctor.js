import axios from 'axios'
import { updateAllDoctors } from './doctors'

const initialState = {}


const SET_SINGLE_DOCTOR = 'SET_SINGLE_DOCTOR'
const UPDATE_SINGLE_DOCTOR = 'UPDATE_SINGLE_DOCTOR'


export const setSingleDoctor = (doctor) => {
    return {
        type: SET_SINGLE_DOCTOR,
        doctor
    }
}


export const updateDoctor = (doctor) => {
    return {
        type: UPDATE_SINGLE_DOCTOR,
        doctor
    }
}



export const fetchSingleDoctor = (id) => {
    console.log('inside the thunk FETCH SINGLE DOCTOR')
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/doctors/${id}`)
            console.log("what is data in thunk", data)
            dispatch(setSingleDoctor(data))
        } catch (err) {
            console.log(err)
        }
    }
};

export const updateSingleDoctor = (id, doctor) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/api/doctors/${id}`, doctor)
            console.log("what is data", data)
            dispatch(updateDoctor(data))
            dispatch(updateAllDoctors(data.id, data))
        } catch (err) {
            console.log(err)
        }
    }
}



export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SINGLE_DOCTOR:
            return action.doctor
        case UPDATE_SINGLE_DOCTOR:
            let updated = { ...state.doctor }
            updated.firstName = action.doctor.firstName
            updated.lastName = action.doctor.lastName
            updated.address = action.doctor.address
            updated.doctorType = action.doctor.doctorType
            return updated
        default:
            return state
    }
}


