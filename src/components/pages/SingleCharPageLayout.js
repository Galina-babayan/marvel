import AppBanner from '../appBanner/AppBanner';
import { useParams, Link } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicsPage.scss';

const SingleCharPageLayout = () => {
    const {id} = useParams();
    // const [comics, setComics] = useState(null);
    const [data, setData] = useState(null);
    const {loading, error, getCharacter,  clearError} = useMarvelService();

    useEffect(() => {
        updateItem();
        console.log(id);
    }, [id]);   
 

    const updateItem = () => {
        clearError();

        getCharacter(id)
            .then(onItemLoaded);
                        
    }

    const onItemLoaded = (data) => {
        setData(data);
        console.log('765')
        // setLoading(false);   
    }

    const errorMessage = error ? <ErrorMessage/> : null;     
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <View data = {data}/> : null;

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

const View = ({data}) => {
    const {name, description, thumbnail, imgStyle } = data; 

    let imgFit = {'objectFit': 'cover'};
    if (imgStyle){
        imgFit = {'objectFit': 'contain'}
    } 

    return (
        <>        
            <img src={thumbnail} alt={name} className="single-comic__img" style={imgFit}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>                 
            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </>       
    )
}

export default SingleCharPageLayout;