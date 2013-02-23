var main = function(){
}//main

function startTweet() {
  tweetFunction();
} //startTweet

function tweetFunction() {
  var twitter = new ctwitter.CTwitter();
  var countTweet = 1;
  twitter.stream("statuses/filter", {lang:"en", track:["Ruby On Rails","Node.js", "Oracle SQL"]
  }, function(stream){
    stream.on("data", function(tweet){
      if(countTweet <= 5){
        $('#' + countTweet).html('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
        countTweet = countTweet + 1;
      } else {
        $('div:first').fadeOut(500, function() {
          $('div:first').remove();
          $('body').append('<div class="hide"><p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p></div>');
          $('div:last').fadeIn(500);
        });
      countTweet = countTweet + 1;
      } //esle
    }); //tweet
  }); //stream
} //tweetFunction

$(document).ready(main);