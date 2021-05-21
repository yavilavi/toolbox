import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TextEditor from '../editor';
import { saveText, setSiteTitle } from '../../../redux/actionCreators';

const TextCreate = () => {
  const content = useSelector((store) => store.textContent);
  const dispatch = useDispatch();

  const submitText = () => {
    dispatch(saveText(content));
  };

  useEffect(() => {
    setSiteTitle(dispatch, 'Creating a new text');
  }, [dispatch]);
  return (
    <>
      <Card.Body>
        <TextEditor />
      </Card.Body>
      <Card.Footer>
        <Button variant="success" type="button" onClick={submitText}>
          Save text
        </Button>
      </Card.Footer>
    </>
  );
};

export default TextCreate;
