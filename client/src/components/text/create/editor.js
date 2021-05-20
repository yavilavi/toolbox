import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { setContent } from '../../../redux/actionCreators';

const TextEditor = ({ readonly = false }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const handleChange = ({ level }) => {
    dispatch(setContent(level.content));
  };
  return (
    <>
      <Editor
        apiKey="p8oa4hgcykc5dgpiojnqb0t03tz7z769nn5cc6qtc2c7yvby"
        onInit={(evt, editor) => {
          dispatch(setContent(editor.startContent));
          editorRef.current = editor;
        }}
        initialValue=""
        init={{
          resize: false,
          placeholder: 'Type you text here...',
          height: '100%',
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic underline backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onChange={handleChange}
        disabled={readonly}
      />
    </>
  );
};
export default TextEditor;
