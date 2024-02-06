$(document).ready(function() {
    // Function to handle comment submission
    $("#comment-form").submit(function(e) {
        e.preventDefault();

        // Get the input values
        var author = $("#name").val();
        var commentText = $("#comment-text").val();

        // Check if both author and comment text are provided
        if (author && commentText) {
            // Create a new comment card
            var newComment = '<div class="card mt-4"><div class="card-body"><i class="fas fa-user"></i><p class="comment-author">' + author + ':</p><p>' + commentText + '</p></div></div>';

            // Insert the new comment card before the comment form
            $(".comment-form").before(newComment);

            // Clear the form fields
            $("#name").val("");
            $("#comment-text").val("");
        } else {
            alert("Please provide both a name and a comment.");
        }
    });
});
