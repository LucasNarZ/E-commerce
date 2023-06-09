import bookIcon from '../icons/icon_book.svg'
import iconSearch from '../icons/icon_search_.svg'
import userIcon from '../icons/icon_user.svg'
import cartIcon from '../icons/shopping-cart.svg'

import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import { Auth, getLogged, setLogged, getUser, setUser} from './auth.js'
import { SignIn } from './SignIn.js'

import { useSelector, useDispatch } from 'react-redux';

import { changeCategory } from '../reducer';

import '../css/styles.css';

export function Header(props){
    const hNavigate = useNavigate();
    const dispatch = useDispatch();
    const [Search, setSearch] = useState('');


    return(
        <header id='header'>
            <img src={bookIcon} alt="icon" className='book-icon' onClick={() => {
                hNavigate('/')
            }}/>
            <div className="search">
                <input type="text" placeholder="Search a book..."className='search-bar' onChange={(e) => {setSearch(e.currentTarget.value)}}/>
                <img src={iconSearch} alt="icon" className='search-btn' onClick={()  => {
                    hNavigate('/products');
                    dispatch(changeCategory(Search))
                }}/>
            </div>
            <div className={`btns ${!getLogged() ? "btns-not-logged" : "btn-logged"}`}>
                { !getLogged() && <a href="/SignIn" className='sign-in-link'>Sign In</a>}
                {!getLogged() && <button className='sign-up-btn' onClick={() => hNavigate('/SignUp')}>Sign Up</button>}
                {getLogged() && <p>{getUser().displayName}</p>}
                {getLogged() && <img src={userIcon} style={{width:30 + "px"}}alt='user'/>}
                <img src={cartIcon} alt='cart' className="cart-icon"  onClick={() => {
                    hNavigate('/cart')
                }}/>
            </div>
            
        </header>
    )
}