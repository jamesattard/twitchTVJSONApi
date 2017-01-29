function getStreamers() {

  var twitchChannels =
    [
      "ESL_SC2",
      "OgamingSC2",
      "cretetion",
      "freecodecamp",
      "storbeck",
      "habathcx",
      "RobotCaleb",
      "noobs2ninjas",
      "doesnotexist1"
    ];

  var channelStatus,
      streamStatus,
      logo;

  twitchChannels.map(function(i) {
    streamerName = i;
    $.ajax({ // query channel info (determine if username exists)
      url: "https://api.twitch.tv/kraken/channels/" + i,
      headers: {
        'Client-ID': '821w445od23f4yucok8wjoxzcc7773'
      },
      success: function(res) {
        //console.log(res);
        logo = res.logo;
        $.ajax({ // query stream info (get stream status)
          url: "https://api.twitch.tv/kraken/streams/" + i,
          headers: {
            'Client-ID': '821w445od23f4yucok8wjoxzcc7773'
          },
          success: function(res) {
            description = res.stream == null ? 'Offline' : res.stream.channel.status;
            $('#streamersAll').append('<p>' +
              '<img src="' + logo + '" height="50" width="50">' +
              i + ': ' + description + '</p>'); // refresh results
          },
          error: function(error){
            console.log(error);
          }
        }); // end of .ajax() "stream info"

        //$('#streamerList').text(''); // refresh results
      },
      error: function(error){
        if (error.status == 404){
          logo = 'https://unsplash.it/50/50?image=2';
          description = 'Not found';
          $('#streamersAll').append('<p>' +
            '<img src="' + logo + '" height="50" width="50">' +
            i + ': ' + description + '</p>');
        }
      }
    }); // end of .ajax() "channel info"

  }); // end of twitchChannels.map()

} // end of function getStreamers(status)

$(document).ready(function() {
  getStreamers();
});
