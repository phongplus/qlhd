import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CTHHContext } from '../../contexts/CTHHContext'

const UpdateCTHHModal = () => {
	// Contexts
	const {
		CTHHState: { CTHH },
		showUpdateCTHHModal,
		setShowUpdateCTHHModal,
		updateCTHH,
		setShowToast
	} = useContext(CTHHContext)

	// State
	const [updatedCTHH, setUpdatedCTHH] = useState(CTHH)

	useEffect(() => setUpdatedCTHH(CTHH), [CTHH])

	const {  tenhang, soluong, dongiaFOB, dongiakho, thanhtiengiakho, dongiaban, thanhtiengiaban,  ghichu } = updatedCTHH //note

	const onChangeUpdatedCTHHForm = event =>
		setUpdatedCTHH({ ...updatedCTHH, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCTHH(CTHH)
		setShowUpdateCTHHModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCTHH(updatedCTHH)
		setShowUpdateCTHHModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddCTHHData = () => {
	// 	setNewCTHH({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddCTHHModal(false)
	// }

	return (
		<Modal show={showUpdateCTHHModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật Hàng Hóa ?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='tenhang-help' muted as='h6'>
							Tên hàng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='tenhang'
							name='tenhang'
							required
							aria-describedby='tenhang-help'
							value={tenhang}
							onChange={onChangeUpdatedCTHHForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='soluong-help' muted as='h6'>
							Số lượng
						</Form.Text>						
						<Form.Control
							type='text'
							placeholder='Số lượng'
							name='soluong'
							required
							aria-describedby='soluong-help'
							value={soluong}
							onChange={onChangeUpdatedCTHHForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='title-help' muted as='h6'>
							Đơn giá FOB
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá FOB'
							name='dongiaFOB'
							required
							aria-describedby='dongiaFOB-help'
							value={dongiaFOB}
							onChange={onChangeUpdatedCTHHForm}
						/>
						</Form.Group>
					<Form.Group>
						<Form.Text id='dongiakho-help' muted as='h6'>
							Đơn giá kho
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá kho'
							name='dongiakho'
							required
							aria-describedby='dongiakho-help'
							value={dongiakho}
							onChange={onChangeUpdatedCTHHForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='dongiaban-help' muted as='h6'>
							Đơn giá bán
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Đơn giá bán'
							name='dongiaban'
							required
							aria-describedby='dongiaban-help'
							value={dongiaban}
							onChange={onChangeUpdatedCTHHForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='Ghichu-help' muted as='h6'>
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
							onChange={onChangeUpdatedCTHHForm}
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

export default UpdateCTHHModal
