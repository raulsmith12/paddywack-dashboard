import NavCard from '../components/NavCard';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1>Welcome</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Home Sections" cardDesc="The three sections underneath the main banner on the home page" url="/home-sections" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Home Sliders" cardDesc="The three fading images in the banner on the home page" url="/home-sliders" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="About Content" cardDesc="The content found on the about page" url="/about" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Artists Content" cardDesc="Add, edit, and remove artists in the about section" url="/artists" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Gallery Images" cardDesc="Add and remove images in the gallery" url="/gallery" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Contact Page Content" cardDesc="The content in the contact page (form not included)" url="/contact-page" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Commission Page Content" cardDesc="The content in the commission page (form not included)" url="/commission-page" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Join Page Content" cardDesc="The content in the join page (form not included)" url="/join-page" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Privacy Page Content" cardDesc="The content in the privacy policy page" url="/privacy" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Edit/Remove Products" cardDesc="Edit and remove products from the shop" url="/products" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Add Products" cardDesc="Add new products into the shop" url="/products/add" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Contact Page Correspondence" cardDesc="All incoming correspondence from the contact page form" url="/contact-correspondence" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Commission Page Correspondence" cardDesc="All incoming correspondence from the commission page form" url="/commission-correspondence" />
        </div>
        <div className="col-md-3 col-sm-12 px-2 py-2">
          <NavCard cardTitle="Join Page Correspondence" cardDesc="All incoming correspondence from the join page form" url="/join-correspondence" />
        </div>
      </div>
    </div>
  )
}

export default Home;