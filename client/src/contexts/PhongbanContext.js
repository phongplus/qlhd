import { createContext, useReducer, useState } from 'react'
import { PhongbanReducer } from '../reducers/PhongbanReducer'//Note
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

export const PhongbanContext = createContext()

const PhongbanContextProvider = ({ children }) => {
	// State
	const [PhongbanState, dispatch] = useReducer(PhongbanReducer, {
		Phongban: null,
		Phongbans: [],
		PhongbansLoading: true
	})

	const [showAddPhongbanModal, setShowAddPhongbanModal] = useState(false)
	const [showUpdatePhongbanModal, setShowUpdatePhongbanModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all Phongbans
	const getPhongbans = async () => {
		try {
			const response = await axios.get(`${apiUrl}/phongban/view`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Phongbans })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add Phongban
	const addPhongban = async newPhongban => {
		try {
			const response = await axios.post(`${apiUrl}/phongban/insert`, newPhongban)//note
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.Phongban })//note
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete Phongban
	const deletePhongban = async PhongbanId => {
		try {
			const response = await axios.delete(`${apiUrl}/phongban/delete/${PhongbanId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: PhongbanId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find Phongban when user is updating Phongban
	const findPhongban = PhongbanId => {
		const Phongban = PhongbanState.Phongbans.find(Phongban => Phongban._id === PhongbanId)
		dispatch({ type: FIND, payload: Phongban })
	}

	// Update Phongban
	const updatePhongban = async updatedPhongban => {
		try {
			const response = await axios.put(
				`${apiUrl}/phongban/update/${updatedPhongban._id}`,//note
				updatedPhongban
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.Phongban })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Phongban context data
	const PhongbanContextData = {
		PhongbanState,
		getPhongbans,
		showAddPhongbanModal,
		setShowAddPhongbanModal,
		showUpdatePhongbanModal,
		setShowUpdatePhongbanModal,
		addPhongban,
		showToast,
		setShowToast,
		deletePhongban,
		findPhongban,
		updatePhongban
	}

	return (
		<PhongbanContext.Provider value={PhongbanContextData}>
			{children}
		</PhongbanContext.Provider>
	)
}

export default PhongbanContextProvider
