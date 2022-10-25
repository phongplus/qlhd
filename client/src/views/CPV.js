
import { CPVContext } from '../contexts/CPVContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { CTHHContext } from '../contexts/CTHHContext'

import { useContext, useEffect } from 'react'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'

import AddCPVModal from '../components/chiphivon/AddCPVModal'//Note
import AddCPVTable from '../components/chiphivon/AddCPVTable'//Note
import UpdateCPVModal from '../components/chiphivon/UpdateCPVModal'//Note
import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
import ActionButtons_CPV from '../components/chiphivon/ActionButtons_CPV'

const CPV = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		CPVState: { CPV, CPVs, CPVsLoading },
		getCPVs,
		setShowAddCPVModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(CPVContext)

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
	//Định dạng hiển thị số
	function formatCash(str) {
 	return str.split('').reverse().reduce((prev, next, index) => {
 		return ((index % 3) ? next : (next + ',')) + prev
 	})
	}
	// Start: Get all CPVs
	useEffect(() => getCPVs(), [])
	// Start: Get all CTHHs
	useEffect(() => getCTHHs(), [])

	const Giavon =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiakho))//note
	let Giaban =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiaban))//note
	let Giatridaura = Giaban * 0.1
	let body = null
	let stt = 1
	const tong =  sumArray(CPVs.map((CPV) => CPV.giavon))//note
	if (CPVsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (CPVs.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 2: Chi phí vốn</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu vui lòng click Thêm!</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddCPVModal.bind(this, true)}
						>
							Thêm!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 2: Chi phí vốn</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead>
								<tr>
									<th colspan="5">Giá vốn: {Giavon.toLocaleString()} </th>
									<th colspan="5">Giá bán: {Giaban.toLocaleString()} </th>									
								</tr>
								<tr>
									<th colspan="5">Số tiền TT NTP = Giá vốn + 10%VAT: {Giavon} + {Giavon*0.1} = {(Giavon+Giavon*0.1).toLocaleString()}  </th>
									<th colspan="5">Giá trị đầu ra:{Giaban} + {Giaban*0.1} = {(Giaban+Giatridaura).toLocaleString()}</th>
								</tr>								
								<tr>
									<th>STT</th>
									<th>Ngày</th>
									<th width='15%'>Diễn giải</th>
									<th> Số tiền KH trả </th>
									<th> Số tiền hàng còn nợ </th>
									<th> Số ngày </th>
									<th> Lãi suất </th>
									<th> Chi phí lãi vay </th>
									<th width='20%'>Ghi chú</th>
									<th> Thao tác </th>
								</tr>
							</thead>
							<tbody>
								{CPVs.map(CPV => ( 
								<tr key={CPV._id} >
									<td>{stt++}  </td>
									<td>{CPV.ngay}</td>
									<td>{CPV.diengiai}</td>
									<td>{(CPV.sotienKHtra).toLocaleString()}</td>
									<td>{CPV.sotienhangconno}</td>
									<td>{CPV.songay}</td>
									<td>{CPV.laisuat}</td>
									<td>{CPV.chiphilaivay}</td>
									<td>{CPV.ghichu}  </td>
									<td>
									<ActionButtons_CPV _id={CPV._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td>{tong.toLocaleString()}</td>
									<td>{Giavon.toLocaleString()}</td>
									<td>{Giaban.toLocaleString()}</td>
									<td></td>
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddCPVModal.bind(this, true)}
						>
							Thêm mới
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	}

	return (
		<>
			{body}
			<AddCPVTable/>
			{CPV !== null && <UpdateCPVModal />}
			{/* After CPV is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default CPV
