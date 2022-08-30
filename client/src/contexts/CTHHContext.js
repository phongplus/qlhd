import { createContext, useReducer, useState } from 'react'
import { CTHHReducer } from '../reducers/CTHHReducer'//Note
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

export const CTHHContext = createContext()

const CTHHContextProvider = ({ children }) => {
	// State
	const [CTHHState, dispatch] = useReducer(CTHHReducer, {
		CTHH: null,
		CTHHs: [],
		CTHHsLoading: true
	})

	const [showAddCTHHModal, setShowAddCTHHModal] = useState(false)
	const [showUpdateCTHHModal, setShowUpdateCTHHModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all CTHHs
	const getCTHHs = async () => {
		try {
			const response = await axios.get(`${apiUrl}/chitiethanghoa`)//note
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.ChiTietHangHoas })//note
				
			}
		} catch (error) {
			dispatch({ type: LOADED_FAIL })
		}
	}

	// Add CTHH
	const addCTHH = async newCTHH => {
		try {
			const response = await axios.post(`${apiUrl}/chitiethanghoa/insert`, newCTHH)//note mandaykysu
			if (response.data.success) {
				dispatch({ type: ADD, payload: response.data.ChiTietHangHoa }) //note MandayKysu
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete CTHH
	const deleteCTHH = async CTHHId => {
		try {
			const response = await axios.delete(`${apiUrl}/chitiethanghoa/${CTHHId}`)//note
			if (response.data.success)
				dispatch({ type: DELETE, payload: CTHHId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find CTHH when user is updating CTHH
	const findCTHH = CTHHId => {
		const CTHH = CTHHState.CTHHs.find(CTHH => CTHH._id === CTHHId)
		dispatch({ type: FIND, payload: CTHH })
	}

	// Update CTHH
	const updateCTHH = async updatedCTHH => {
		try {
			const response = await axios.put(
				`${apiUrl}/chitiethanghoa/${updatedCTHH._id}`, //note xem trong server
				updatedCTHH
			)
			if (response.data.success) {
				dispatch({ type: UPDATE, payload: response.data.ChiTietHangHoa }) //note MandayKysu biến trả về từ server
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// CTHH context data
	const CTHHContextData = {
		CTHHState,
		getCTHHs,
		showAddCTHHModal,
		setShowAddCTHHModal,
		showUpdateCTHHModal,
		setShowUpdateCTHHModal,
		addCTHH,
		showToast,
		setShowToast,
		deleteCTHH,
		findCTHH,
		updateCTHH
	}

	return (
		<CTHHContext.Provider value={CTHHContextData}>
			{children}
		</CTHHContext.Provider>
	)
}

export default CTHHContextProvider
