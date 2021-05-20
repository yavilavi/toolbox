import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextListItem from './item';
import { fetchTexts } from '../../../redux/actionCreators';

const TextList = () => {
  const items = useSelector((store) => store.textsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTexts());
  }, [dispatch]);
  const mapedItems = items.map((i) => <TextListItem key={i.id} item={i} />);
  return <ListGroup>{mapedItems}</ListGroup>;
};

export default TextList;
