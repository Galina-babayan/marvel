class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=d729996df4927f144c9d0bc5a850cd31';
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);        
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

  
    // /image_not_available
    //console.log(str.includes("image_not_available"));


    _transformCharacter = (char) => {     
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
}

export default MarvelService;