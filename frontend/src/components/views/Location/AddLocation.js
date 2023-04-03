import axios from 'axios';
import React from 'react'
const Swal = require('sweetalert')

const AddLocation = () => {
    
    const [locationPlayyload, setLocationPlayyload] = React.useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleLocationChange = (e) => {
        setLocationPlayyload({
            ...locationPlayyload,
            [e.target.id]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:8090/api/location/add", locationPlayyload);
            console.log(res)
            Swal({
              title: "Success!",
              text: "Location Added Successfully",
              icon: 'success',
              timer: 2000,
              button: false,
            }).then(()=>{
              window.location.href = "/deviceAdd";
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
                  <center>
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Location</h3>
                  </center>
                  <form>

                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location name</label>
                      <input type="text" id='name' className="form-control form-control-lg" onChange={(e)=>handleLocationChange(e)}/>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location Address</label>
                      <input type="text" id='address' className="form-control form-control-lg" onChange={(e)=>handleLocationChange(e)}/>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Mobile Number</label>
                      <input type="mobile" id='phone' className="form-control form-control-lg" onChange={(e)=>handleLocationChange(e)}/>
                    </div>
                    <br/>
                   


                    <div className="row">

                      <div className="col-md-3 mb-4 pb-2">

                      </div>
                      <div className="col-md-3 mb-4 pb-2">

                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                     
                      </div>

                      <div className="">
                        <input className="btn btn-primary" type="submit" value="Submit" onClick={(e)=> onSubmit(e)}/>
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

export default AddLocation