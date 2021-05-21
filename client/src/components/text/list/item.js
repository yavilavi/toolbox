import { Button, ListGroup } from 'react-bootstrap';
import { Trash, Eye, Pencil } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteText } from '../../../redux/actionCreators';

const TextListItem = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const launchTextView = (e) => {
    const { id } = e.currentTarget;
    history.push(`/view-text/${id}`);
  };
  const launchEditView = (e) => {
    const { id } = e.currentTarget;
    history.push(`/edit-text/${id}`);
  };
  const fireTextDeletion = (e) => {
    const { id } = e.currentTarget;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteText(id.replace('delete-', '')));
      }
    });
  };
  return (
    <ListGroup.Item className="d-flex flex-row justify-content-between">
      <span>{item.title}</span>
      <div>
        <Button variant="warning" id={item.id} onClick={launchEditView}>
          <Pencil />
        </Button>
        &nbsp;
        <Button variant="info" id={item.id} onClick={launchTextView}>
          <Eye />
        </Button>
        &nbsp;
        <Button variant="danger" id={`delete-${item.id}`} onClick={fireTextDeletion}>
          <Trash />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TextListItem;
