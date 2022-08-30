
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CTHHContext } from '../../contexts/CTHHContext'
import { useContext } from 'react'

const ActionButtons_CTHH = ({ _id }) => {
	const { deleteCTHH, findCTHH, setShowUpdateCTHHModal } = useContext(
		CTHHContext
	) 

	const chooseCTHH = CTHHId => {
		findCTHH(CTHHId)
		setShowUpdateCTHHModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseCTHH.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteCTHH.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_CTHH
