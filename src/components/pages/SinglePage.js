import { useParams, Link } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import SingleCharPageLayout from './SingleCharPageLayout';

import './singleComicsPage.scss';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateItem();
        console.log('665')
    }, [id]);   
 

    const updateItem = () => {
        clearError();
        // onCharLoading();
        switch (dataType) {
            case 'comics':
                getComics(id)
                .then(onItemLoaded);
                break;
            case 'character': 
                getCharacter(id)
                .then(onItemLoaded);           
        }
       
    }

    const onItemLoaded = (data) => {
        setData(data);
        console.log(data)
        // setLoading(false);   
    }

    const errorMessage = error ? <ErrorMessage/> : null;     
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data = {data}/> : null;

    return (
        <>
        <AppBanner/>       
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content} 
        </div>
        </>
    )
}

// const View1 = ({data}) => {
//     const {title, description, pageCount, thumbnail, language, price} = data;

//     return (
//         <>
           
//             <img src={thumbnail} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </>
//     )
// }

// const View2 = ({data}) => {
//     const {name, description, thumbnail, imgStyle } = data; 

//     let imgFit = {'objectFit': 'cover'};
//     if (imgStyle){
//         imgFit = {'objectFit': 'contain'}
//     } 

//     return (
//         <>        
//             <img src={thumbnail} alt={name} className="single-comic__img" style={imgFit}/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{name}</h2>
//                 <p className="single-comic__descr">{description}</p>                 
//             </div>
//             <Link to="/" className="single-comic__back">Back to all</Link>
//         </>       
//     )
// }

export default SinglePage;