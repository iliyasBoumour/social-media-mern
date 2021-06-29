import React, { useState, useRef, useEffect } from 'react';
import { Input, Actions, Button, Container } from './style';

const EditPost = ({ text, close, type, edit, changeText }) => {
  const [value, setValue] = useState(text);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const update = () => {
    edit(value);
    changeText(value);
    close();
  };
  return (
    <Container type={type}>
      <Input
        type='text'
        inputRef={inputRef}
        value={value}
        multiline
        onChange={(e) => setValue(e.target.value)}
      />
      <Actions>
        <Button contained onClick={update}>
          Confirm
        </Button>
        <Button onClick={close}>Cancel</Button>
      </Actions>
    </Container>
  );
};

export default EditPost;
