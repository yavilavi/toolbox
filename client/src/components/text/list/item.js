import ListGroup from 'react-bootstrap/ListGroup';
import { Trash, Eye } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

const TextListItem = ({ item }) => (
  <ListGroup.Item className="d-flex flex-row justify-content-between">
    <span>{item.title}</span>
    <div>
      <Button variant="info">
        <Eye />
      </Button>
      &nbsp;
      <Button variant="danger">
        <Trash />
      </Button>
    </div>
  </ListGroup.Item>
);

export default TextListItem;
