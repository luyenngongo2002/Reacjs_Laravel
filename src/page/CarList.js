 
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CardSubtitle } from 'reactstrap';
import AddCar from './AddCar';
import EditCar from './EditCar';
function CarList() {
    const [type, setType] = useState('');
    const [cars, setCars] = useState([]);
    const [isLoaded, setIsLoaded]= useState(false);
    const getCars = () => {
        axios.get('http://127.0.0.1:8000/api/cars')
            .then(function (response) {
                console.log(response.data.data);
                setCars(response.data.data)
                setIsLoaded(true)
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
            });
    }
    useEffect(() => {
        if(!isLoaded) getCars();
    }, [isLoaded]);
    const [editCarData,setEditCarData]=useState({
        id:"",
        model:"",
        description:"",
        produced_on:"",
        manufacturer:"",
        image:""
    });  //editCarData là 1 mảng các đối tượng lưu dữ liệu đối tượng Car được edit
    //hàm này nhận biến car ở sự kiện onClick() của nút Sửa
    const [editmodal, setEditModal] = useState(false);
    const toggleEditModal = (car) => {
        setEditModal(!editmodal);
        if (editmodal===false) setEditCarData(car);  //phải có kiểm tra điều kiện form edit được mở thì mới cập nhật không thì sẽ lỗi không nhận ra editCarData.manufacturer.id khi đóng form
        console.log(editCarData);
    }
    const deleteCar=(id)=> {
        axios.delete('http://127.0.0.1:8000/api/cars/'+id)  //tham số truyền vào là id
        .then((res) => {
        console.log("Car removed deleted");
        getCars();
        }).catch((error) => {
        console.log(error)
        })
    }
    const handlerOnchange = (e) => {
        const val = e.target.value;
        setType(val);
        console.log(type);
    }
    return (
        <div className='container fluid'>
            <h2>Danh sách xe</h2>
            <AddCar onAdded={setIsLoaded}/>
            {/* <Link to="/cars/add"><button color="primary">Add car page</button></Link> */}

            <EditCar cars={cars} setCars={setCars} getCars={ getCars} toggleEditModal={ toggleEditModal } editmodal={ editmodal } editCarData={editCarData} setEditCarData={setEditCarData} onAdded={setIsLoaded}/>  
            <input
                type="text"
                className="form-control"
                value={type}
                placeholder="Nhập model"
                onChange={handlerOnchange}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Products_on</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    !!cars
                    ?
                    type === ""
                    ?
                        cars.map((cars, index) =>
                            <tr key={index}>
                                <td scope="row">{cars.id}</td>
                                <td>{cars.model}</td>
                                <td>{cars.description}</td>
                                <td>{cars.produced_on}</td>
                                <td>
                                    <img src={`http://localhost:8000/image/${cars.image}`} style={{ width: '100px' }}></img>
                                </td>
                                <td>
                            <button type="button" className="btn btn-success" onClick={()=>toggleEditModal(cars)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{ if(window.confirm('Bạn có chắc chắn xóa?')) deleteCar(cars.id)} }>Delete</button>
                            </td>
                            </tr>
                        )
                    :
                    cars
                    .filter((cars) => cars.model.indexOf(type) !== -1)
                    .map((cars, index) =>
                            <tr key={index}>
                                <td scope="row">{cars.id}</td>
                                <td>{cars.model}</td>
                                <td>{cars.description}</td>
                                <td>{cars.produced_on}</td>
                                <td>
                                    <img src={`http://localhost:8000/image/${cars.image}`} style={{ width: '100px' }}></img>
                                </td>
                                <td>
                            <button type="button" className="btn btn-success" onClick={()=>toggleEditModal(cars)}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{ if(window.confirm('Bạn có chắc chắn xóa?')) deleteCar(cars.id)} }>Delete</button>
                            </td>
                            </tr>
                        )
                    :
                    <tr><td>No Data in API</td></tr>}
                </tbody>
            </table>
        </div>
    )
}
export default CarList;
 

