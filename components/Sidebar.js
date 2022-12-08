import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="bg-secondary text-white full-screen sticky-top">
            <div className="py-2">
                <h4 className="text-center">Paddy Wack<br />Homemade<br />Gifts</h4>
                <ul className="nav flex-column ps-2">
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/"><a className="text-white sidenav-link"><h5>Home</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/home-sections"><a className="text-white sidenav-link"><h5>Home Sections</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/home-sliders"><a className="text-white sidenav-link"><h5>Home Sliders</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/about"><a className="text-white sidenav-link"><h5>About</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/artists"><a className="text-white sidenav-link"><h5>Artists</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/gallery"><a className="text-white sidenav-link"><h5>Gallery</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/contact-page"><a className="text-white sidenav-link"><h5>Contact Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/commission-page"><a className="text-white sidenav-link"><h5>Commission Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/join-page"><a className="text-white sidenav-link"><h5>Join Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/privacy"><a className="text-white sidenav-link"><h5>Privacy Page</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/products"><a className="text-white sidenav-link"><h5>Edit/Remove Products</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/products/add"><a className="text-white sidenav-link"><h5>Add Products</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/contact-correspondence"><a className="text-white sidenav-link"><h5>Contact Correspondence</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/commission-correspondence"><a className="text-white sidenav-link"><h5>Commission Correspondence</h5></a></Link>
                    </li>
                    <li className="nav-item py-2 pe-2 border-bottom border-white">
                        <Link href="/join-correspondence"><a className="text-white sidenav-link"><h5>Join Correspondence</h5></a></Link>
                    </li>
                </ul>
            </div>
            <div className="px-2">
                <h6 className="text-white text-center">
                    &copy; {(new Date().getFullYear())} Paddy Wack Homemade Gifts.<br />All Rights Reserved.<br />
                    Powered by Galactic Digital Studios
                </h6>
            </div>
        </div>
    )
}

export default Sidebar;