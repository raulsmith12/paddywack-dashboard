import Link from "next/link";

const NavCard = ({ cardTitle, cardDesc, url }) => {
    return (
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <p className="card-text">{cardDesc}</p>
                <Link href={url}><a className="btn btn-primary">Click here</a></Link>
            </div>
        </div>
    )
}

export default NavCard;