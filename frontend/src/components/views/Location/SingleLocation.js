// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// const swal = require('sweetalert')


// const SingleLocation = () => {

//     const params=useParams();
//     const locationName=params.name;
//     console.log(locationName)

//     const [searchTerm, setSearchTerm] = React.useState("");
//     const [devices, setDevices] = React.useState([]);

//     const [locationPlayLoad, setLocationPlayLoad] = React.useState({
//         name: "",
//         address: "",
//         phone:"",
//       });


//     const getDeviceByLocationName = async () => {
//         await axios.get(`http://localhost:8090/api/device/deviceByLocation/${locationName}`).then((res) => {
//             console.log(res.data.data);
//             setDevices(res.data.data);
//         }).catch((err) => {
//             console.log(err.massage);
//         })
//     }

//     useEffect(()=>{
//         getDeviceByLocationName()
//     },[])
    
//     const filteredDevices = devices.filter((devices) => {
//         return (
//             devices.serialNo.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
//             devices.type.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
//             devices.locationName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
//             devices.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())
//         );
//     });

//     const deleteDevice = async (DeviceId) => {
//         try{
//             swal({
//                 title: "Are you sure?",
//                 text: "You want to delete this device?",
//                 icon: "warning",
//                 dangerMode: true,
//               })
//               .then(willDelete => {
//                 if (willDelete) {
//                     const res =  axios.delete(`http://localhost:8090/api/device/delete/${DeviceId}`)
//                     .then(res => {
//                       swal({
//                         title: "Done!",
//                         text: "Device is deleted",
//                         icon: "success",
//                         timer: 2000,
//                         button: false
//                       }).then(()=>{
//                         window.location.reload();
//                       })
//                   });
//                 }
//               })
    
//         }catch(err){
//             console.log(err.data.msg);
//         }
//     }

//   return (
//     <div>
//         <center>
//         <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Devices List</h3>
//         </center>
//             <br />
//             <br/>
//             <div class="row row-cols-1 row-cols-md-5 g-5 " style={{ margin:'10px' }}>
//                 {filteredDevices.map((devices)=>
//                     <div class="col">
//                         <div class="card">
//                             <center>
//                         <h6 class="card-title">{devices.serialNo}</h6>
//                         </center>
//                         <img class="card-img-top" src={devices.image} alt="Card image cap" />
//                         <div class="card-body">
                            
                           
//                                 <p class="card-text">{devices.type}</p>
//                                 <p class="card-text">{devices.locationName}</p>
//                                 <p class="card-text">{devices.status}</p>
//                                 <div className='row'>
//                                     <div className='btn-group'>
//                                         <a href={`/deviceEdit/${devices._id}`} class="btn btn-success">Edit</a>&nbsp;
//                                         <button type="button" class="btn btn-danger" onClick={()=>deleteDevice(devices._id)}>Delete</button>
//                                     </div>

//                                 </div>
//                         </div>
//                         </div>
//                     </div>
                    
//                 )}
                
//             </div>
          
//     </div>
//   )
// }


// export default SingleLocation