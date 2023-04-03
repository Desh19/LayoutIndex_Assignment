import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LocationList = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    console.log(locations)
    const navigate = useNavigate();

    useEffect(() => {
        const getAllLocations = async () => {
            await axios.get(`http://localhost:8090/api/location/locations`).then((res) => {
                setLocations(res.data.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getAllLocations();
    }, [])

    const filteredLocations = locations.filter((locations) => {
        
        return (
            locations.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.address.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.phone.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        
    });

    const onClickAddLocation = (e) => {
        navigate('/locationAdd')

    };

  return (
    <div>
        <center>
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Location List</h3>
        </center>

        <div className="container">
            <form class="form-inline my-2 my-lg-0">
                <div className="row">
                    <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Search Location' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;         
                </div>
                <button type="button" class="btn btn-primary" onClick={(e) => onClickAddLocation()}>Add Location</button>
            </form>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-5 " style={{ margin:'10px' }}>
  {filteredLocations.map((location) => {
    try {
      const kioskCount = location.devices.filter(device => device === 'kiosk').length;
      const posCount = location.devices.filter(device => device === 'Pos').length;
      const signageCount = location.devices.filter(device => device === 'signage').length;

      return (
        <div class="col" key={location._id}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Location Name : {location.name}</h5>
              <p class="card-text">Location ID : {location._id}</p>
              <p class="card-text">Location Address : {location.address}</p>
              <p class="card-text">Contact Number : {location.phone}</p>
              <h5 class="card-title">Devices Count</h5>
              <p>{kioskCount} KIOSK</p>
              <p>{posCount} POS</p>
              <p>{signageCount} SIGNAGE</p>
              <div className='row'>
                <div className='btn-group'>
                  <a href={`/locationEdit/${location._id}`} class="btn btn-success">Edit Location Details</a>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  })}
</div>



    </div>
  )
}


export default LocationList