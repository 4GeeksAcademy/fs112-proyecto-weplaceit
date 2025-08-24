import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AddPost = (props) => {

    const { store, dispatch } = useGlobalReducer()

    const [formData, setFormData] = useState({
        title: '',
        direction: '',
        description: '',
        price: '',
        capacity: '',
        images: []
    });

    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
};


const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const imageUrls = files.map(file => URL.createObjectURL(file));
  setFormData(prev => ({ ...prev, images: imageUrls }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Datos del formulario:', formData);
  // Aquí podrías hacer un fetch/axios para enviar a tu backend
};




    return (

        <>
            <div className="d-flex justify-content-center mt-3">

                <div id="carouselExampleIndicators" className="carousel slide col-11 col-sm-7 col-md-7 col-lg-7">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://placeholder.pics/svg/600x400" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://placeholder.pics/svg/600x400" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://placeholder.pics/svg/600x400" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>



            <div className="d-flex justify-content-center mt-3">

                <div className="ms-0 col-11 col-sm-7 col-md-7 col-lg-7">
                    <input className="form-control" type="file" id="formFileMultiple" multiple accept="image/*" onChange={handleFileChange} />
                </div>


            </div>
            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-between">
                    <div className="col-2 ms-1">
                        <label htmlFor="inputtitle" className="col-form-label">Titulo</label>
                    </div>
                    <div className="me-0 col-9 pe-0">
                        <input type="text" name="title" id="inputtitle" className="form-control" aria-describedby="titleHelpInline" value={formData.title} onChange={handleChange}/>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-between">
                    <div className="col-2 ms-1">
                        <label htmlFor="inputDirection" className="col-form-label">Direccion</label>
                    </div>
                    <div className="me-0 col-9 pe-0">
                        <input type="text" name="direction" id="inputDirection" className="form-control" aria-describedby="titleHelpInline" value={formData.direction} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-between">
                    <div className="col-2 ms-1">
                        <label htmlFor="inputDescription" className="col-form-label">Descripcion</label>
                    </div>
                    <div className="me-0 col-8 col-lg-9 col-md-9 pe-0">

                        <textarea className="form-control" name="description" id="inputDescription" aria-label="With textarea" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-between">
                    <div className="col-2 ms-1">
                        <label htmlFor="inputPrice" className="col-form-label">Precio/Dia</label>
                    </div>
                    <div className="me-0 col-9 pe-0">
                        <input type="text" name="price" id="inputPrice" className="form-control" aria-describedby="titleHelpInline" value={formData.price} onChange={handleChange} />

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-between">
                    <div className="col-2 ms-1">
                        <label htmlFor="inputCapacity" className="col-form-label">Capacidad</label>
                    </div>
                    <div className="me-0 col-9 pe-0">
                        <input type="text" name="capacity" id="inputCapacity" className="form-control" aria-describedby="titleHelpInline" value={formData.capacity} onChange={handleChange} />

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 justify-content-end">

                    <button className="btn btn-success" onClick={handleSubmit}>
                        Postear
                    </button>
                </div>

            </div>


        </>


    )

}