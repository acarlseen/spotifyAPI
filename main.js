// Declasrations for our song values
let song;
let playSong;

//spotify client creds
const clientId="88a9ddc18bdf421f9950b49f8cfcad22";
const clientSecret="09b97df7030f469ab3446660b63e04c6";

const __getToken= async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

// Function to get song info when the image is clicked
/**
* @param img_index
* @param item_index
*
*
*/

async function clickedEvent(img_index, item_index) {
    // get track name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value; //img tag, then looking at attribute[1]
    // ( in this case that is the alt="" attribute)
    console.log(track)
    let token = await __getToken();

    let headers = new Headers([
        ['Content-Type', 'application/icon'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method:'GET',
        headers: headers
    });

    let result = await fetch (request)

    let response = await result.json();

    console.log(response)
    let song = response.tracks.items[item_index].preview_url

  
    // TODO: check if other song is playing and, if so, stop it

    // check if song is playing and stop it
    if (playSong) {
        stopSnippet();
    }
    songSnippet(song)

}

/**
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event = Mouse event given by the action from our user
 * 
 *  Function produces songs from the clickedEvent based
 * on index of image.
 */

function getSong(id, event) {
    switch(id) {
        case 'fig1' : { //me
            event.stopPropagation();
            clickedEvent(0,0)
            break;
        }
    
        case 'fig2' : { //in rainbows
            event.stopPropagation();
            clickedEvent(1,0)
            break;
        }
    
        case 'fig3' : { // house is burning
            event.stopPropagation();
            clickedEvent(2,0)
            break;
        }
    
        case 'fig4' : { // macplus - flower store
            event.stopPropagation();
            clickedEvent(3,0)
            break;
        }
    
        case 'fig5' : { // black fast
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }

        case 'fig6' : { // gojira
            event.stopPropagation();
            clickedEvent(5,0)
            break;
        }

        case 'fig7' : { // khemmis
            event.stopPropagation();
            clickedEvent(6,0)
            break;
        }

        case 'fig8' : { // justice
            event.stopPropagation();
            clickedEvent(7,0)
            break;
        }
    }
}

  // TODO: Add songSnippet function to play the selected song

/**
 * @param = url
 * 
 * url = Song Preview_url
 * 
 * function will return an audio clip given by the preview url
 */

function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

    // TODO: Create a function to stop the music


/**
 * NO PARAMS
 * 
 * function returns event to stop song snippet
 */

function stopSnippet(){
    return playSong.pause();
}