import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { CPVContext } from '../../contexts/CPVContext'
import { CTHHContext } from '../../contexts/CTHHContext'
import { useEffect } from 'react'

const UpdateCPVModal = () => {
	// Contexts
	const {
		CPVState: { CPV },
		showUpdateCPVModal,
		setShowUpdateCPVModal,
		updateCPV,
		setShowToast
	} = useContext(CPVContext)

	// State
	const [updatedCPV, setUpdatedCPV] = useState(CPV)

	useEffect(() => setUpdatedCPV(CPV), [CPV])

	const {giavon,giaban,giatridaura,ngay,diengiai,sotienKHtra,sotienTTNTP,sotienhangconno,songay,laisuat,chiphilaivay,ghichu } = updatedCPV
/*Lấy giá vốn, Gia bán từ model Chitiet hàng hóa*/

	const {
		CTHHState: { CTHH, CTHHs, CTHHsLoading },
		getCTHHs,
	} = useContext(CTHHContext)	
	// hàm tính tổng 
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}
	// Start: Get all CTHHs
	useEffect(() => getCTHHs(), [])
	const tongthanhtiengiakho =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiakho))//note
	let tongthanhtiengiaban =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiaban))//note
	let VAT = 0.1
	let Giatridaura = tongthanhtiengiaban+tongthanhtiengiaban * VAT
	let SotienTTNTP = tongthanhtiengiakho + tongthanhtiengiakho * VAT
	let STHCN = SotienTTNTP - sotienKHtra
	/*End Lấy giá vốn, Gia bán từ model Chitiet hàng hóa*/

	const onChangeUpdatedCPVForm = event =>
		setUpdatedCPV({ ...updatedCPV, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedCPV(CPV)
		setShowUpdateCPVModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateCPV(updatedCPV)
		setShowUpdateCPVModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddCPVData = () => {
	// 	setNewCPV({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddCPVModal(false)
	// }

	return (
		<Modal show={showUpdateCPVModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật chi phí thư bảo lãnh?</Modal.Title>
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
							onChange={onChangeUpdatedCPVForm}
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
							value={giaban}
							onChange={onChangeUpdatedCPVForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='giatridaura' muted as='h6'>
							Giá trị đầu ra
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập số'
							name='giatridaura'
							required
							aria-describedby='giatridaura'
							value={Giatridaura}
							onChange={onChangeUpdatedCPVForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='ngay' muted as='h6'>
							Ngày bán
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ngay'
							required
							aria-describedby='ngay'
							value={ngay}
							onChange={onChangeUpdatedCPVForm}
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
							onChange={onChangeUpdatedCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotienKHtra' muted as='h6'>
							Số tiền Khách hàng trả
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='sotienKHtra'
							name='sotienKHtra'
							required
							aria-describedby='sotienKHtra'
							value={sotienKHtra}
							onChange={onChangeUpdatedCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotienTTNTP' muted as='h6'>
							Số tiền TT NTP
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='sotienTTNTP'
							name='sotienTTNTP'
							required
							aria-describedby='sotienTTNTP'
							value={SotienTTNTP}
							onChange={onChangeUpdatedCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotienhangconno' muted as='h6'>
							Số tiền hàng còn nợ
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='sotienhangconno'
							name='sotienhangconno'
							required
							aria-describedby='sotienhangconno'
							value={sotienhangconno}
							onChange={onChangeUpdatedCPVForm}
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
							onChange={onChangeUpdatedCPVForm}
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
							onChange={onChangeUpdatedCPVForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='chiphilaivay' muted as='h6'>
							Chi phí lãi vay
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='chiphilaivay'
							name='chiphilaivay'
							required
							aria-describedby='chiphilaivay'
							value={chiphilaivay}
							onChange={onChangeUpdatedCPVForm}
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
							onChange={onChangeUpdatedCPVForm}
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

export default UpdateCPVModal
