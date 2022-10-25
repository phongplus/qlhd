import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const CPVReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				CPVs: payload,
				CPVsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				CPVs: [],
				CPVsLoading: false
			}

		case ADD:
			return {
				...state,
				CPVs: [...state.CPVs, payload]
			}

		case DELETE:
			return {
				...state,
				CPVs: state.CPVs.filter(CPV => CPV._id !== payload)
			}

		case FIND:
			return { ...state, CPV: payload }

		case UPDATE:
			const newCPVs = state.CPVs.map(CPV =>
				CPV._id === payload._id ? payload : CPV
			)

			return {
				...state,
				CPVs: newCPVs
			}

		default:
			return state
	}
}
