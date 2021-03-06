import axios from "axios";


/* -----------------    ACTION TYPES    ------------------ */


export const UPDATE_DOCUMENT = "UPDATE_DOCUMENT"
const GET_DOCUMENT = "GET_DOCUMENT"

/* ------------     ACTION CREATORS      ------------------ */

const getDocument = (document) => ({ type: GET_DOCUMENT, document });
const updateDocument = (id, document) => ({ type: UPDATE_DOCUMENT, id, document });



/* ------------          REDUCER         ------------------ */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_DOCUMENT:
      return action.document;

    case UPDATE_DOCUMENT:
      return action.document;

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchSingleDocument = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/documents/${id}`);
      dispatch(getDocument(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateDocumentThunk = (id, formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/documents/${id}`, formData);
      dispatch(updateDocument(id, data));
    } catch (error) {
      console.log(error);
    }
  }
}




