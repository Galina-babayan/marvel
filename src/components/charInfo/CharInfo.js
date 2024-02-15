import { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);   
 

    const updateChar = () => {
        const {charId} = props;
       
        if (!charId) {
            return;
        }

        clearError();
        // onCharLoading();

        getCharacter(charId)
            .then(onCharLoaded);
                        
    }

    const onCharLoaded = (char) => {
        setChar(char);
        // setLoading(false);   
    }

    // const onCharLoading = () => {
    //     setLoading(true); 
    // }

    // const onError = () => {
    //     setLoading(false); 
    //     setError(true);     
    // }

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;     
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char = {char}/> : null;

  
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}            
            </div>
        )
 
}

// class CharInfo extends Component {

//     state = {
//         char: null,
//         loading: false,
//         error: false
//     }

    
//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps){
//         if (this.props.charId !== prevProps.charId){
//             this.updateChar();
//         }
//     }

//     updateChar = () => {
//         const {charId} = this.props;
       
//         if (!charId) {
//             return;
//         }

//         this.onCharLoading();

//         this.marvelService
//             .getCharacter(charId)
//             .then(this.onCharLoaded)
//             .catch(this.onError);

//             console.log(charId);
//     }

//     onCharLoaded = (char) => {
//         this.setState({
//             char,
//             loading: false
//         })
//     }

//     onCharLoading = () => {
//         this.setState({
//             loading: true
//         })
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true
//         })
//     }

//     render(){
//         const {char, loading, error} = this.state;

//         const skeleton = char || loading || error ? null : <Skeleton/>;
//         const errorMessage = error ? <ErrorMessage/> : null;     
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error || !char) ? <View char = {char}/> : null;

//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}            
//             </div>
//         )
//     }
 
// }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, imgStyle, comics} = char;

    let imgFit = {'objectFit': 'cover'};
    if (imgStyle){
        imgFit = {'objectFit': 'contain'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgFit}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item, i) => {
                    if(i > 9) return;
                    return (
                        <li className="char__comics-item"
                        key={i}>
                            {item.name}                           
                        </li> 
                    )
                     
                })}                            
            </ul>            
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;