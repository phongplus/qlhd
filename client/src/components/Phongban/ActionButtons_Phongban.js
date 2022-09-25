import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PhongbanContext } from '../../contexts/PhongbanContext'
import { useContext } from 'react'

const ActionButtons_Phongban = ({ _id }) => {
	const { deletePhongban, findPhongban, setShowUpdatePhongbanModal } = useContext(
		PhongbanContext
	) //goi ActionButtons cho component khác đc kg ???

	const choosePhongban = PhongbanId => {
		findPhongban(PhongbanId)
		setShowUpdatePhongbanModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={choosePhongban.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deletePhongban.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_Phongban
