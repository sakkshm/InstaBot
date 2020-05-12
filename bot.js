const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
var getJSON = require('get-json')

//User Credentials
const IG_USERNAME = "username";
const IG_PASSWORD = "password";


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


(async() => {

    var subreddits = ["memes", "dankmemes"] // list of subreddits 
    var sub = subreddits[getRandomInt(subreddits.length)] // get a random subreddit
    var url = "https://meme-api.herokuapp.com/gimme/" + sub;


    // IG login
    const ig = new IgApiClient();
    ig.state.generateDevice(IG_USERNAME);
    const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
    console.log(JSON.stringify(auth));


    // Get memes
    getJSON(url, function(error, response) {
        global.data = response;
    }).then(function() {
        console.log(global.data);



        (async() => {

            var caption = data.title + " \n\n\n \t\t\t Orignal post in " +
                data.subreddit + " : " +
                data.postLink +
                " Follow us for the most dank memes on Instagram. 🔥🔥🔥 " +
                "#meme #memes #bestmemes #instamemes #funny #funnymemes #dankmemes #edgymemes #spicymemes #nichememes #memepage #funniestmemes #dank #memesdaily #jokes #memesrlife #memestar #memesquad #humor #lmao #igmemes #lol #memeaccount #memer #relatablememes #funnyposts #sillymemes #nichememe #memetime";


            const imageBuffer = await get({
                url: data.url,
                encoding: null,
            });


            //publish post
            const publishResult = await ig.publish.photo({
                file: imageBuffer,
                caption: caption
            });

            console.log(publishResult);

            if (publishResult.status == "ok") {
                console.log("Posted succesfully!!!")
            } else {
                console.log("Erorr in posting to Instagram.....")
            }


        })();

    })


})();