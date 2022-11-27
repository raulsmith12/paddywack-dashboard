import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import swal from 'sweetalert';

const About = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [uploadImage, setUploadImage] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const aboutPage = await axios(
        'https://backend.paddywackgifts.com/public/api/about'
      );

      setTitle(aboutPage.data.data[0].title);
      setDescription(aboutPage.data.data[0].description);
      setImage(aboutPage.data.data[0].image_url);
    }

    fetchData();
  }, []);

  const imageUpload = e => {
      let file = e.target.files[0];
      createImage(file);
  }

  const createImage = (file) => {
      let reader  = new FileReader();
      reader.onload = (e) => {
          setUploadImage(e.target.result);
      };
      reader.readAsDataURL(file);
  }

  const fileUpload = e => {
      e.preventDefault();
      axios({
          method: 'post',
          url: 'https://paddywackgifts.com/backend/public/api/files',
          headers: { 'content-type': 'application/json' },
          data: {
              'file_name': uploadImage
          }
      })
      .then(result => {
          swal("Success!", "Your image has been uploaded successfully! Don't forget to confirm then submit all changes to your about content!", "success"),
          setImage(result.data)
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    if (editorRef.current) {
        setDescription(editorRef.current.getContent());
    }
    setTimeout(() => {
        axios({
            method: 'POST',
            url: 'https://paddywackgifts.com/backend/public/api/about/1',
            headers: { 'content-type': 'application/json' },
            data: {
                'title': title,
                'description': editorRef.current.getContent(),
                'image_url': image
            },
            params: { '_method': 'PUT' }
        })
        .then(result => {
            swal("Success!", "About Page content successfully updated!", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }, 2500)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>About Page Content</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
            <form className="p-2" onSubmit={handleFormSubmit}>
                <label htmlFor="titleText" className="form-label">Title</label>
                <input type="text" className="form-control" id="titleText" name="titleText" required value={title} onChange={e => setTitle(e.target.value)} /><br /><br />
                {description && (
                    <>
                        <label className="form-label">Description</label>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={description}
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
        <div className="col-4">
            <img src={image} width="90%" /><br />
            <form onSubmit={fileUpload}>
                <input type="file" onChange={imageUpload} />
                <button type="submit">Upload</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default About;