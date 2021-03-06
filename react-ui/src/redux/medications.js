import axios from "axios";

const GET_MEDICATIONS = "GET_MEDICATIONS";
const NEW_MEDICATION = "NEW_MEDICATION";
const REMOVE_MEDICATION = "REMOVE_MEDICATION";
const UPDATE_ALL_MEDS = "UPDATE_ALL_MEDS";

const initialState = [];

const getMedications = (medications) => ({
  type: GET_MEDICATIONS,
  medications,
});

const newMedication = (medication) => ({
  type: NEW_MEDICATION,
  medication,
});

const removeMedication = (id) => ({
  type: REMOVE_MEDICATION,
  id,
});

export const updateAllMeds = (id, medication) => ({
  type: UPDATE_ALL_MEDS,
  id,
  medication,
});

export const fetchMedications = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/medications`);
      dispatch(getMedications(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const addMedication = (medication) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/medications`,
        medication
      );
      dispatch(newMedication(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteMedication = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/medications/${id}`);
      dispatch(removeMedication(id));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATIONS:
      return action.medications;
    case NEW_MEDICATION:
      return [...state, action.medication];
    case REMOVE_MEDICATION:
      return state.filter((med) => med.id !== action.id);
    case UPDATE_ALL_MEDS:
      return [...state].map((medication) => {
        if (medication.id === action.id) {
          return action.medication;
        } else {
          return medication;
        }
      });
    default:
      return state;
  }
}
