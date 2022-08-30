import { CPTBLContext } from '../contexts/CPTBLContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
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

import AddCPTBLModal from '../components/chiphithubaolanh/AddCPTBLModal'//Note
import UpdateCPTBLModal from '../components/chiphithubaolanh/UpdateCPTBLModal'//Note
import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
import ActionButtons_CPTBL from '../components/chiphithubaolanh/ActionButtons_CPTBL'
const CPTBL = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		CPTBLState: { CPTBL, CPTBLs, CPTBLsLoading },
		getCPTBLs,
		setShowAddCPTBLModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(CPTBLContext)

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

	// Start: Get all CPTBLs
	useEffect(() => getCPTBLs(), [])

	let body = null
	let stt = 1
	const tong =  sumArray(CPTBLs.map((CPTBL) => CPTBL.thanhtien))//note
	if (CPTBLsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (CPTBLs.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu vui lòng click Thêm!</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddCPTBLModal.bind(this, true)}
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
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead>
								<tr>
								<th>STT</th>
								<th>Nội dung </th>
								<th>Giá trị thư bảo lãnh</th>
								<th>Số tháng bảo lãnh</th>
								<th>Tỉ lệ phí</th>
								<th>Thành tiền</th>
								<th width='20%'>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{CPTBLs.map(CPTBL => ( 
								<tr key={CPTBL._id} >
									<td>{stt++}  </td>
									<td>{CPTBL.noidung}</td>
									<td>{CPTBL.giatrithubaolanh.toLocaleString()}</td>
									<td>{CPTBL.sothang}</td>
									<td>{CPTBL.tilephi}</td>
									<td>{CPTBL.thanhtien.toLocaleString()}</td>
									<td>{CPTBL.ghichu}  </td>
									<td>
									<ActionButtons_CPTBL _id={CPTBL._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td>{tong.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddCPTBLModal.bind(this, true)}
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
			<AddCPTBLModal />
			{CPTBL !== null && <UpdateCPTBLModal />}
			{/* After CPTBL is added, show toast */}
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

export default CPTBL
