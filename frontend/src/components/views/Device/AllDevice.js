import React, { useEffect } from 'react';
import axios from 'axios';
const swal = require('sweetalert')

const AllDevice = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [devices, setDevices] = React.useState([]);
    useEffect(()=>{
        const getAllDevices = async () => {
          await axios.get(`http://localhost:8090/api/device/devices`).then((res) => {
            setDevices(res.data.data);
          console.log( res.data)
          }).catch((err) => {
              console.log(err.massage);
          })
      }
        getAllDevices();
      },[])

    // const [searchTerm, setSearchTerm] = React.useState("");
    // const [devices, setDevices] = React.useState([]);
    // useEffect(() => {
    //     const getAllDevices = async () => {
    //         await axios.get(`http://localhost:8090/api/device/devices`).then((res) => {
    //             setDevices(res.data);
    //             console.log(res.data);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }
    //     getAllDevices();
    // },[]);
    

    const filteredDevices = devices.filter((devices) => {
        return (
            devices.serialNo.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.type.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.locationName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

    const deleteDevice = async (DeviceId) => {
        try{
            swal({
                title: "Are you sure?",
                text: "You want to delete this device?",
                icon: "warning",
                dangerMode: true,
              })
              .then(willDelete => {
                if (willDelete) {
                    const res =  axios.delete(`http://localhost:8090/api/device/delete/${DeviceId}`)
                    .then(res => {
                      swal({
                        title: "Done!",
                        text: "Device is deleted",
                        icon: "success",
                        timer: 2000,
                        button: false
                      }).then(()=>{
                        window.location.reload();
                      })
                  });
                }
              })
            // swal({
            //     title: "Are you sure?",
            //     text: "But you will still be able to retrieve this file.",
            //     type: "warning",
            //     showCancelButton: true,
            //     confirmButtonColor: "#DD6B55",
            //     confirmButtonText: "Yes, archive it!",
            //     cancelButtonText: "No, cancel please!",
            //     closeOnConfirm: false,
            //     closeOnCancel: false
            //   },
            //   function(isConfirm){
            //     if (isConfirm) {
            //       swal("Deleted!", "Your imaginary file has been archived.", "success");
            //     } else {
            //       swal("Cancelled", "Your imaginary file is safe :)", "error");
            //     }
            //   }).then(()=>{
            //     window.location.reload();
            //   })
        }catch(err){
            console.log(err.data.msg);
        }
    }

    

  return (
    <div>
        <center>
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Devices List</h3>
        </center>
            <br />
            {/* <div className="container">
                <form class="form-inline my-2 my-lg-0">
                    <div className="row ">
                        <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Enter the location or device name ' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                        <a type="a" class="btn btn-primary inputSearch" href="#">add device</a>
                    </div>
                </form>
            </div> */}
            <br/>
            <div class="row row-cols-1 row-cols-md-5 g-5 " style={{ margin:'10px' }}>
                {filteredDevices.map((devices)=>
                    <div class="col">
                        <div class="card">
                            <center>
                        <h6 class="card-title">{devices.serialNo}</h6>
                        </center>
                        <img class="card-img-top" src={devices.image} alt="Card image cap" />
                        <div class="card-body">
                            
                           
                                <p class="card-text">{devices.type}</p>
                                <p class="card-text">{devices.locationName}</p>
                                <p class="card-text">{devices.status}</p>
                                <div className='row'>
                                    <div className='btn-group'>
                                        <a href={`/deviceEdit/${devices._id}`} class="btn btn-success">Edit</a>&nbsp;
                                        <button type="button" class="btn btn-danger" onClick={()=>deleteDevice(devices._id)}>Delete</button>
                                    </div>

                                </div>
                        </div>
                        </div>
                    </div>
                    
                )}
                
            </div>
            {/* <div className='row row-cols-1 row-cols-md-2 g-4'>
                {filteredDevices.map((devices) => (
                    <div className='col-md-3 mb-4 pb-4'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img class="card-img-top" src={devices.photo} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{devices.serialNo}</h5>
                                <p class="card-text">{devices.type}</p>
                                <p class="card-text">{devices.locationName}</p>
                                <p class="card-text">{devices.status}</p>
                                <div className='row'>
                                    <div className='col-md-3 mb-4 pb-4'>
                                        <a href='#' class="btn btn-warning">Edit</a>&nbsp;

                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                           <button type="button" class="btn btn-danger">Delete</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div> */}



    </div>
  )
}


export default AllDevice