import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const CommissionCorrespondence = () => {
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const commissionList = await axios(
                'https://backend.paddywackgifts.com/public/api/commissions'
            );

            setCommissions(commissionList.data.data.reverse());
        }

        fetchData();
    }, [commissions]);

    const deleteCommission = (e) => {
        swal({
            title: 'Are you sure you want to delete this commission?',
            text: 'Once deleted, it is gone forever!',
            icon: 'warning',
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: `https://backend.paddywackgifts.com/public/api/commissions/${e}`
                })
                .then(result => {
                    swal("Success!", "That commission is now deleted!", "success")
                })
                .catch(error => swal("Uh oh! Something went wrong. Please try again."))
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Commission Page Correspondence</h1>
                </div>
            </div>
            {commissions.map(i => (
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
                                            <button type="button" className="btn btn-danger" onClick={() => deleteCommission(i.id)}>X</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <img src={i.custom_image} width="100%" alt="Commission Piece" />
                                        </div>
                                        <div className="col-8">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h5>Size:</h5>
                                                        <h6>{i.size}</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5>Shape:</h5>
                                                        <h6>{i.shape}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <h5>Notes:</h5>
                                                        <p>{i.notes}</p>
                                                    </div>
                                                </div>
                                            </div>
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

export default CommissionCorrespondence;