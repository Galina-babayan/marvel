import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    // https://gateway.marvel.com:443/v1/public/comics?apikey=d729996df4927f144c9d0bc5a850cd31
    // https://gateway.marvel.com:443/v1/public/comics?apikey=d729996df4927f144c9d0bc5a850cd31

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=d729996df4927f144c9d0bc5a850cd31';
    const _baseOffset = 210;
    // getResource = async (url) => {
    //     let res = await fetch(url);

    //     if(!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);        
    //     }

    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      
        return res.data.results.map(_transformCharacter);
        
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
      
        return res.data.results.map(_transformComics);
        
    }

    const getCharacter = async (id) => {
 
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
   
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (id) => {
 
        const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
   
        return _transformComics(res.data.results[0]);
    }

  
    // /image_not_available
    //console.log(str.includes("image_not_available"));


    const _transformCharacter = (char) => {     
        let thumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;

        // console.log(thumbnail.includes("image_not_available"));        

        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            imgStyle: thumbnail.includes("image_not_available"),
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};
   
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics};
}

export default useMarvelService;

// class MarvelService {
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//     _apiKey = 'apikey=d729996df4927f144c9d0bc5a850cd31';
//     _baseOffset = 210;
//     getResource = async (url) => {
//         let res = await fetch(url);

//         if(!res.ok){
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);        
//         }

//         return await res.json();
//     }

//     getAllCharacters = async (offset = this._baseOffset) => {
//         const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
//         return res.data.results.map(this._transformCharacter);
//     }

//     getCharacter = async (id) => {
//         const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
//         return this._transformCharacter(res.data.results[0]);
//     }

  
//     // /image_not_available
//     //console.log(str.includes("image_not_available"));


//     _transformCharacter = (char) => {     
//         let thumbnail = char.thumbnail.path + '.' + char.thumbnail.extension;

//         // console.log(thumbnail.includes("image_not_available"));        

//         return {
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             imgStyle: thumbnail.includes("image_not_available"),
//             id: char.id,
//             comics: char.comics.items
//         }
//     }
// }

