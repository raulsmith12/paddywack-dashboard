import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const ContactCorrespondence = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const contactList = await axios(
                'https://backend.paddywackgifts.com/public/api/contacts'
            );

            setContacts(contactList.data.data.reverse());
        }

        fetchData();
    }, [contacts]);

    const deleteContact = (e) => {
        swal({
            title: 'Are you sure you want to delete this contact?',
            text: 'Once deleted, it is gone forever!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.paddywackgifts.com/public/api/contacts/${e}`
                })
                .then(result => {
                    swal("Success!", "That contact is now deleted!", "success")
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Contact Page Correspondence</h1>
                </div>
            </div>
            {contacts.map(i => (
                <div className="row mb-2" key={i.id}>
                    <div className="col-12">
                        <div className="card">
                            <div className="display-4 card-header bg-primary text-white">
                                {i.name}
                            </div>
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-5">
                                            <h5>{i.phone_no}</h5>
                                        </div>
                                        <div className="col-5">
                                            <h5>{i.email}</h5>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" className="btn btn-danger" onClick={() => deleteContact(i.id)}>X</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p>{i.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactCorrespondence;