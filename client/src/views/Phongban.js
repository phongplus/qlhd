import { PhongbanContext } from '../contexts/PhongbanContext'//Note GET DELETE
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

import ActionButtons_Phongban from '../components/Phongban/ActionButtons_Phongban'
import AddPhongbanModal from '../components/Phongban/AddPhongbanModal'//Note
import UpdatePhongbanModal from '../components/Phongban/UpdatePhongbanModal'//Note

import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'

const Phongban = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		PhongbanState: { Phongban, Phongbans, PhongbansLoading },
		getPhongbans,
		setShowAddPhongbanModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PhongbanContext)

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

	// Start: Get all Phongbans
	useEffect(() => getPhongbans(), [])

	let body = null
	let stt = 1
	//const tong =  sumArray(Phongbans.map((Phongban) => Phongban.sotien))
	if (PhongbansLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (Phongbans.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>QUẢN PHÒNG BAN</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ Phongban</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPhongbanModal.bind(this, true)}
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
					<Card.Header as='h2'>QUẢN PHÒNG BAN </Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Tên Phòng Ban</th>
								<th>Manday Chuẩn</th>
								</tr>
							</thead>
							<tbody>
								{Phongbans.map(Phongban => ( 
								<tr key={Phongban._id} >
									<td>{stt++}  </td>
									<td>{Phongban.Tenphongban}</td>
									<td>{Phongban.Mandaychuan}</td>
									<td>
									<ActionButtons_Phongban _id={Phongban._id} />
									</td>
								
								</tr>
								
								))
								}
								
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddPhongbanModal.bind(this, true)}
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
			<AddPhongbanModal />
			{Phongban !== null && <UpdatePhongbanModal />}
			{/* After Phongban is added, show toast */}
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

export default Phongban
