import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useContext, useState } from 'react'
import { MDKSContext } from '../../contexts/MDKSContext'

const AddMDKSModal = () => {
	// Contexts
	const {
		showAddMDKSModal,
		setShowAddMDKSModal,
		addMDKS,
		setShowToast
	} = useContext(MDKSContext)

	// State
	const [newMDKS, setNewMDKS] = useState({
		TygiaUSD:'',
		phongban: '',
		mandaychuan:'',
		songuoi: '',
		songaythuchien:'',
		thanhtien:'',
		ghichu: ''
	}) //note là các biến trong 

	const { TygiaUSD,phongban, mandaychuan, songuoi, songaythuchien, thanhtien, ghichu } = newMDKS //note

	const onChangeNewMDKSForm = event =>
		setNewMDKS({ ...newMDKS, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddMDKSData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addMDKS(newMDKS)
		resetAddMDKSData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddMDKSData = () => {
		setNewMDKS({ 
		TygiaUSD:'',
		phongban: '',
		mandaychuan:'',
		songuoi: '',
		songaythuchien:'',
		thanhtien:'',
		ghichu: ' ' }) //note cần sửa
		setShowAddMDKSModal(false)
	}

	return (
		<Modal show={showAddMDKSModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h6'>Bạn muốn thêm Mandaykysu?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Số này dùng tính thành tiền!
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='22,400'
							name='TygiaUSD'
							required
							aria-describedby='title-help'
							value={TygiaUSD}
							onChange={onChangeNewMDKSForm}
						/>
					</Form.Group>
										
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Phòng ban
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='phongban'
							required
							aria-describedby='title-help'
							value={phongban}
							onChange={onChangeNewMDKSForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Manday chuẩn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='mandaychuan'
							required
							aria-describedby='mandaychuan-help'
							value={mandaychuan}
							onChange={onChangeNewMDKSForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Số người tham gia dự án
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='songuoi'
							required
							aria-describedby='songuoi-help'
							value={songuoi}
							onChange={onChangeNewMDKSForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Nhập số ngày thực hiện
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='songaythuchien'
							required
							aria-describedby='songaythuchien-help'
							value={songaythuchien}
							onChange={onChangeNewMDKSForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={2}
							placeholder=''
							name='ghichu'
							aria-describedby='ghichu-help'
							value={ghichu}
							onChange={onChangeNewMDKSForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddMDKSModal
