import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
import Table from 'react-bootstrap/Table';

const TablePost = ({ post: { _id, status, title, description, url } }) => {
  return (
   
        <tr>
          <td>{_id}</td>
          <td>{status}</td>
          <td>{title}</td>
          <td>{description}</td>
		      <td>{url}</td>
          <td><ActionButtons/></td>

        </tr>
  );
}
/* const TableChiphikhac = ({ post: { _id, status, title, description, url } }) => {
  return (
   
        <tr>
          <td>{_id}</td>
          <td>{status}</td>
          <td>{title}</td>
          <td>{description}</td>
		  <td>{url}</td>
        </tr>
     

  );
} 
 export default{
  TablePost,
  TableChiphikhac,
 }; */
export default TablePost;