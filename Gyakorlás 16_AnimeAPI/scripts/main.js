const APIbutton = document.getElementById('getAPI');
const baseLink = 'https://api.jikan.moe/v4/anime'
APIbutton.addEventListener('click', getAPI);
var animeList = [];
//Get the input
const search = document.getElementById('searchBar');

function getAPI(e){
    e.preventDefault();
    fetch(`${baseLink}?q=${search.value}`)
    .then( response => {
        return response.json();
    }).then ( data => {
        updateDOM(data.data);
    })
    .catch( error => {
        console.log(`An error occured: ${error}`);
    })
}

function updateDOM(animeList) {
    var htmlContent = '';
    if (animeList.length === 0) {
        document.getElementsByTagName('main')[0].innerHTML =`
        <div>
            <h1>No results were found</h1>
        </div>
        `;
    }else {
        animeList.forEach( (anime) => {
            htmlContent += `
                <div class="card">
                    <div class="cardHead">
                        <h2>${anime.title}</h2>
                    </div>
                    <div class="cardPoster">
                        <img src=${anime.images.jpg.image_url} alt="Anime Poster" class="image">
                    </div>
                    <div class="cardDetails">
                        <p>${anime.synopsis}</p>
                    </div>
                </div>
            `;
            document.getElementsByTagName('main')[0].innerHTML = htmlContent;
        })
    }   
    //Get all the card items
    const cardsList = document.querySelectorAll('.card');

    //Add event listeners to all the cards
    cardsList.forEach((card => {
        card.addEventListener('click', openDetails);
    }))
}


//Add a toggle class to every card
function openDetails(e) {
    const cardItem = e.target.closest('.card');
    cardItem.classList.toggle('openDetails');
}