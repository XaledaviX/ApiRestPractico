const api = axios.create({
  baseURL:'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: apiKey
}
});

const containerCategory = document.getElementById('categoriesPreview-list');
const sectionCategories = document.getElementById('genericList')

const apiSectionListMovies = 'trending/movie/day?language=en-US&limit';
const apiSectionMovieList = 'genre/movie/list'

function load(){
  const overlay = document.getElementById('overlay')
  overlay.disable = true
}
load()

async function getTrendingApi(){
try{
    const response = await api(apiSectionListMovies);
    console.log("peticion trending")
    console.log(response);

    let add = `${response.data.results.map(object => `
    <div class="movie-container" onclick="getMovieDetailsSection('${object.id}')">
    <img
      src="https://image.tmdb.org/t/p/w200${object.poster_path}"
      class="movie-img-${object.id}"
      alt="${object.title}"
    />
  </div>`).join('')}`;

  trendingMoviesPreviewList.innerHTML = add;
    
}catch (error) {
  console.error(`Tu error: ${error}`);
} 
}

async function getCategoryApi(){
try{
  const response = await api(apiSectionMovieList);
  console.log("peticion categorias")
  console.log(response);

  let add = `${response.data.genres.map(object => `
    <div class="category-container">
    <h3 id="id${object.id}" class="category-title" onclick="categoriesSections(${object.id}, '${object.name}')">
    ${object.name}
    </h3>
    </div>`).join('')}`;

  containerCategory.innerHTML = add;
  
}catch (error) {
  console.error(`Tu error: ${error}`);
}   
}

async function categoriesSections(id, name){
  location.hash = `#category=${id}-${name}`;

  try{
    const response = await api('discover/movie', {
      params:{
        with_genres: id,
      },
    });

    console.log(response)
  
    let add = `${response.data.results.map(object => `
    <div class="movie-container" onclick="getMovieDetailsSection('${object.id}')">
    <img
      src="https://image.tmdb.org/t/p/w300/${object.poster_path}"
      class="movie-img"
      alt="${object.title}"
    />
  </div>`).join('')}`;
  
  sectionCategories.innerHTML = add;
    
  }catch (error) {
    console.error(`Tu error: ${error}`);
  }   
}

async function getMoviesBySearch(query){
    try{
      const response = await api('search/movie', {
        params:{
          query
        },
      });
  
      console.log(response)
    
      let add = `${response.data.results.map(object => `
      <div class="movie-container" onclick="getMovieDetailsSection('${object.id}')">
      <img
        src="https://image.tmdb.org/t/p/w300/${object.poster_path}"
        class="movie-img"
        alt="${object.title}"
      />
    </div>`).join('')}`;
    
    genericSection.innerHTML = add;
      
    }catch (error) {
      console.error(`Tu error: ${error}`);
    }   
}

async function getTrendingSection(){
    try{
      const response = await api(apiSectionListMovies);
      console.log("peticion seccion trending")
      console.log(response);
    
      let add = `${response.data.results.map(object => `
    <div class="movie-container" onclick="getMovieDetailsSection('${object.id}')">
    <img
      src="https://image.tmdb.org/t/p/w200${object.poster_path}"
      class="movie-img-${object.id}"
      alt="${object.title}"
    />
  </div>`).join('')}`;

  genericSection.innerHTML = add;
      
    }catch (error) {
      console.error(`Tu error: ${error}`);
    }   
}

async function getMovieDetailsSection(id){
  location.hash = `#movie=${id}`
  console.log(id)
  try{
    const response = await api(`/movie/${id}`);
    console.log('respuesta movie')
    console.log(response)
    const movieUrl = `https://image.tmdb.org/t/p/w500/${response.data.
    poster_path}`
    console.log(movieUrl)
    

    movieDetailTitle.textContent = response.data.title;
    movieDetailScore.textContent = response.data.vote_average;
    movieDetailDescription.textContent = response.data.overview;
    headerSection.style.background = `url(${movieUrl})`;
    let add =  `${response.data.genres.map(object => `
    <div class="category-container">
    <h3 id="id${object.id}" class="category-title">
    ${object.name}
    </h3>
    </div>`).join('')}`;
    
    movieDetailCategoriesList.innerHTML = add;

  }catch (error) {
    console.error(`Tu error: ${error}`);
  }   
  getRelatedMovies(id)
}

async function getRelatedMovies(id){
  try{
  const response = await api(`movie/${id}/recommendations`);
  console.log(response);

  let add = `${response.data.results.map(object => `
      <div class="movie-container" onclick="getMovieDetailsSection('${object.id}')">
      <img
        src="https://image.tmdb.org/t/p/w300/${object.poster_path}"
        class="movie-img"
        alt="${object.title}"
      />
    </div>`).join('')}`;

  relatedMoviesContainer.innerHTML = add;
  
    
  }catch (error) {
    console.error(`Tu error: ${error}`);
  }   
}
    