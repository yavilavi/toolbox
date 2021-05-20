import Card from 'react-bootstrap/card';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextEditor from './create/editor';
import { serverPetition } from '../../redux/actionCreators';

const TextView = () => {
  const { id } = useParams();
  const [text, setText] = useState(null);
  useEffect(() => {
    serverPetition
      .get(`texts/get/${id}`)
      .then(({ data }) => {
        setText(data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [id]);

  return (
    <>
      <Card.Body>
        {text ? <TextEditor readonly text={text} /> : 'No text found with that id'}
      </Card.Body>
    </>
  );
};

export default TextView;
