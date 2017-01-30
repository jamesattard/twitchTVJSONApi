function getStreamers() {

  var twitchChannels =
    [
      "ESL_SC2",
      "freecodecamp",
      "doesnotexist1"
    ];

  twitchChannels.map(function(channel) {
    $.ajax({ // determine if stream is online or not
      // url: "https://api.twitch.tv/kraken/streams/" + channel,
      // headers: {
      //   'Client-ID': '821w445od23f4yucok8wjoxzcc7773'
      // },
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + channel,
      dataType: 'json',
      success: function(res) {
        var game,
            status;
        if (res.stream == null) {
          game = "Offline";
          status = "offline";
        } else {
          game = res.stream.game;
          status = "online";
        };

        $.ajax({ // get channel information
          // url: "https://api.twitch.tv/kraken/channels/" + channel,
          // headers: {
          //   'Client-ID': '821w445od23f4yucok8wjoxzcc7773'
          // },
          url: "https://wind-bow.gomix.me/twitch-api/channels/" + channel,
          dataType: 'json',
          success: function(res) {
            console.log(res);
            game = res.url === undefined ? 'Account not found!' : game;
            var logo = res.logo != null ? res.logo : "https://dummyimage.com/50x50&text=X",
              name = res.display_name != null ? res.display_name : channel,
              description = status === "online" ? ': ' + res.status : "",
              html = '<div class="row ' +
              status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
              logo + '" class="logo" height="50" width="50"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
              res.url + '" target="_blank">' +
              name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
              game + '<span class="hidden-xs">' +
              description + '</span></div></div>';
            //console.log(html);
            status === "online" ? $("#streamerList").prepend(html) : $("#streamerList").append(html);

            } // end of ajax success call #2 function
          }); // end of ajax call #2
        } // end of ajax success call #1 function
      }); // end of ajax call #1
    }); // end of map array
  }; // end of getStreamers()

$(document).ready(function() {
  getStreamers();
});
