import { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistCard from '../../components/ArtistCard';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [newName, setNewName] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newImage, setNewImage] = useState();
  const [uploadImage, setUploadImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const artistList = await axios(
        'https://backend.paddywackgifts.com/public/api/artist'
      );

      setArtists(artistList.data.data);
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
        swal("Success!", "Your image has been uploaded successfully! Please be sure to review all Artist information and click on Submit to change your artist image!", "success"),
        setNewImage(result.data)
    })
    .catch(error => swal("Uh oh! Something went wrong. Please try again."))
}

const handleFormSubmit = e => {
    e.preventDefault();
    axios({
        method: 'post',
        url: 'https://paddywackgifts.com/backend/public/api/artist',
        headers: { 'content-type': 'application/json' },
        data: {
            'name': newName,
            'description': newDescription,
            'image_url': newImage
        }
    })
    .then(result => {
        swal("Success!", "Artist content successfully added!", "success")
    })
    .catch(error => swal("Uh oh! Something went wrong. Please try again."))
}

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Artists</h1>
        </div>
      </div>
      <div className="row">
        {artists.map(i => (
            <div className="col-4" key={i.id}>
                <ArtistCard id={i.id} />
            </div>
        ))}
        <div className="col-4 shadow p-3 mb-5 bg-body rounded">
          <h3>Adding a New Artist?</h3>
          <form onSubmit={handleFormSubmit}>
                <label htmlFor="nameText" className="form-label">Name</label>
                <input type="text" className="form-control" id="nameText" name="nameText" required value={newName} onChange={e => setNewName(e.target.value)} />
                <br />
                <label htmlFor="descriptionText" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="descriptionText" name="descriptionText" required value={newDescription} onChange={e => setNewDescription(e.target.value)} rows="5" /><br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form><br />
            <img src={newImage} width="90%" /><br /><br />
            <form onSubmit={fileUpload}>
                <input type="file" onChange={imageUpload} />
                <button type="submit">Upload</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Artists;