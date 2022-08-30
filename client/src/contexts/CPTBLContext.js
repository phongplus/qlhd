import { createContext, useReducer, useState } from 'react'
import { CPTBLReducer } from '../reducers/CPTBLReducer'//Note
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

export const CPTBLContext = createContext()

const CPTBLContextProvider = ({ children }) => {
	// State
	const [CPTBLState, dispatch] = useReducer(CPTBLReducer, {
		CPTBL: null,
		CPTBLs: [],
		CPTBLsLoading: true
	})

	const [showAddCPTBLModal, setShowAddCPTBLModal] = useState(false)
	const [showUpdateCPTBLModal, setShowUpdateCPTBLModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all CPTBLs
	const getCPTBLs = async () => {
		try {
			const response = await axios.get(`${apiUrl}/chiphithubaolanh`)
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.Chiphithubaolanh })
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add CPTBL
	const addCPTBL = async newCPTBL => {
		try {
			const response = await axios.post(`${apiUrl}/chiphithubaolanh/insert`, newCPTBL)
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.Chiphithubaolanh })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete CPTBL
	const deleteCPTBL = async CPTBLId => {
		try {
			const response = await axios.delete(`${apiUrl}/chiphithubaolanh/${CPTBLId}`)
			if (response.data.success)
				dispatch({ type: DELETE, payload: CPTBLId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find CPTBL when user is updating CPTBL
	const findCPTBL = CPTBLId => {
		const CPTBL = CPTBLState.CPTBLs.find(CPTBL => CPTBL._id === CPTBLId)
		dispatch({ type: FIND, payload: CPTBL })
	}

	// Update CPTBL
	const updateCPTBL = async updatedCPTBL => {
		try {
			const response = await axios.put(
				`${apiUrl}/chiphithubaolanh/${updatedCPTBL._id}`,
				updatedCPTBL
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.updatedChiphithubaolanh })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// CPTBL context data
	const CPTBLContextData = {
		CPTBLState,
		getCPTBLs,
		showAddCPTBLModal,
		setShowAddCPTBLModal,
		showUpdateCPTBLModal,
		setShowUpdateCPTBLModal,
		addCPTBL,
		showToast,
		setShowToast,
		deleteCPTBL,
		findCPTBL,
		updateCPTBL
	}

	return (
		<CPTBLContext.Provider value={CPTBLContextData}>
			{children}
		</CPTBLContext.Provider>
	)
}

export default CPTBLContextProvider
