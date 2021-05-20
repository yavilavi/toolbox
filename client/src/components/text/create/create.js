import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../editor';
import { saveText } from '../../../redux/actionCreators';

const TextCreate = () => {
  const content = useSelector((store) => store.textContent);
  const dispatch = useDispatch();

  const submitText = () => {
    dispatch(saveText(content));
  };
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
