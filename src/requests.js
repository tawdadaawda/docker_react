const API_KEY = "1002b2e83aa426f04902c4516fec3c28";

export const requests ={
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-us`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`/discover/tv?api_key=${API_KEY}&languager=en-us`,
    fetchActionMovies:`/discover/tv?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`/discover/tv?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentMovies:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
}

export default requests