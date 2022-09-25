import { createContext, useReducer, useState } from 'react'
import { UserReducer } from '../reducers/UserReducer'//Note
import {
	apiUrl,
	LOADED_FAIL,
	LOADED_SUCCESS,
	ADD,
	DELETE,
	UPDATE,
	FIND
} from './constants'//Note
import axios from 'axios'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
	// State
	const [UserState, dispatch] = useReducer(UserReducer, {
		User: null,
		Users: [],
		UsersLoading: true
	})

	const [showAddUserModal, setShowAddUserModal] = useState(false)
	const [showUpdateUserModal, setShowUpdateUserModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all Users
	const getUsers = async () => {
		try {
			const response = await axios.get(`${apiUrl}/users`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Users })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add User
	const addUser = async newUser => {
		try {
			const response = await axios.post(`${apiUrl}/users`, newUser)//note Users
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.User }) //note Users
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete User
	const deleteUser = async UserId => {
		try {
			const response = await axios.delete(`${apiUrl}/Users/${UserId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: UserId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find User when user is updating User
	const findUser = UserId => {
		const User = UserState.Users.find(User => User._id === UserId)
		dispatch({ type: FIND, payload: User })
	}

	// Update User
	const updateUser = async updatedUser => {
		try {
			const response = await axios.put(
				`${apiUrl}/Users/${updatedUser._id}`,
				updatedUser
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.User })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// User context data
	const UserContextData = {
		UserState,
		getUsers,
		showAddUserModal,
		setShowAddUserModal,
		showUpdateUserModal,
		setShowUpdateUserModal,
		addUser,
		showToast,
		setShowToast,
		deleteUser,
		findUser,
		updateUser
	}

	return (
		<UserContext.Provider value={UserContextData}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
