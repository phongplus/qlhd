import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PhongbanContext } from '../../contexts/PhongbanContext'

const AddPhongbanModal = () => {
	// Contexts
	const {
		showAddPhongbanModal,
		setShowAddPhongbanModal,
		addPhongban,
		setShowToast
	} = useContext(PhongbanContext)

	// State
	const [newPhongban, setNewPhongban] = useState({
		Tenphongban: '',
		Mandaychuan: ''
	})

	const { Tenphongban, Mandaychuan } = newPhongban

	const onChangeNewPhongbanForm = event =>
		setNewPhongban({ ...newPhongban, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPhongbanData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPhongban(newPhongban)
		resetAddPhongbanData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddPhongbanData = () => {
		setNewPhongban({ Tenphongban: '', Mandaychua: '' })
		setShowAddPhongbanModal(false)
	}

	return (
		<Modal show={showAddPhongbanModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn muốn thêm Phòng ban?</Modal.Title>
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
							onChange={onChangeNewPhongbanForm}
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
							onChange={onChangeNewPhongbanForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPhongbanModal
