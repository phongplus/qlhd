import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const MDKSReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				MDKSs: payload,
				MDKSsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				MDKSs: [],
				MDKSsLoading: false
			}

		case ADD:
			return {
				...state,
				MDKSs: [...state.MDKSs, payload]
			}

		case DELETE:
			return {
				...state,
				MDKSs: state.MDKSs.filter(MDKS => MDKS._id !== payload)
			}

		case FIND:
			return { ...state, MDKS: payload }

		case UPDATE:
			const newMDKSs = state.MDKSs.map(MDKS =>
				MDKS._id === payload._id ? payload : MDKS
			)

			return {
				...state,
				MDKSs: newMDKSs
			}

		default:
			return state
	}
}
