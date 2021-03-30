import React from 'react';

const Event = ({event}) => {
    const deleteEvent = id => {
        fetch('http://localhost:5000/deleteEvent/'+id, {
            method: 'DELETE'
        })
        .then(res => console.log(res))
    }
    
    return (
        <div>
            <img style={{height: '300px'}} src={event.image} alt='' />
            <h3>{event.name} <button onClick={() => deleteEvent(event._id)}>Delete</button></h3>
        </div>
    );
};

export default Event;