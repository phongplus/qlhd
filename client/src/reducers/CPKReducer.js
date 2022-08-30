import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const CPKReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				CPKs: payload,
				CPKsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				CPKs: [],
				CPKsLoading: false
			}

		case ADD:
			return {
				...state,
				CPKs: [...state.CPKs, payload]
			}

		case DELETE:
			return {
				...state,
				CPKs: state.CPKs.filter(CPK => CPK._id !== payload)
			}

		case FIND:
			return { ...state, CPK: payload }

		case UPDATE:
			const newCPKs = state.CPKs.map(CPK =>
				CPK._id === payload._id ? payload : CPK
			)

			return {
				...state,
				CPKs: newCPKs
			}

		default:
			return state
	}
}
