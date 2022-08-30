import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CPTBLContext } from '../../contexts/CPTBLContext'

const UpdateCPTBLModal = () => {
	// Contexts
	const {
		CPTBLState: { CPTBL },
		showUpdateCPTBLModal,
		setShowUpdateCPTBLModal,
		updateCPTBL,
		setShowToast
	} = useContext(CPTBLContext)

	// State
	const [updatedCPTBL, setUpdatedCPTBL] = useState(CPTBL)

	useEffect(() => setUpdatedCPTBL(CPTBL), [CPTBL])

	const { noidung, giatrithubaolanh, sothang, tilephi, thanhtien, ghichu } = updatedCPTBL

	const onChangeUpdatedCPTBLForm = event =>
		setUpdatedCPTBL({ ...updatedCPTBL, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCPTBL(CPTBL)
		setShowUpdateCPTBLModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCPTBL(updatedCPTBL)
		setShowUpdateCPTBLModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddCPTBLData = () => {
	// 	setNewCPTBL({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddCPTBLModal(false)
	// }

	return (
		<Modal show={showUpdateCPTBLModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí thư bảo lãnh?</Modal.Title>
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
							onChange={onChangeUpdatedCPTBLForm}
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
							value={giatrithubaolanh.toLocaleString()}
							onChange={onChangeUpdatedCPTBLForm}
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
							onChange={onChangeUpdatedCPTBLForm}
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
							onChange={onChangeUpdatedCPTBLForm}
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
							onChange={onChangeUpdatedCPTBLForm}
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

export default UpdateCPTBLModal
