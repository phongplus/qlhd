import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const UserReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				Users: payload,
				UsersLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				Users: [],
				UsersLoading: false
			}

		case ADD:
			return {
				...state,
				Users: [...state.Users, payload]
			}

		case DELETE:
			return {
				...state,
				Users: state.Users.filter(User => User._id !== payload)
			}

		case FIND:
			return { ...state, User: payload }

		case UPDATE:
			const newUsers = state.Users.map(User =>
				User._id === payload._id ? payload : User
			)

			return {
				...state,
				Users: newUsers
			}

		default:
			return state
	}
}
