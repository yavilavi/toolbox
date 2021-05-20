import Card from 'react-bootstrap/card';
import { useEffect, useState } from 'react';
import TextEditor from './create/editor';

const TextView = () => {
  const [text, setText] = useState({
    text: null,
  });
  // useEffect(() => {}, [text]);
  return (
    <>
      <Card.Body>
        <TextEditor readonly />
      </Card.Body>
    </>
  );
};

export default TextView;
