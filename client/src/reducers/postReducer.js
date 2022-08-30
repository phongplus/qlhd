import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from '../contexts/constants'

export const postReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				posts: payload,
				postsLoading: false
			}

		case LOADED_FAIL:
			return {
				...state,
				posts: [],
				postsLoading: false
			}

		case ADD:
			return {
				...state,
				posts: [...state.posts, payload]
			}

		case DELETE:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload)
			}

		case FIND:
			return { ...state, post: payload }

		case UPDATE:
			const newPosts = state.posts.map(post =>
				post._id === payload._id ? payload : post
			)

			return {
				...state,
				posts: newPosts
			}

		default:
			return state
	}
}
