import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextListItem from './item';
import { fetchTexts } from '../../../redux/actionCreators';

const TextList = () => {
  const items = useSelector((store) => store.textsList);
  const search = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const filterHelper = (t) => {
    if (search === '') {
      return true;
    }
    const content = t.content.toLowerCase();
    return content.includes(search);
  };

  useEffect(() => {
    fetchTexts(dispatch);
  }, [dispatch]);

  const textsList = items.filter(filterHelper).map((i) => <TextListItem key={i.id} item={i} />);

  return <ListGroup>{textsList.length > 0 ? textsList : 'No texts found'}</ListGroup>;
};

export default TextList;
