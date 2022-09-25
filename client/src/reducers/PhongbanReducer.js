import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const PhongbanReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				Phongbans: payload,
				PhongbansLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				Phongbans: [],
				PhongbansLoading: false
			}

		case ADD:
			return {
				...state,
				Phongbans: [...state.Phongbans, payload]
			}

		case DELETE:
			return {
				...state,
				Phongbans: state.Phongbans.filter(Phongban => Phongban._id !== payload)
			}

		case FIND:
			return { ...state, Phongban: payload }

		case UPDATE:
			const newPhongbans = state.Phongbans.map(Phongban =>
				Phongban._id === payload._id ? payload : Phongban
			)

			return {
				...state,
				Phongbans: newPhongbans
			}

		default:
			return state
	}
}
