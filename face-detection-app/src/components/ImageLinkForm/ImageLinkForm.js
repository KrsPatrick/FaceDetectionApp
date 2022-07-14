import React from 'react';
import './ImageLinkForm.css'
import Clarifai from 'clarifai'
import env from "react-dotenv";

const app = new Clarifai.App({
    apiKey:  env.CLARIFAI_KEY
   });

const ImageLinkForm = ({id, handleChange, setSt, url, calculateFaceLocation, displayFaceBox }) => {


    function onSubmit(){
        setSt();
        app.models
        .predict(
        Clarifai.FACE_DETECT_MODEL,
        // THE JPG
        url()
        )
        .then((response) => {
            if (response) {
                fetch("http://localhost:8000/image", {
                    method: 'post',
                    headers: {'Content-Type': "application/json"},
                    body: JSON.stringify({
                        id: id
                    })
                })
                
            }
            displayFaceBox(calculateFaceLocation(response))
        })
        .catch((err) => {
        console.log(err);
        });
    }

    return (
        <div>
            <p className='f3'>
                {'Theese eyes will detect faces in you pictures'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center '>
                    <input className='f4 pa2 w-70 center' type={'text'} onChange={handleChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;