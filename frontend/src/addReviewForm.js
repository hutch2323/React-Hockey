import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function AddReviewForm({ onNewReview = f => f }){
    const [name, setName] = useState("");
    const [date, setDate] = useState([]);
    const [actors, setActors] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const submit = evt => {
        evt.preventDefault();
        onNewReview(name, date, actors.split(", "), poster, rating);
        setName("");
        setDate(null);
        setActors([]);
        setPoster("");
        setRating(0);
        navigate('/');
    }

    const onFileChange = evt => {
        let file = evt.target.files[0];
        setPoster(URL.createObjectURL(file));
    }

    return(
        <>
            <form className="pt-3 container border border-dark" onSubmit={submit} style={{textAlign:"left", maxWidth:"720px"}}>
                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="name">Movie Name:</label>
                    <input 
                        className="form-control"
                        value={name} 
                        onChange = {evt => setName(evt.target.value)}
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                    />
                </div>

                <div className="mb-4 row g-3 align-items-center">
                    <div className="col-auto">
                        <label className="fw-bold" htmlFor="date">Release Date:</label>
                    </div>
                    <div className="col-auto">
                        <input 
                            value={date}
                            onChange = {evt => setDate(evt.target.value)}
                            type="date" 
                            id="date" 
                            name="date" 
                            required
                        />
                    </div>
                    <div id="spacer" className="col-auto px-5">

                    </div>
                    <div id="ratingLabel" className="col-auto">
                        <label htmlFor="rating"><b>Rating</b> (out of 5):</label>
                    </div>
                    <div id="ratingCol" className="col-auto">
                        <select 
                            value={rating}
                            onChange = {evt => setRating(evt.target.value)} 
                            id="rating" 
                            name="rating" 
                            required
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="actors"><b>Actors</b> (Separate by comma & space -> Ex: Daniel Craig, Javier Bardem):</label>
                    <input 
                        className="form-control"
                        value={actors} 
                        onChange = {evt => setActors(evt.target.value)}
                        type="text" 
                        id="actors" 
                        name="actors" 
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold" htmlFor="image">Poster:</label>
                    <input 
                        className="form-control"
                        onChange = {evt => onFileChange(evt)} 
                        type="file" 
                        id="poster" 
                        name="poster" 
                        accept=".png, .jfif, .jpg, .jpeg" 
                        required
                    />
                </div>

                <div className="pb-3" style={{textAlign:"center"}}>
                    <button className="btn btn-primary" type="submit" value="Submit">Add Review</button>
                </div>
            </form>
        </>
    );
}