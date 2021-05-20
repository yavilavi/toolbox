import ListGroup from 'react-bootstrap/ListGroup';
import { Trash, Eye, Pencil } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    dispatch(deleteText(id.replace('delete-', '')));
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
