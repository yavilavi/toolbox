import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextListItem from './item';
import { fetchTexts, setSiteTitle } from '../../../redux/actionCreators';

const TextList = () => {
  const items = useSelector((state) => state.textsList);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const filterHelper = (t) => {
    if (search === '') {
      return true;
    }
    const content = t.content.toLowerCase();
    return content.includes(search);
  };
  useEffect(() => {
    setSiteTitle(dispatch, 'Texts list');
    fetchTexts(dispatch);
  }, [dispatch]);

  const textsList = items.filter(filterHelper).map((i) => <TextListItem key={i.id} item={i} />);

  return <ListGroup>{textsList.length > 0 ? textsList : 'No texts found'}</ListGroup>;
};

export default TextList;
