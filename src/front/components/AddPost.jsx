import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AddPost = (props) => {

    const { store, dispatch } = useGlobalReducer()



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
                    <input className="form-control" type="file" id="formFileMultiple" multiple />
                </div>


            </div>
            <div className="d-flex justify-content-center mt-3">

                <div className="d-flex ms-0 col-11 col-sm-7 col-md-7 col-lg-7 gap-5">
                    <div className="col-2">
                        <label htmlFor="inputTitle" className="col-form-label">Titulo</label>
                    </div>
                    <div className="ms-0 col-9">
                        <input type="text" id="inputTitle" className="form-control" aria-describedby="titleHelpInline" />
                    </div>
                </div>
            </div>



        </>


    )

}