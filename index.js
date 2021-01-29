async function loadSongs(artist) {
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "8d9fb3be5amsh6b7cc7a4df74f1dp1f9ce6jsnac0f0934140f",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
        })
    
    let songsResponse = await response.json()
    return songsResponse.data;
}

async function renderSongs(artist) {
    let songs = await loadSongs(artist)

    let songsDiv = document.getElementById("songs")

    let artistSection = document.createElement("div") //creating a parent div
    let title = document.createElement("h2") // creating the title of the section
    title.innerText = "Songs from " + artist //setting the text for it
    artistSection.appendChild(title) //adding it to the artist section

    let songsContainer = document.createElement("div") // creating a container for my songs
    songsContainer.classList.add("song-list") // i'm adding a class for future use

    songs.forEach(song => {
        let songCard = document.createElement("div")
        songCard.classList.add("song-card")
        songCard.innerHTML +=  //for each song, i'm using stefano's model to create a new card
        `<img
                src="${song.album.cover_medium}"
                class="song-card-image"
                alt="David Bowie picture"
            />
            <div class="song-card-info">
                <div class="song-card-artist">${song.artist.name}</div>
                <div class="song-card-album">${song.album.title}</div>
                <div class="song-card-title">${song.title}</div>
            </div>
            <div class="song-card-play"></div>`

        songsContainer.appendChild(songCard)

        songCard.addEventListener("click", (e) => {
            // take a reference to the player part
            let player = document.getElementById("player")
            // add the picture of the song
            // add the title of the song
            player.innerHTML = `
                <div class="player-content">
                    <img src=${song.album.cover_medium} alt="picture song" />
                    <p>${song.title}</p>
                </div>
            `
            // play the song
            let audioPlayer = document.getElementById("audio-player")
            audioPlayer.src = song.preview
            //audioPlayer.play()
        })
    })

    artistSection.appendChild(songsContainer) //add the songs container to the artist section

    songsDiv.appendChild(artistSection) //add the artist section to the page

}

let menuEntries = [ "Your favourites", "Top hits", "This winter", "Last summer", "Tropical Vibes", "Top 20 UK", "Best of Metal", "Hip Hop Daily", "Night out"]

function loadMenu() {
    let menu = document.querySelector("#menu") // document.getElementById("menu")
    menu.innerHTML += menuEntries.map(entry => `<li>${entry}</li>`).join("")
}

async function searchSong(){
    // read the value from the search-input
    let searchText = document.getElementById("search-text")
    let searchValue = searchText.value

    // CLEAR IF YOU WANT, OF THE CURRENT SEARCH RESULTS
    // let songsDiv = document.getElementById("songs")
    // songsDiv.textContent = ""
    // load songs
    await renderSongs(searchValue)
}
