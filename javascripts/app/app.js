/*global $*/
var main = function () {
    "use strict";
    var $ = window.$,
        ctwitter = window.ctwitter,
        startTime = 0,
        countTweet = 0,
        countJob = 0,
        stopTime = 0,
        totalTime = 0,
        firstCount = 0,
        myWord = /job|hiring|resume/g;
    function tweetFunction() {
        var twitter = new ctwitter.CTwitter();
        countTweet = 1;
        twitter.stream("statuses/filter", {lang: "en", track: [$("#user_input").val()]
            }, function (stream) {
            stream.on("data", function (tweet) {
                if (countTweet <= 10) {
                    $('#' + countTweet).html('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
                    countTweet = countTweet + 1;
                } else {
                    $('p:first').fadeOut(500, function () {
                        $('p:first').remove();
                        $('article').append('<p><img src="' + tweet.profile_image_url + '" />' + tweet.text + '</p>');
                        $('p:last').fadeIn(500);
                    });//removeing the first one and fading in the last one
                    countTweet = countTweet + 1;
                } //else
                if (myWord.test(tweet.text)) {
                    countJob = countJob + 1;
                }//test for job keywords
            }); //tweet
        }); //stream
    }  //tweetFunction

    function startTweet() {
        startTime = new Date();
        tweetFunction();
    }  //startTweet

    function stopTweet() {
        stopTime = new Date().getTime();
        totalTime = stopTime - startTime;
        if (firstCount === 0) {
            $('header').append('<h3>' + "From " + $.timeago(startTime) + " until now: " + countTweet + " total tweets, " +  countJob + " job related " + '</h3');
            firstCount = firstCount + 1;
        } else {
            $('h3:first').fadeOut(500, function () {
                $('h3:first').remove();
                $('header').append('<h3>' + "From " + $.timeago(startTime - totalTime) + " until now: " + countTweet + " total tweets, " +  countJob + " job related " + '</h3');
                $('h3:last').fadeIn(500);
            });//fading out and fading in
        }//else
    }// stopTweet


    $("#start-click").click(startTweet);
    $("#stop-click").click(stopTweet);
};//main

$(document).ready(main);