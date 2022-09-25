import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

const UpdateUserModal = () => {
	// Contexts
	const {
		UserState: { User },
		showUpdateUserModal,
		setShowUpdateUserModal,
		updateUser,
		setShowToast
	} = useContext(UserContext)

	// State
	const [updatedUser, setUpdatedUser] = useState(User)

	useEffect(() => setUpdatedUser(User), [User])

	const { username, password, roleId } = updatedUser //note

	const onChangeUpdatedUserForm = event =>
		setUpdatedUser({ ...updatedUser, [event.target.name]: event.target.value })

	const closeDialog = () => {
		setUpdatedUser(User)
		setShowUpdateUserModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateUser(updatedUser)
		setShowUpdateUserModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddUserData = () => {
	// 	setNewUser({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddUserModal(false)
	// }

	return (
		<Modal show={showUpdateUserModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Cập nhật User ?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='username-help' muted as="h6">
							Username
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='username'
							required
							aria-describedby='username-help'
							value={username}
							onChange={onChangeUpdatedUserForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Password-help' muted  as="h6">
							Password
						</Form.Text>
						<Form.Control
							tpye='password'
							placeholder=''
							name='password'
							value={password} /* tạo ràn buộc số */
							onChange={onChangeUpdatedUserForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='roleId-help' muted  as="h6">
							RoleId
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder=''
							name='roleId'
							value={roleId} /* tạo ràn buộc số */
							onChange={onChangeUpdatedUserForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdateUserModal
