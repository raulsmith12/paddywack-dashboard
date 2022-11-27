import { useState, useEffect } from 'react';
import axios from 'axios';

import Slider from '../../components/HomeSlider';

const HomeSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [uploadImage, setUploadImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const homeSliders = await axios(
        'https://backend.paddywackgifts.com/public/api/home-sliders'
      );

      setSliders(homeSliders.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Home Sliders</h1>
          <h5>The three sliders that fade in and out on the home page</h5>
        </div>
      </div>
      <div className="row">
        {sliders.map(i => (
            <div className="col-4" key={i.id}>
                <h4>Slider {i.id}</h4>
                <img src={i.image_url} width="85%" /><br /><br />
                <Slider image={i.id} />
            </div>
        ))}
      </div>
    </div>
  )
}

export default HomeSliders;