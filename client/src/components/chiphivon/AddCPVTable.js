import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { CPVContext } from '../../contexts/CPVContext'
import { CTHHContext } from '../../contexts/CTHHContext'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';

const AddCPVTable = () => {
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
	let tongthanhtiengiakho =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiakho))//note
	let tongthanhtiengiaban =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiaban))//note
	let VAT = 0.1

	//giatridaura = tongthanhtiengiaban+tongthanhtiengiaban * VAT
	let SotienNTP = tongthanhtiengiakho + tongthanhtiengiakho * VAT


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
		giavon: tongthanhtiengiakho,
		giaban: tongthanhtiengiaban,
		giatridaura: tongthanhtiengiaban+tongthanhtiengiaban*0.1,
		ngay: '',
		diengiai: '',
		sotienKHtra: '',
		sotienTTNTP: tongthanhtiengiakho+tongthanhtiengiakho*0.1,
		sotienhangconno: tongthanhtiengiaban-sotienKHtra,
		songay: '',
		laisuat: '',
		chiphilaivay: '',
		chichu: '' })
		setShowAddCPVModal(false)
	}
	return (
		<Modal size = 'lg' show={showAddCPVModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title as='h5'>Bạn muốn thêm chi phí vốn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Table striped bordered hover show={showAddCPVModal} onHide={closeDialog}>
		
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>
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
							value={giavon.toLocaleString()}
							onChange={onChangeNewCPVForm}
						/>						
					</Form.Group>
		  </td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>
			<Button variant='secondary' onClick={closeDialog}>
						Hủy
			</Button>
		  </td>
          <td>
			<Button variant='primary' type='submit'>
						Thêm!
			</Button>
			</td>
        </tr>
      </tbody>
    </Table>
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

export default AddCPVTable
