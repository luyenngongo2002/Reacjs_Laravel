import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Label, Input,Col } from 'reactstrap';
import { useState } from "react";
import axios from 'axios';

function AddCar({onAdded}) {
    const [modal, setModal] = useState(false);
    const [car,setCar] = useState({
        model: "",
        description: "",
        produced_on: "",
        image:"",
        file:null,
    });

    // model,description,produc_on

    const handlerInput = (e) =>{
        const {name, value} = e.target;
        console.log(car);
        setCar({
            ...car,
            // file:e.target.files && e.target.files.length?URL.createObjectURL(e.target.files[0]):car.file,
            // image:e.target.files && e.target.files.length?e.target.files[0].name:car.image,
            [name]: value,
        })
    }
    const handlerImageFile=(e)=>{
        setCar({
            ...car,
            file: URL.createObjectURL(e.target.files[0]),image:e.target.files[0].name
            // file: e.target.files && e.target.files.length ? URL.createObjectURL(e.target.files[0]) : car.file,
            // image: e.target.files && e.target.files.length ? e.target.files[0].name : car.image
        })
    }
    const tooggle = () => {
        setModal(!modal);
    }

    const onRedirect=()=>{
        setCar({});  //set lại state car là đói tượng rỗng
        tooggle();
        onAdded(false);
    };

    const handleSubmitForm=(e)=>{
        e.preventDefault();
        const fileInput=document.querySelector('#fileinput');
        console.log(fileInput.files[0]);
        const formData=new FormData();
        formData.append('image',fileInput.files[0]);
        formData.append('description',car.description);
        formData.append('model',car.model);
        formData.append('produced_on',car.produced_on);
        axios.post('http://127.0.0.1:8000/api/cars', formData)
          .then(function (response) {
            console.log(response);
            onRedirect();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div>
            <Button color="danger" onClick={tooggle}>
                Add a new car
            </Button>
            <Modal isOpen={modal} toggle={tooggle}>
                <form onSubmit={handleSubmitForm} encType="multipart/form-data" method='post'>

               
                <ModalHeader toggle={tooggle}>
                    Add a new car
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Model</Label>
                        <Input id="model" value={car ?car.model:""} onChange={handlerInput} name="model" type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input id="description"  value={car?car.description:""} onChange={handlerInput} name="description" type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Produced_on</Label>
                        <Input id="produced_on"  value={car?car.produced_on:""} onChange={handlerInput}  name="produced_on" type="date" />
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Image</Label>
                        <Col sm={5}>
                            <Input
                                id="fileinput" onChange={handlerImageFile}  name="fileinput" type="file"
                            />
                        </Col>
                        <Col sm={5}>
                            <img className="img-thumnail" style={{ width: '10rem'}} src={car?car.file:null} />
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Thêm
                    </Button>
                    {' '}
                    <Button onClick={function noRefCheck() { }}>
                        Cancel
                    </Button>
                </ModalFooter>
                </form>
            </Modal>
        </div>
    )
}
export default AddCar;
