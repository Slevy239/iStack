$(document).ready(function () {
    console.log("Made it to community.js");
    //Get the username:
    //Get user info:
    $.get('/api/login', function (user) {
        console.log('made it to api login');
        //Display username:
        $("#userName").text(user.username);
    }).then(function(){
        console.log('inside .then function');
        //Grab all of the songs in the community playlist:
        $.get('/api/community', function (data) {
            console.log('Made it to api/community.get');
            playSong(data);
        }).then(function () {
            vote();
        });
    });

    console.log("Made it outside of api.get");
    //Logout
    $(document).on('click', "#logout", function () {
        $.get('/logout', function () {
        }).then(function (data) {
            window.location.replace('/login');
        });
    });


    //Tally the vote:
    function vote() {
        let num;
        $("button").on('click', function () {
            let vote = $(this).attr('class');
            let id = $(this).attr('id');
            if (vote === "upvote") {
                num = 1;
                update(num, id);
            } else if (vote === "downvote") {
                num = -1;
                update(num, id);
            }
        });
    }
    //Send the vote to the server:
    function update(num, id) {
        $.ajax({
            method: "PUT",
            url: "/api/community",
            data: {
                num: num,
                id: id
            }
        }).then(function (rowsUpdated) {
            res.json(rowsUpdated);
            window.location.reload();
        });
    }

    // // Play the song:
    function playSong(data) {
        let playAudio;
        $(".playBtn").on("click", function (event) {
            let idNum = $(this).attr('id');
            let isPlaying = $(this).attr('data-playing');
            if (isPlaying === 'false') {
                playAudio = new Audio(data[idNum].songLink);
                playAudio.play();
                $(this).attr('data-playing', 'true');
                $(this).attr('src', 'https://cdn1.iconfinder.com/data/icons/internet-28/48/12-512.png');
            } else {
                playAudio.pause();
                $(this).attr('data-playing', 'false');
                $(this).attr('src', 'https://cdn1.iconfinder.com/data/icons/line-arrow-hand-draw/64/arrow_hand_draw_line-25-512.png');
            }
        });
    }
});
