import Card from 'react-bootstrap/card';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import TextEditor from './editor';
import { instantiateAxios, setSiteTitle } from '../../redux/actionCreators';

const TextView = () => {
  const { textId } = useParams();
  const [text, setText] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setSiteTitle(dispatch, `Viewing text ID: ${textId}`);
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

  const launchEditView = (e) => {
    const { id } = e.currentTarget;
    history.push(`/edit-text/${id}`);
  };
  return (
    <>
      <Card.Body>
        {text ? <TextEditor readonly text={text} /> : 'No text found with that id'}
      </Card.Body>
      <Card.Footer>
        <Button variant="success" type="button" id={textId} onClick={launchEditView}>
          Edit
        </Button>
      </Card.Footer>
    </>
  );
};

export default TextView;
