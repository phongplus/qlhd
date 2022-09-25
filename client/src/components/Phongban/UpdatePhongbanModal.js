import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PhongbanContext } from '../../contexts/PhongbanContext'

const UpdatePhongbanModal = () => {
	// Contexts
	const {
		PhongbanState: { Phongban },
		showUpdatePhongbanModal,
		setShowUpdatePhongbanModal,
		updatePhongban,
		setShowToast
	} = useContext(PhongbanContext)

	// State
	const [updatedPhongban, setUpdatedPhongban] = useState(Phongban)

	useEffect(() => setUpdatedPhongban(Phongban), [Phongban])

	const { Tenphongban, Mandaychuan } = updatedPhongban //note

	const onChangeUpdatedPhongbanForm = event =>
		setUpdatedPhongban({ ...updatedPhongban, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedPhongban(Phongban)
		setShowUpdatePhongbanModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePhongban(updatedPhongban)
		setShowUpdatePhongbanModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddPhongbanData = () => {
	// 	setNewPhongban({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddPhongbanModal(false)
	// }

	return (
		<Modal show={showUpdatePhongbanModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Phòng ban ?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='Tenphongban-help' muted as="h6">
							Tên phòng ban
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Tenphongban'
							required
							aria-describedby='Tenphongban-help'
							value={Tenphongban}
							onChange={onChangeUpdatedPhongbanForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Mandaychuan-help' muted  as="h6">
							Mandaychuan
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập số'
							name='Mandaychuan'
							value={Mandaychuan} /* tạo ràn buộc số */
							onChange={onChangeUpdatedPhongbanForm}
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

export default UpdatePhongbanModal
