import React, { useState } from 'react';
import { useForm } from "react-hook-form";
const axios = require('axios');

const AddEvent = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const eventData = {
            name: data.name,
            image: imageURL
        }
        
        const url = 'http://localhost:5000/addEvent';
        imageURL && fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(eventData)
        })
        .then(res => console.log(res))
        // .then(data => console.log(data))
    }

    const handleImageUpload = e => {
        const imageData = new FormData();
        imageData.set('key', '396c9f1d9024868f3ecef6aaa44cbd7b');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  
    return (
        <div>
            <h2>Add Your Event</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue="New Event" ref={register} />
            <br/>
            <input name="exampleRequired" type='file' onChange={handleImageUpload} />
            <br/>
            <input type="submit" />
            </form>
        </div>
    );
};

export default AddEvent;