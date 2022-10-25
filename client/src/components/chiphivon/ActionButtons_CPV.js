import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { CPVContext } from '../../contexts/CPVContext'
import { useContext } from 'react'

const ActionButtons_CPV = ({ _id }) => {
	const { deleteCPV, findCPV, setShowUpdateCPVModal } = useContext(
		CPVContext
	) //goi ActionButtons cho component khác đc kg ???

	const chooseCPV = CPVId => {
		findCPV(CPVId)
		setShowUpdateCPVModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseCPV.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteCPV.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_CPV
