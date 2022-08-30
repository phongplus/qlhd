import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { MDKSContext } from '../../contexts/MDKSContext'

const UpdateMDKSModal = () => {
	// Contexts
	const {
		MDKSState: { MDKS },
		showUpdateMDKSModal,
		setShowUpdateMDKSModal,
		updateMDKS,
		setShowToast
	} = useContext(MDKSContext)

	// State
	const [updatedMDKS, setUpdatedMDKS] = useState(MDKS)

	useEffect(() => setUpdatedMDKS(MDKS), [MDKS])

	const { hesotinhthanhtien,phongban, mandaychuan, songuoi, songaythuchien, thanhtien, ghichu } = updatedMDKS //note

	const onChangeUpdatedMDKSForm = event =>
		setUpdatedMDKS({ ...updatedMDKS, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedMDKS(MDKS)
		setShowUpdateMDKSModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateMDKS(updatedMDKS)
		setShowUpdateMDKSModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddMDKSData = () => {
	// 	setNewMDKS({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddMDKSModal(false)
	// }

	return (
		<Modal show={showUpdateMDKSModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Manday kỹ sư?</Modal.Title>
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
							name='hesotinhthanhtien'
							required
							aria-describedby='title-help'
							value={hesotinhthanhtien}
							onChange={onChangeUpdatedMDKSForm}
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
							onChange={onChangeUpdatedMDKSForm}
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
							onChange={onChangeUpdatedMDKSForm}
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
							onChange={onChangeUpdatedMDKSForm}
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
							onChange={onChangeUpdatedMDKSForm}
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
							required
							aria-describedby='ghichu-help'
							value={ghichu}
							onChange={onChangeUpdatedMDKSForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdateMDKSModal
