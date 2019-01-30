$(document).ready(function() {

    // Array for recommended/ added buttons
    var gifTopics = ["Memes", "Pugs", "Kittens"];

    // Function to get attributes and display content to DOM using API and JSON
    function displayInfo() {
        var gif = $(this).attr("gifSearch")
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchEntry + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        //use AJAX to get information on gif button clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

            //reset gifs div everytime the page loads
            $("#gifs").empty();

            var results = response.data;
            
            // For loop to grab rating info & containing into an individual div 
            for (var i = 0; i < results.length; i++) {
                var indivDiv = $("<div id='searchEntry'>");
                var rating = $("<p>").text("Rating: " + results[i].rating);
                
                // Info for gif with still sources and data attributes to store gifs pausing function
                var gif = $("<img>").addClass("gif").attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state", "still");
                
                // Add the gif and rating info into the indivDiv
                indivDiv.append(gif);
                indivDiv.append(rating);

                // Append the Gif ratings of the user's search still and animated data of Gif
                $("#gifs").append(indivDiv)

            }

            // onClick event for pausing the gif
            $(".gif").on("click", function() {
                var gifState = $(this).attr("data-state");

                if (gifState === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-still", "still");
                }

            });
 
        });
            

    }

    // Create buttons from array
    function renderButtons() {

        // Resets original array to prevent overlap
        $("#gifButton").empty();

        // For loop through array
        for (var i = 0; i < gifTopics.length; i++) {
            var gifRender = $("<button>");

            // Add class and attr of name for display function
            gifRender.addClass("sport");
            gifRender.attr("", topics[i]);
            gifRender.text(topics[i]);
            $("#gifButtons").append(gifRender);
        }
    }

    // onClick event to add submitted button
    $("#submit").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        gifTopics.push(gif);
            $("#user-input").val(" ");
        renderButtons();
    });

    $(document).on("click", displayInfo);

    renderButtons();


});