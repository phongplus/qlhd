import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { MDKSContext } from '../../contexts/MDKSContext'
import { useContext } from 'react'

const ActionButtons_MDKS = ({ _id }) => {
	const { deleteMDKS, findMDKS, setShowUpdateMDKSModal } = useContext(
		MDKSContext
	) 

	const chooseMDKS = MDKSId => {
		findMDKS(MDKSId)
		setShowUpdateMDKSModal(true)
	}

	return (
		<>
			
			<Button className='post-button' onClick={chooseMDKS.bind(this, _id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button' onClick={deleteMDKS.bind(this, _id)}>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default ActionButtons_MDKS
