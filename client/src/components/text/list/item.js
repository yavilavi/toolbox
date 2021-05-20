import ListGroup from 'react-bootstrap/ListGroup';

const TextListItem = ({ item }) => {
  console.log('algo');
  return (
    <ListGroup.Item className="row">
      <span className="col-11">{item.title}</span>
      <ul className="col-1">
        <li>
          <i className="fas fa-trash" />
        </li>
      </ul>
    </ListGroup.Item>
  );
};

export default TextListItem;
