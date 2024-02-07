import { getForum } from "./s3-forum.js";

function createCardElement(post) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mt-4');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-user');

    const authorP = document.createElement('p');
    authorP.classList.add('comment-author');
    authorP.textContent = `${post.name}:`;

    const commentP = document.createElement('p');
    commentP.textContent = post.post;

    cardBodyDiv.appendChild(icon);
    cardBodyDiv.appendChild(authorP);
    cardBodyDiv.appendChild(commentP);

    cardDiv.appendChild(cardBodyDiv);
    return cardDiv;
}

function displayForumPosts() {
    const forumSection = document.querySelector('#comments-container');
    forumSection.innerHTML = '';
    
    getForum().forEach(post => {
        const cardElement = createCardElement(post);
        forumSection.appendChild(cardElement);
    });
}

export { displayForumPosts };