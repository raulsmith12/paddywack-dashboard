import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeSection from '../../components/HomeSection';

const HomeSections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pageSections = await axios(
        'https://backend.paddywackgifts.com/public/api/home-sections'
      );

      setSections(pageSections.data.data);
    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Home Sections</h1>
          <h5>The three sections that you find on the home page</h5>
        </div>
      </div>
      <div className="row">
        {sections.map(i => {
          return (
            <div className="col-4" key={i.id}>
              <HomeSection id={i.id} section={i} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeSections;