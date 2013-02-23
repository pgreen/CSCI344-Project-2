var main = function(){
}//main

function startTweet() {
  tweetFunction();
} //startTweet

function tweetFunction() {
  var twitter = new ctwitter.CTwitter();
  var countTweet = 1;
  twitter.stream("statuses/filter", {lang:"en", track:[$("#user_input").val()]
  }, function(stream){
    stream.on("data", function(tweet){
      if(countTweet <= 5){
        $('#' + countTweet).html('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
          countTweet = countTweet + 1;
      } else {
        $('p:first').fadeOut(500, function() {
          $('p:first').remove();
          $('body').append('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p></div>');
          $('p:last').fadeIn(500);
        });
      countTweet = countTweet + 1;
      } //esle
    }); //tweet
  }); //stream
} //tweetFunction

$(document).ready(main);