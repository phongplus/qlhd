import { CTHHContext } from '../contexts/CTHHContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
/* import { useState } from 'react' */
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import AddCTHHModal from '../components/chitiethanghoa/AddCTHHModal'//Note
import UpdateCTHHModal from '../components/chitiethanghoa/UpdateCTHHModal'//Note
import ActionButtons_CTHH from '../components/chitiethanghoa/ActionButtons_CTHH'


import Table from 'react-bootstrap/Table'

const CTHH = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		CTHHState: { CTHH, CTHHs, CTHHsLoading },
		getCTHHs,
		setShowAddCTHHModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(CTHHContext)

	// hàm tính tổng thành tiền
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}

	// Start: Get all CTHHs
	useEffect(() => getCTHHs(), [])

	let body = null
	let stt = 1
	const tongthanhtiengiakho =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiakho))//note
	const tongthanhtiengiaban =  sumArray(CTHHs.map((CTHH) => CTHH.thanhtiengiaban))//note
	if (CTHHsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (CTHHs.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddCTHHModal.bind(this, true)}
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
					<Card.Header as='h1'>CHI TIẾT HÀNG HÓA</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							<thead>
								 <tr>
									<th rowspan="2">STT</th>
									<th rowspan="2" width="15%">Tên hàng</th>
									<th rowspan="2" width="5%">Số lượng </th>
									<th colspan="3">Giá vốn hàng bán Giá kho</th>
									<th colspan="2 ">Doanh số Giá bán</th>
									<th rowspan="2 " width="15%">Ghi chú </th>
									<th rowspan="2">Thao tác</th>
                   				 </tr>
								<tr>
									<th width='8%' as='pre'>Đơn giá FOB <br/>
									(EX-W)</th>
									<th>Đơn giá kho</th>
									<th>Thành tiền</th>
									<th>Đơn giá bán</th>
									<th>Thành tiền</th>
								</tr>
							</thead>
							<tbody>
								{CTHHs.map(CTHH => ( 
								<tr key={CTHH._id} >
									<td>{stt++}  </td>
									<td>{CTHH.tenhang}</td>
									<td>{CTHH.soluong.toLocaleString()}</td>
									<td>{CTHH.dongiaFOB.toLocaleString()}</td>
									<td>{CTHH.dongiakho.toLocaleString()}</td>
									<td>{CTHH.thanhtiengiakho.toLocaleString()}</td>
									<td>{CTHH.dongiaban.toLocaleString()}</td>
									<td>{CTHH.thanhtiengiaban.toLocaleString()}</td>
									<td>{CTHH.ghichu}  </td>
									<td>
									<ActionButtons_CTHH _id={CTHH._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td>{tongthanhtiengiakho.toLocaleString()}</td>
									<td></td>
									<td>{tongthanhtiengiaban.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddCTHHModal.bind(this, true)}
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
			<AddCTHHModal />
			{CTHH !== null && <UpdateCTHHModal />}
			{/* After CTHH is added, show toast */}
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

export default CTHH
