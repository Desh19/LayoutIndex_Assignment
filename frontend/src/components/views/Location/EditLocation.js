import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Swal = require('sweetalert')

const EditLocation = () => {

    const params=useParams();
    const locationID=params.id;
    console.log(locationID)

    
    const [locationPlayLoad, setLocationPlayLoad] = React.useState({
        name: "",
        address: "",
        phone:"",
      });

      const{name,address,phone}=locationPlayLoad
      const [editLocationPlayLoad, setEditLocationPlayLoad] = React.useState({
        name: name,
        address: address,
        phone: phone,
      });
      
    const onChangeInput = (e) => {
        console.log(e.target.value)
        setEditLocationPlayLoad({
        ...editLocationPlayLoad,
        [e.target.id]: e.target.value,
      });
    };      
      
    const getLocationById = async () => {
        await axios.get(`http://localhost:8090/api/location/location/${locationID}`).then((res) => {
            console.log(res.data.data);
            setLocationPlayLoad(res.data.data);
        }).catch((err) => {
            console.log(err.massage);
        })
    }

    useEffect(()=>{
        getLocationById()
    },[])
    useEffect(()=>{
        setEditLocationPlayLoad(locationPlayLoad)
    },[locationPlayLoad])

    const onSubmit = async (e) => {
        console.log(editLocationPlayLoad)
      e.preventDefault();
      try{
        const res = await axios.put(`http://localhost:8090/api/location/update/${locationID}`,editLocationPlayLoad);
        console.log(res.data)
        Swal({
            title: "Success!",
            text: "Location updated successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          }).then(()=>{
            window.location.href = "/";
          })

      }catch(err){
        Swal({
          title: "Error!",
          text: err.response.data.msg,
          icon: 'warning',
          timer: 2000,
          button: false,
        })
      }
    };

return (
    <div>
    <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Location</h3>
                  <form>

                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location name</label>
                      <input type="text" id='name' className="form-control form-control-lg" defaultValue={name} onChange={onChangeInput}/>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location Address</label>
                      <input type="text" id='address' className="form-control form-control-lg" defaultValue={address} onChange={onChangeInput}/>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Mobile Number</label>
                      <input type="mobile" id='phone' className="form-control form-control-lg" defaultValue={phone} onChange={onChangeInput}/>
                    </div>
                    <br/>
                   


                    <div className="row">

                      <div className="col-md-3 mb-4 pb-2">

                      </div>
                      <div className="col-md-3 mb-4 pb-2">

                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                     
                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                        <input className="btn btn-primary btn-lg" type="submit" value="Edit" onClick={(e)=> onSubmit(e)}/>
                      </div>

                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    </div>
  )
}

export default EditLocation
