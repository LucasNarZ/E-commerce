import React, { useEffect, useState } from 'react';

import iconStarYellow from '../icons/icon_star_yellow.svg';

import { Navigate, useNavigate } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux';

import '../css/styles.css';
import { changeActiveBook } from '../reducer';
import { addToCart } from '../reducer';

export function Book(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cart, setCart] = useState(useSelector(state => state.cart))

    

    const handleClick = () => {
        navigate('/product');
        dispatch(changeActiveBook({
            title: props.title,
            description: props.description,
            rating: props.rating,
            author: props.author,
            language: props.language,
            id: props.bookId,
            image: props.image,
            price: props.price,
            publisher: props.publisher,
            pageCount: props.pageCount,
            category: props.category
        }))
    }

    return(
        <div className='book' onClick={handleClick}>
            <img src={props.image} alt="bookImage" className='book-image'/>
            <h1>{props.title}</h1>
            <p>{props.author}</p>
            <div className="book-rating">
                {props.rating >= 1 && <img src={iconStarYellow} className='rating-star'/>}
                {props.rating >= 2 && <img src={iconStarYellow} className='rating-star'/>}
                {props.rating >= 3 && <img src={iconStarYellow} className='rating-star'/>}
                {props.rating >= 4 && <img src={iconStarYellow} className='rating-star'/>}
                {props.rating === 5 && <img src={iconStarYellow} className='rating-star'/>}
                {props.rating}
            </div>
            <p>{"$" + props.price}</p>
            <button className='addToCart' onClick={(e) => {
                e.stopPropagation();
                navigate('/cart')
                if(!cart.some(book => book.id === props.bookId)){
                    dispatch(addToCart({
                        id: props.bookId,
                        title: props.title,
                        author: props.author,
                        image:props.image,
                        price: props.price,
                    }))
                }
                console.log(cart)
            }}>Add to Cart</button>
        </div>
    )
}