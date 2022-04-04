const DataTable = () => {
    const deleteItems = () => {
        console.log({ msg: 'delete'});
    }
    return ( 
        <>
            <div className="container mt-5 px-2">
            <div class="mb-2 d-flex justify-content-between align-items-center">
                <div class="px-2"> <span role="button" tabIndex="0" onClick={deleteItems} className="text-red-600 underline">Delete</span></div>
            </div>
                <div className="table-responsive">
                    <table className="table table-responsive table-borderless">
                    <thead>
                        <tr className="bg-light">
                        <th scope="col" width="5%"><input className="form-check-input" type="checkbox" /></th>
                        <th scope="col" width="5%">#</th>
                        <th scope="col" width="20%">Date</th>
                        <th scope="col" width="10%">Status</th>
                        <th scope="col" width="20%">Customer</th>
                        <th scope="col" width="20%">Purchased</th>
                        <th scope="col" className="text-end" width="20%"><span>Revenue</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row"><input className="form-check-input" type="checkbox" /></th>
                        <td>12</td>
                        <td>1 Oct, 21</td>
                        <td><i className="fa fa-check-circle-o green" /><span className="ms-1">Paid</span></td>
                        <td><img src="https://i.imgur.com/VKOeFyS.png" width={25} alt=''/> Althan Travis</td>
                        <td>Wirecard for figma</td>
                        <td className="text-end"><span className="fw-bolder">$0.99</span> <i className="fa fa-ellipsis-h ms-2" /></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default DataTable;