import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { CPTBLContext } from '../../contexts/CPTBLContext'

const AddCPTBLModal = () => {
	// Contexts
	const {
		showAddCPTBLModal,
		setShowAddCPTBLModal,
		addCPTBL,
		setShowToast
	} = useContext(CPTBLContext)

	// State
	const [newCPTBL, setNewCPTBL] = useState({
		noidung: '',
		giatrithubaolanh:'',
		sothang: '',
		tilephi:'',
		thanhtien:'',
		ghichu: ''
	})

	const { noidung, giatrithubaolanh, sothang, tilephi, thanhtien, ghichu } = newCPTBL

	const onChangeNewCPTBLForm = event =>
		setNewCPTBL({ ...newCPTBL, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddCPTBLData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCPTBL(newCPTBL)
		resetAddCPTBLData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddCPTBLData = () => {
		setNewCPTBL({ noidung: '',
		giatrithubaolanh:'',
		sothang: '',
		tilephi:'',
		thanhtien:'',
		ghichu: ' ' })
		setShowAddCPTBLModal(false)
	}

	return (
		<Modal show={showAddCPTBLModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h5'>Bạn muốn thêm chi phí thư bảo lãnh?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='noidung'
							required
							aria-describedby='noidung-help'
							value={noidung}
							onChange={onChangeNewCPTBLForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Giá trị thư bảo lãnh
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='giatrithubaolanh'
							required
							aria-describedby='gttbl-help'
							value={giatrithubaolanh}
							onChange={onChangeNewCPTBLForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='gttbl-help' muted as='h6'>
							Số tháng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='sothang'
							required
							aria-describedby='sothang-help'
							value={sothang}
							onChange={onChangeNewCPTBLForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='tilephi-help' muted as='h6'>
							Tỉ lệ phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='0.02'
							name='tilephi'
							required
							aria-describedby='tilephi-help'
							value={tilephi}
							onChange={onChangeNewCPTBLForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as='h6'>
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Ghi chú'
							name='ghichu'
							required
							aria-describedby='ghichu-help'
							value={ghichu}
							onChange={onChangeNewCPTBLForm}
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

export default AddCPTBLModal
