import ListGroup from 'react-bootstrap/ListGroup';

const TextListItem = ({ item }) => {
  console.log('algo');
  return <ListGroup.Item>{item.title}</ListGroup.Item>;
};

export default TextListItem;
