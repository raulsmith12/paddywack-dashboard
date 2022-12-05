import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import Slider from '../../components/HomeSlider';

const HomeSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const homeSliders = await axios(
        'https://backend.paddywackgifts.com/public/api/home-sliders'
      );

      setSliders(homeSliders.data.data);
      setShowLoader(false);
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
      <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#922667" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={showLoader}
      />
      <div className="row">
        {sliders.map(i => (
            <div className="col-4" key={i.id}>
                <h4>Slider {i.id}</h4>
                <img src={i.image_url} width="85%" alt="Paddy Wack Homemade Gifts slider" /><br /><br />
                <Slider image={i.id} />
            </div>
        ))}
      </div>
    </div>
  )
}

export default HomeSliders;