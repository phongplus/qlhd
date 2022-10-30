import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { CPVContext } from '../../contexts/CPVContext'

const AddCPVModal = () => {
	// Contexts
	const {
		showAddCPVModal,
		setShowAddCPVModal,
		addCPV,
		setShowToast
	} = useContext(CPVContext)

	// State
	const [newCPV, setNewCPV] = useState({
		giavon: '',
		giaban: '',
		giatridaura: '',
		ngay: '',
		diengiai: '',
		sotienKHtra: '',
		sotienTTNTP: '',
		sotienhangconno: '',
		songay: '',
		laisuat: '',
		chiphilaivay: '',
		chichu: ''
	})

	const { giavon,giaban,giatridaura,ngay,diengiai,sotienKHtra,sotienTTNTP,sotienhangconno,songay,laisuat,chiphilaivay,ghichu } = newCPV

	const onChangeNewCPVForm = event =>
		setNewCPV({ ...newCPV, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddCPVData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCPV(newCPV)
		resetAddCPVData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddCPVData = () => {
		setNewCPV({ 
			giavon: '',
			giaban: '',
			giatridaura: '',
			ngay: '',
			diengiai: '',
			sotienKHtra: '',
			sotienTTNTP: '',
			sotienhangconno: '',
			songay: '',
			laisuat: '',
			chiphilaivay: '',
			chichu: ''
		 })
		setShowAddCPVModal(false)
	}

	return (
		<Modal show={showAddCPVModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h5'>Bạn muốn thêm chi phí vốn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='giavon' muted as='h6'>
							Giá vốn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='giavon'
							required
							aria-describedby='giavon'
							value={giavon}
							onChange={onChangeNewCPVForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='giaban' muted as='h6'>
							Giá bán
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='giaban'
							required
							aria-describedby='giaban'
							value={giaban.toLocaleString()}
							onChange={onChangeNewCPVForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='giatridaura' muted as='h6'>
							Giá trị đầu ra = Giá bán + % VAT
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='nhập % VAT'
							name='giatridaura'
							required
							aria-describedby='giatridaura'
							value={giatridaura.toLocaleString()}
							onChange={onChangeNewCPVForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotienKHtra' muted as='h6'>
							Số tiền Khách hàng trả = (Tổng giá bán + VAT)* tỷ lệ % KH trả
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập tỷ lệ %'
							name='sotienKHtra'
							required
							aria-describedby='sotienKHtra'
							value={sotienKHtra}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ngay' muted as='h6'>
							Ngày bán
						</Form.Text>
						<Form.Control
							type='date'
							placeholder='ngay'
							name='ngay'
							required
							aria-describedby='ngay'
							value={ngay}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='diengiai' muted as='h6'>
							Diễn giải
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='diengiai'
							name='diengiai'
							required
							aria-describedby='diengiai'
							value={diengiai}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					
					<Form.Group>
						<Form.Text id='sotienTTNTP' muted as='h6'>
							Số tiền TT NTP = Giá vốn + VAT
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='sotienTTNTP'
							name='sotienTTNTP'
							required
							aria-describedby='sotienTTNTP'
							value={sotienTTNTP}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotienhangconno' muted as='h6'>
							Số tiền hàng còn nợ = TTNTP - Số tiền KH trả
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='sotienhangconno'
							name='sotienhangconno'
							required
							aria-describedby='sotienhangconno'
							value={sotienhangconno}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='songay' muted as='h6'>
							Số ngày
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='songay'
							name='songay'
							required
							aria-describedby='songay'
							value={songay}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='laisuat' muted as='h6'>
							Lãi suất
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='laisuat'
							name='laisuat'
							required
							aria-describedby='laisuat'
							value={laisuat}
							onChange={onChangeNewCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='chiphilaivay' muted as='h6'>
							Chi phí lãi vay = (Lãi xuất * Số ngày * Số tiền hàng còn nợ)/365
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='chiphilaivay'
							name='chiphilaivay'
							required
							aria-describedby='chiphilaivay'
							value={chiphilaivay}
							onChange={onChangeNewCPVForm}
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
							onChange={onChangeNewCPVForm}
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

export default AddCPVModal
