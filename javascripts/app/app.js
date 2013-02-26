var main = function(){
  };//main

  var startTime = 0;
  var countTweet = 0;
  var countJob = 0;
  var stopTime = 0;
  var totalTime = 0;
  var myWord = /job|hiring|resume/g;
  var firstCount = 0;

function startTweet() {
  startTime = new Date();
  tweetFunction();
}; //startTweet

function stopTweet() {
  stopTime = new Date().getTime();
  totalTime = stopTime - startTime;
  if(firstCount === 0){
    $('header').append('<h3>' + "From " + $.timeago(startTime) + " until now: " + countTweet + " total tweets, " +  countJob + " job related " + '</h3');
    firstCount = firstCount + 1;
  }else {
    $('h3:first').fadeOut(500, function() {
        $('h3:first').remove();
        $('header').append('<h3>' + "From " + $.timeago(startTime - totalTime) + " until now: " + countTweet + " total tweets, " +  countJob + " job related " + '</h3');
        $('h3:last').fadeIn(500);
      });//fading out and fading in
    }//else
  };// stopTweet

function tweetFunction() {
  var twitter = new ctwitter.CTwitter();
  countTweet = 1;
  twitter.stream("statuses/filter", {lang:"en", track:[$("#user_input").val()]
  }, function(stream){
    stream.on("data", function(tweet){
      if(countTweet <= 5){
        $('#' + countTweet).html('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
          countTweet = countTweet + 1;
      } else {
        $('p:first').fadeOut(500, function() {
          $('p:first').remove();
          $('article').append('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
          $('p:last').fadeIn(500);
        });//removeing the first one and fading in the last one
        countTweet = countTweet + 1;
        if(myWord.test(tweet.text)) {
          countJob = countJob + 1;
        }//test for job keywords
      } //else
    }); //tweet
  }); //stream
}; //tweetFunction

$(document).ready(main);