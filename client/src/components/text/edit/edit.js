import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextEditor from '../editor';
import { editText, instantiateAxios, setSiteTitle } from '../../../redux/actionCreators';

const TextEdit = () => {
  const { textId } = useParams();
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const content = useSelector((store) => store.textContent);

  useEffect(() => {
    setSiteTitle(dispatch, `Editing text ID: ${textId}`);
    const serverPetition = instantiateAxios();
    serverPetition
      .get(`texts/get/${textId}`)
      .then(({ data }) => {
        setText(data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [dispatch, textId]);

  const submitText = () => {
    dispatch(editText(textId, content));
  };
  return (
    <>
      <Card.Body>
        <TextEditor text={text} />
      </Card.Body>
      <Card.Footer>
        <Button variant="success" type="button" onClick={submitText}>
          Save text
        </Button>
      </Card.Footer>
    </>
  );
};

export default TextEdit;
