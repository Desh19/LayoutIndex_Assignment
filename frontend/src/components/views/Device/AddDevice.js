import React, { useEffect } from 'react'
import axios from 'axios';
import Select from "react-select";
const Swal = require('sweetalert')

const AddDevice = () => {
    
    const [image, setImage] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    const [locationArray, setLocationArray] = React.useState([]);
    const [type, setType] = React.useState("");
    const [devicePalyload, setDevicePalyload] = React.useState({
        serialNo: "",
        type: "",
        locationName: "",
        image: "",
    });
    
    const onChangeInput = (e) => {
      console.log(type)
      setDevicePalyload({
        ...devicePalyload,
        [e.target.id]: e.target.value,
      });
    };
    

    const onLocationId =  (e) => {
      let combinedValues = e.target.value;
       let valuesArray = combinedValues.split("|");
       setDevicePalyload({
         ...devicePalyload,
          locationId:valuesArray[0],
         locationName:valuesArray[1],
       });
   
   };

     useEffect(()=>{
      const getAllLocations = async () => {
        await axios.get(`http://localhost:8090/api/location/locations`).then((res) => {
            console.log(res.data);
            setLocations(res.data.data);
        }).catch((err) => {
            console.log(err.massage);
        })
    }
      getAllLocations();
    },[])


    const onSubmit = async (e) => {
      devicePalyload.type=type;
      devicePalyload.image=image;
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:8090/api/device/add",devicePalyload);
       Swal({
          title: "Success!",
          text: "Device Added Successfully",
          icon: 'success',
          timer: 2000,
          button: false,
        }).then(()=>{
          window.location.href = "/";
        })
      } catch (err) {
        Swal({
          title: "Error!",
          text: err.response.data.msg,
          icon: 'warning',
          timer: 2000,
          button: false,
        })
      }
    };

    // const options = [
    //   { value: "pos", label: "POS" },
    //   { value: "kiosk", label: "kiosk" },
    //   { value: "signage", label: "signage" },
    // ];
    
    const handleImageChange = async e => {
      e.preventDefault()
      try {
          const file = e.target.files[0]
  
          if (!file) return alert("File not exist.")
  
          if (file.size > 1024 * 1024) // 1mb
              return alert("Size too large!")
  
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return alert("File format is incorrect.")
  
          let formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', 'LayoutIndex')
          formData.append('cloud_name', 'dpgmk85rq')
  
          // setLoading(true)
          const res = await axios.post( "https://api.cloudinary.com/v1_1/dpgmk85rq/image/upload",
          formData,
          {
            method: "post",
            body: formData,
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          // setLoading(false)

            setImage(res.data.url);
        } catch (err) {
          console.log(err.response.data.msg);
          
        }
 }

    

  return (
    <div className='container-sm'>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 p-md-5">
                  <center> 
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Device</h3>
                  </center>
                  <form>
                      <div class="mb-3">
                          <label class="form-label">Serial Number</label>
                          <input type="text" class="form-control" id='serialNo' onChange={(e) => onChangeInput(e)} required/>
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Select Device Type</label>
                          {/* <select class="form-select" aria-label="Default select example" onChange={(e) => onChangeInput(e)}>
                              <option selected disabled>Select Device</option>
                              {options.map((options) => (
                                <option value={options.value}>{options.label}</option>
                              ))}
                          </select> */}
                          <Select
                            className=""
                            id='type'
                            options={[
                              { value: "Pos", label: "POS" },
                              { value: "kiosk", label: "KIOSK" },
                              { value: "signage", label: "SIGNAGE" },
                            ]}
                            onChange={(e) => {
                              setType(e.value)
                            }}
                            />
                      </div>  
                      <div class="mb-3">
                          <label class="form-label">Select Location</label>
                          <select class="form-select"  name="locationName" onChange={(e) => onLocationId(e)}>
                              <option selected disabled>Select Location</option>
                              {locations.map((location,index) => (
                                <option value={location._id+"|"+location.name} >{location.name}</option>
                              ))}
                          </select>
                      </div>            
                      <div class="mb-3">
                          <label for="formFile" class="form-label">Device Image</label>
                          <input class="form-control" type="file" id="formFile" name='image'  onChange={handleImageChange}/>
                      </div>
                    
                      <button type="submit" class="btn btn-primary" onClick={(e)=> onSubmit(e)}>Submit</button>
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


export default AddDevice