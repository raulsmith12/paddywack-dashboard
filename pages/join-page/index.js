import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import swal from 'sweetalert';

const JoinPage = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const editorRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
          const joinPage = await axios(
            'https://backend.paddywackgifts.com/public/api/join-page'
          );
    
          setTitle(joinPage.data.data[0].title)
          setContent(joinPage.data.data[0].page_content)
        }
    
        fetchData();
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        if (editorRef.current) {
            setContent(editorRef.current.getContent());
        }
        setTimeout(() => {
            axios({
                method: 'POST',
                url: 'https://paddywackgifts.com/backend/public/api/join-page/1',
                headers: { 'content-type': 'application/json' },
                data: {
                    'title': title,
                    'content': editorRef.current.getContent()
                },
                params: { '_method': 'PUT' }
            })
            .then(result => {
                swal("Success!", "Join Page content successfully updated!", "success")
            })
            .catch(error => swal("Uh oh! Something went wrong. Please try again."))
        }, 2500)
      }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Join Page Content</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form className="p-2" onSubmit={handleFormSubmit}>
                        <label htmlFor="titleText" className="form-label">Title</label>
                        <input type="text" className="form-control" id="titleText" name="titleText" required value={title} onChange={e => setTitle(e.target.value)} /><br /><br />
                        {content && (
                            <>
                                <label className="form-label">Page Content (form not included)</label>
                                <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={content}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                /><br /><br />
                            </>
                        )}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinPage;