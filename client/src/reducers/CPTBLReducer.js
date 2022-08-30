import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const CPTBLReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				CPTBLs: payload,
				CPTBLsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				CPTBLs: [],
				CPTBLsLoading: false
			}

		case ADD:
			return {
				...state,
				CPTBLs: [...state.CPTBLs, payload]
			}

		case DELETE:
			return {
				...state,
				CPTBLs: state.CPTBLs.filter(CPTBL => CPTBL._id !== payload)
			}

		case FIND:
			return { ...state, CPTBL: payload }

		case UPDATE:
			const newCPTBLs = state.CPTBLs.map(CPTBL =>
				CPTBL._id === payload._id ? payload : CPTBL
			)

			return {
				...state,
				CPTBLs: newCPTBLs
			}

		default:
			return state
	}
}
