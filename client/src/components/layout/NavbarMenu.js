import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import logoutIcon from '../../assets/logout.svg'
/* import NavDropdown from 'react-bootstrap/NavDropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import learnItLogo from '../../assets/logo.svg'*/
import Button from 'react-bootstrap/Button' 
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<>
			<Navbar expand='sm' bg='info' variant='dark' className='shadow'>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/PTHD'
							as={Link}
						>
							PTHĐ
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/chitiethanghoa'
							as={Link}
						>
							CT Hàng hóa
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/chiphivon'
							as={Link}
						>
							CP Vốn
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/chiphitrienkhai'
							as={Link}
						>
							CP Triển khai
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/mandaykysu'
							as={Link}
						>
							Manday Kỹ sư
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/chiphibaolanh'
							as={Link}
						>
							CP Thư bảo lãnh
						</Nav.Link>
						<Nav.Link
							className='font-weight-bolder text-white'
							to='/chiphikhac'
							as={Link}
						>
							CP Khác
						</Nav.Link>
					</Nav>
					<Dropdown>
						<Dropdown.Toggle id="dropdown-button-dark-example1" variant="info">
						Xin chào {username}
						</Dropdown.Toggle>
						<Dropdown.Menu variant="primary">
							<Dropdown.Item to='/user'as={Link}>
								Thông tin tài khoản
							</Dropdown.Item>
							<Dropdown.Item href="#/action-2">Đổi mật khẩu</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={logout} active>
								<img
								src={logoutIcon}
								alt='logoutIcon'
								width='18'
								height='18'
								className='mr-2'
								/>
								Đăng xuất
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Navbar.Collapse>
			</Navbar>

		</>
	)
}

export default NavbarMenu
