const url = 'https://sistech-api.vercel.app/blog/';

const postsList = document.querySelector('.post-list');
const addBlogForm = document.querySelector('.add-blog');
const titleValue = document.getElementById('title-value');
const bodyvalue = document.getElementById('body-value')

let output = '';

const renderPosts = (posts) => {
  posts.forEach(post => {
    output += `
      <div class="card mt4 bg-light">
        <div class="card-body" style="width: 25rem;">
          <h3 class="card-title">${post.title}</h3>
          <h5 class="card-subtitle mb-2 text-muted">${post.date}</h5>
          <p class="card-text">${post.body}</p>
          <a href="#" class="card-link" onclick="editPost(${post.id})">Edit</a>
          <a href="#" class="card-link">Delete</a>
          <button onclick="likePost(${post.id})">Like</button>
          <p id="likeCounter${post.id}">0 likes</p>
          <div class="heart-container"></div>
        </div>
      </div>`;
  });
  postsList.innerHTML = output;
};

fetch(url)
  .then(res => res.json())
  .then(data => renderPosts(data));

addBlogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPost = {
    title: titleValue.value,
    date: new Date().toISOString(),
    body: bodyvalue.value,
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
    .then(res => res.json())
    .then(data => {
      console.log('New blog post added:', data);
      titleValue.value = '';
      bodyvalue.value = '';
    })
    .catch(error => console.error('Error adding blog post:', error));
});

function editPost(postId) {
  const updatedPost = {
    title: 'Updated Title',
    body: 'Updated Body',
  };

  fetch(`${url}${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  })
    .then(res => res.json())
    .then(data => {
      console.log('Updated blog post:', data);
    })
    .catch(error => console.error('Error updating blog post:', error));
}
