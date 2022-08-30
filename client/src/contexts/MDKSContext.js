import { createContext, useReducer, useState } from 'react'
import { MDKSReducer } from '../reducers/MDKSReducer'//Note
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

export const MDKSContext = createContext()

const MDKSContextProvider = ({ children }) => {
	// State
	const [MDKSState, dispatch] = useReducer(MDKSReducer, {
		MDKS: null,
		MDKSs: [],
		MDKSsLoading: true
	})

	const [showAddMDKSModal, setShowAddMDKSModal] = useState(false)
	const [showUpdateMDKSModal, setShowUpdateMDKSModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all MDKSs
	const getMDKSs = async () => {
		try {
			const response = await axios.get(`${apiUrl}/mandaykysu`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.MandayKysus })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add MDKS
	const addMDKS = async newMDKS => {
		try {
			const response = await axios.post(`${apiUrl}/mandaykysu/insert`, newMDKS)//note mandaykysu
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.MandayKysu }) //note MandayKysu
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete MDKS
	const deleteMDKS = async MDKSId => {
		try {
			const response = await axios.delete(`${apiUrl}/mandaykysu/${MDKSId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: MDKSId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find MDKS when user is updating MDKS
	const findMDKS = MDKSId => {
		const MDKS = MDKSState.MDKSs.find(MDKS => MDKS._id === MDKSId)
		dispatch({ type: FIND, payload: MDKS })
	}

	// Update MDKS
	const updateMDKS = async updatedMDKS => {
		try {
			const response = await axios.put(
				`${apiUrl}/mandaykysu/${updatedMDKS._id}`, //note xem trong server
				updatedMDKS
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.MandayKysu }) //note MandayKysu biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// MDKS context data
	const MDKSContextData = {
		MDKSState,
		getMDKSs,
		showAddMDKSModal,
		setShowAddMDKSModal,
		showUpdateMDKSModal,
		setShowUpdateMDKSModal,
		addMDKS,
		showToast,
		setShowToast,
		deleteMDKS,
		findMDKS,
		updateMDKS
	}

	return (
		<MDKSContext.Provider value={MDKSContextData}>
			{children}
		</MDKSContext.Provider>
	)
}

export default MDKSContextProvider
