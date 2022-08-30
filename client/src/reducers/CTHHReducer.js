import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const CTHHReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				CTHHs: payload,
				CTHHsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				CTHHs: [],
				CTHHsLoading: false
			}

		case ADD:
			return {
				...state,
				CTHHs: [...state.CTHHs, payload]
			}

		case DELETE:
			return {
				...state,
				CTHHs: state.CTHHs.filter(CTHH => CTHH._id !== payload)
			}

		case FIND:
			return { ...state, CTHH: payload }

		case UPDATE:
			const newCTHHs = state.CTHHs.map(CTHH =>
				CTHH._id === payload._id ? payload : CTHH
			)

			return {
				...state,
				CTHHs: newCTHHs
			}

		default:
			return state
	}
}
