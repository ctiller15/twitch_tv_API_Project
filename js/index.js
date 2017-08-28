/*Personal notes:

After doing this, it became more evident that I'm not entirely comfortable with styling using javascript and CSS. I ended up doing more lines than I would like to get things done that could be done in one or two with CSS. I need to understand how to get them to both work in tandem to maximize productivity.
*/

//Creating a list with the names of all of the streamers.
var streamNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "stickpagetv", "gildedguy"]

var streamOBJ = {
  streamInfo: [],
  //Throws all of the data into an object.
  addStream: function(data, data2, ind){
    var streamer = {
      name: data[0]["display_name"],
      origName: streamNames[ind],
      game: data[0]["game"],
      status: data[0]["status"],
      link: data[0]["url"],
      logo: data[0]["logo"],
      banner: data[0]["profile_banner"],
      banCol: data[0]["profile_banner_background_color"],
      offImg: data[0]["video_banner"]
    }
    if(data2[0]["stream"]){
      streamer.onOff = "Online";
      //console.log(data2[0]["stream"]["preview"]);
      //adding the current preview to the streamer's info, only if they're online.
      streamer.preview = data2[0]["stream"]["preview"];
      this.streamInfo.push(streamer);
    }else{
      streamer.onOff = "Offline";
      streamer.preview = "none";
      this.streamInfo.push(streamer);
    }
    streamOBJ.writeStream(streamer);
  },
  /*
  *********************************************
  *********************************************
  *********************************************
  *********************************************
  *********************************************
  */
  writeStream: function(theStream){
    //Selecting the entire div with all of the available streamers.
    var container = document.querySelector(".streams");
    //Creating a banner to hold all of the streamer's info.
    var banner = document.createElement("div");
    banner.classList.add("banner");
    //Adding online and offline classes to the entire banner.
    
    if(theStream.onOff === "Online"){
      banner.classList.add("online");
    } else if(theStream.onOff === "Offline"){
      banner.classList.add("offline");
    }
    
    //This is the inner tab. It will contain all of the important bits.
    var tab = document.createElement("div");
    tab.classList.add("tab");
    if(theStream.status !== 404){
      //The baseinfo section of the tab will contain the streamer's profile pic/logo, as well as their display name.
      var baseInfo = document.createElement("div");
      baseInfo.classList.add("identifier");
      //Creating an element for the image, and adding the image to the element.
      var baseImg = document.createElement("img");
      //https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png
      if(theStream.logo){
        baseImg.setAttribute("src", theStream.logo);
      } else{
        baseImg.setAttribute("src", 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png');
      }
      //Same for the name as well.
      var baseName = document.createElement("p");
      baseName.textContent = theStream.name;
      //Adding in the user's color if it exists...
      if(theStream.banCol){
        baseInfo.style.backgroundColor = theStream.banCol;
      }
      //Appending to baseInfo.
      baseInfo.appendChild(baseImg);
      baseInfo.appendChild(baseName);
      //This section will contain the remaining information. Including their current status and a link to their channel.
      var channelInfo = document.createElement("div");
      channelInfo.classList.add("mainInfo");
      //channelOnOff tells us whether the channel is online or offline.
      var channelOnOff = document.createElement("p");
      channelOnOff.innerHTML = "Status: " + theStream.onOff;
      //Creating an element to hold the link.
      var channelLink = document.createElement("a");
      channelLink.setAttribute("href", theStream.link);
      channelLink.setAttribute("target", "blank");
      //Unneeded. The link stretches to the entire tab.
      //channelLink.textContent = "Link";
      //Creating some content that says what they are currently playing.
      var channelPlay = document.createElement("p");
      if(theStream.onOff === "Online"){
        if(theStream.game){
      channelPlay.innerHTML = "Playing " + theStream.game;
        }
        if(theStream.banner){
          var string = theStream.banner;
          channelInfo.style.background = "linear-gradient(rgba(20,20,20,.7),rgba(20,20,20,.7)), url('" + string + "') no-repeat";
          channelInfo.style.backgroundSize = "100% 100%";
          //One that styles on mouseover.
          channelInfo.addEventListener('mouseover', function(){
            channelInfo.style.background = "linear-gradient(rgba(100,100,100,.7),rgba(100,100,100,.7)), url('" + string + "') 0px 0px/100% 100% no-repeat";
                                       });
            //Creating a function that resets styles on mouseout.
            channelInfo.addEventListener('mouseout', function(){
              //Putting a filter over the background image so it doesn't kill the text.
              channelInfo.style.background = "linear-gradient(rgba(20,20,20,.7),rgba(20,20,20,.7)), url('" + string + "') 0px 0px/100% 100% no-repeat";
              //Making sure that the background fits the container.
            });
          }
        } else if(theStream.onOff === "Offline"){
          if(theStream.offImg){
            //Weird disconnect between javascript and CSS. Read up more on it.
            var string = theStream.offImg;
            channelInfo.style.background = "linear-gradient(rgba(20,20,20,.7),rgba(20,20,20,.7)), url('" + string + "') 0px 0px/100% 100% no-repeat";
            channelInfo.addEventListener('mouseover', function(){
              channelInfo.style.background = "linear-gradient(rgba(100,100,100,.5),rgba(100,100,100,.5)), url('" + string + "') 0px 0px/100% 100% no-repeat";
            });
            channelInfo.addEventListener('mouseout', function(){
              channelInfo.style.background = "linear-gradient(rgba(20,20,20,.5),rgba(20,20,20,.5)), url('" + string + "') 0px 0px/100% 100% no-repeat";
            });
          } else {
            channelInfo.style.background = "linear-gradient(rgba(20,20,20,.7),rgba(20,20,20,.7)), url('" + "https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png" + "')";
            channelInfo.addEventListener('mouseover', function(){
              channelInfo.style.background = "linear-gradient(rgba(100,100,100,.5),rgba(100,100,100,.5)), url('" + "https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png" + "')";
            });
channelInfo.addEventListener('mouseout', function(){
              channelInfo.style.background = "linear-gradient(rgba(20,20,20,.7),rgba(20,20,20,.7)), url('" + "https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png" + "')";
            });
          }
        }
      
      //Appending everything to channelLink...
      channelLink.appendChild(channelOnOff);
      channelLink.appendChild(channelPlay);
      //Appending to channelInfo...
      channelInfo.appendChild(channelLink);

      //Finally, I want to add a preview. The code is currently commented out until I have a streamer online to test it.

      /*
      var preview = document.createElement("div");
      var previewPic = document.createElement("img");
      previewPic.setAttribute("src", theStream.preview);
      */

      //Appending baseInfo, channelInfo to tab.
      tab.appendChild(baseInfo);
      tab.appendChild(channelInfo);
    }else{
      var notExist = document.createElement('p');
      notExist.innerHTML = "404 error, streamer" + ' "' + theStream.origName + '" ' + "not found."
      tab.appendChild(notExist);
      banner.classList.add("streamFail");
    }
    //Appending tab to banner.
    banner.appendChild(tab);
    //Appending banner to container.
    container.appendChild(banner);
  }
}

//Calls the api twice, collects the information, and then calls another function to put all of that information into an array.
function grabData(name, index, array){
  $.when($.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + name + "?callback=?"), $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + name + "?callback=?")
).then(function(data, moreData){
    // var stuff = document.querySelector(".blank");
    // stuff.innerHTML = JSON.stringify(moreData);
    streamOBJ.addStream(data, moreData, index);
});
}

//Where all the magic starts.
streamNames.forEach(grabData);