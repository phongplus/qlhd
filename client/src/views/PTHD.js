import { CTHHContext } from '../contexts/CTHHContext'//Có sử dụng dữ liệu CTHH
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

const PTHD = () => {
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
					<Card.Header as='h1'>BẢNG PHÂN TÍCH HIỆU QUẢ HỢP ĐỒNG/DỰ ÁN</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							<thead>
								<tr className='text-left'> 
									Phòng:
								</tr>
								<tr className='text-left'>
									Khách hàng:
								</tr>
								<tr className='text-left'>
									Số hợp đồng/PO :
								</tr>
								<tr className='text-left'>
									Ngày… tháng… năm 2016:
								</tr>
								 <tr>
									<th rowspan="2">STT</th>
									<th rowspan="2" width="15%">Tên hàng (chi tiết)</th>
									<th rowspan="2" width="5%">Số lượng </th>
									<th colspan="3">Giá vốn hàng bán Giá kho </th>
									<th colspan="2 ">Doanh số Giá bán</th>
									<th rowspan="2 " width="15%">Ghi chú (Nơi mua hàng, thời gian nhập hàng,...)</th>
                   				 </tr>
								<tr>
									<th width='8%' as='pre'>Đơn giá FOB <br/>
									(EX-W)</th>
									<th>Đơn giá kho (VNĐ)</th>
									<th>Thành tiền (VNĐ)</th>
									<th>Đơn giá bán (VNĐ)</th>
									<th>Thành tiền(VNĐ)</th>
								</tr>
							</thead>
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
								</tr>
								
								))
								}
								<tr>
									<th colSpan={5} >Tổng</th>
									<th>{tongthanhtiengiakho.toLocaleString()}</th>
									<th></th>
									<th>{tongthanhtiengiaban.toLocaleString()}</th>
									<th></th>
								</tr>
	
								<tr>
									<th>1</th>
									<th colSpan={6} className='text-left'>Chi phí phát sinh khi thực hiện Dự Án</th>
									<th> 248.358.058 </th>
									<th>Ghi chú</th>
								</tr>
								<tr>
									<th>1.1</th>
									<th colSpan={6} className='text-left'>Chi phí triển khai hợp đồng</th>
									<th> 4.191.600 </th>
									<th>Ghi chú</th>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'> + Chi phí bảo hành (trích cho TT HSC)</td>
									<td>4.191.600</td>
									<td> Tổng giá bán * 0.6 </td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'>  + Chi phí triển khai (công tác phí, phí KS,…)</td>
									<td>  </td>
									<td>Nếu chi phí triển khai phức tạp thì lấy số tổng bên sheet :"Chi tiet CP trien khai"</td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'>  + Chi phí tiếp khách</td>
									<td> </td>
									<td>Phải có dự trù và được BGĐ duyệt trước khi chi</td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'> + Chi phí vận chuyển</td>
									<td>  </td>
									<td>Phải có chi tiết dự kiến đính kèm</td>
								</tr>
								<tr>
									<th>1.2</th>
									<th colSpan={6} className='text-left'>Chi phí vốn</th>
									<th> Xem công thức </th>
									<th> </th>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Số ngày hàng tồn kho</td>
									<td> 30 </td>
									<td> </td>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Số ngày triển khai</td>
									<td> 20 </td>
									<td> </td>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Số ngày công nợ nhà cung cấp</td>
									<td> 20 </td>
									<td> </td>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Số ngày thu nợ</td>
									<td> 15 </td>
									<td> </td>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Khách hàng trả trước (đặt cọc)</td>
									<td> 209.580.000</td>
									<td> Tổng giá bán * 30% </td>
								</tr>
								<tr>
									<td> </td>
									<td colSpan={6} className='text-left'> + Đặt cọc cho NTP</td>
									<td> 53.770.000 </td>
									<td> Tổng giá kho * 10% </td>
								</tr>
								<tr>
									<th>1.3</th>
									<th colSpan={6} className='text-left'>Manday thực hiện của kỹ sư HPT tham gia </th>
									<th> 207.424.000  </th>
									<th>Tổng Mandaykysu</th>
								</tr>
								<tr>
									<th>1.4</th>
									<th colSpan={6} className='text-left'>Chi phí làm thư bảo lãnh (BL dự thầu, BL thực hiện HĐ, BL BH)</th>
									<th> 21.000.000 </th>
									<th>Xem cách tính chi tiết ở sheet :"CP làm thư bảo lãnh"</th>
								</tr>
								<tr>
									<th>1.5</th>
									<th colSpan={6} className='text-left'>Chi phí khác</th>
									<th> 9.000.000 </th>
									<th>Sheet :"Chi phí khác"</th>
								</tr>
								<tr>
									<th>2</th>
									<th colSpan={6} className='text-left'>Chi phí mua vật tự dự kiến</th>
									<th> 698.600 </th>
									<th>(tổng giá bán*1%)/10</th>
								</tr>
								<tr>
									<th>3</th>
									<th colSpan={6} className='text-left'>Hiệu quả dự án (giá trị tuyệt đối)</th>
									<th> -94.444.058 </th>
									<th>Tổng giá bán - tổng giá kho - 1 - 2*10 </th>
								</tr>
								<tr>
									<th>4</th>
									<th colSpan={6} className='text-left'>Hiệu quả dự án (tỉ lệ trên doanh thu)</th>
									<th> -13,52%</th>
									<th>3/Tổng giá bán</th>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'>Hiệu quả dự án (chưa trừ  Manday của kỹ sư HPT)</td>
									<td> 112.979.942 </td>
									<td> =3+1.3</td>
								</tr>
								<tr>
									<td></td>
									<td colSpan={6} className='text-left'>Hiệu quả dự án (tỉ lệ trên doanh thu) - chưa trừ Manday của kỹ sư HPT</td>
									<td> 16.17% </td>
									<td> Hiệu quả dự án/tổng giá bán</td>
								</tr>
								<tr>
									<th colSpan={6} className='text-right'>Incentive:</th>
									<th colSpan={2} className='text-right'>30.000.000</th>
									<th></th>
								</tr>
								<tr>
									<th colSpan={6} className='text-right'>Hiệu quả dự án (có Incentive)</th>
									<th colSpan={2} className='text-right'>20%</th>
									<th></th>
								</tr>
    					</Table>
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

export default PTHD
