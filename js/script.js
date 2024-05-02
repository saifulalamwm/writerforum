const commentsDisplay = document.getElementById("commentsDisplay");
const markReadDisplay = document.getElementById("markReadDisplay");
const markedCount = document.getElementById("markedCount");
const spinner = document.getElementById("spinner");

// console.log(markedReadComments);

const fetchComments = async () => {
  const searchText = document.getElementById("searchText").value;
  commentsDisplay.textContent = "";
  toggleLoadSpn(true);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );

  const data = await res.json();
  const comments = data.posts;
  displayComments(comments);
};

const displayComments = (comments) => {
  const displayPost = document.getElementById("commentsDisplay");
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = `
            <div class="flex gap-4 border p-6 rounded-xl bg-gray-200 grow mb-4">
            <div class="avatar">
              <div class="w-20 h-20 rounded-lg">
                <img
                  src="${comment.image}"
                />
              </div>
            </div>
            <div class="card-details">
              <div class="category flex gap-10">
                <p>#${comment.category}</p>
                <p>Author : <span>${comment.author.name}</span></p>
              </div>
              <div class="border-b border-dashed border-b-slate-600">
                <p class="post-title text-xl font-bold mt-2">
                  ${comment.title}
                </p>
                <p class="post-details text-base font-light my-5 w-3/4">
                  ${comment.description}
                </p>
              </div>
              <div class="flex gap-8 my-3 justify-between">
                <div class="flex gap-8">
                  <div class="flex gap-3">
                    <p><i class="fa-regular fa-message"></i></p>
                    <p>${comment.comment_count}</p>
                  </div>
                  <div class="flex gap-3">
                    <p><i class="fa-regular fa-eye"></i></p>
                    <p>${comment.view_count}</p>
                  </div>
                  <div class="flex gap-3">
                    <p><i class="fa-regular fa-clock"></i></p>
                    <p>${comment.posted_time} Min</p>
                  </div>
                </div>
                <!--  -->
                <div class="readBtn">
                  <img onclick="markRead('${comment.title}', '${comment.view_count}', ${comment.id})"  src="images/email 1.svg" alt="" />
                </div>
              </div>
            </div> 
          </div>
            `;
    displayPost.appendChild(commentDiv);
  });
  toggleLoadSpn(false);
};

// ///////////////////////////////////////////
const toggleLoadSpn = (isLoading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
// /////////////////////////////////////////////////////////
let markedReadComments = [];

function markRead(comment, view_count, id) {
  markedReadComments.push(id);
  markedCount.textContent = markedReadComments.length;
  console.log(id, markedReadComments);
  const commentDiv = document.createElement("div");
  commentDiv.innerHTML = `
              <div class="flex justify-between items-center w-11/12 m-auto p-3 bg-white rounded-xl my-3">
                <div class="grow">
                  <p class="post-title text-lg font-semibold mt-2">
                    ${comment}
                  </p>
                </div>
                <div class="flex gap-3">
                  <p><i class="fa-regular fa-eye"></i></p>
                  <p>${view_count}</p>
                </div>
              </div>
              `;
  markReadDisplay.appendChild(commentDiv);
  // markedReadComments.push(commentDiv);
}

console.log(markedReadComments.length);

// ////////////////////////////////////////////////////////////

// Update latest post

const latestPost = async (posts) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  const latestposts = displayLatestPosts(data);
};

function displayLatestPosts(lposts) {
  lposts.forEach((lpost) => {
    const latestPost = document.getElementById("latestPost-container");
    const latestPostDiv = document.createElement("div");
    latestPostDiv.innerHTML = `
    <div class="single-card w-96 border p-5 rounded-xl">
          <div class="bg-green-500 w-full h-52 rounded-xl">
            <img class=" h-52 rounded-lg w-full" src="${lpost.cover_image}" alt="" />
          </div>
          <div class="flex gap-3">
            <p><i class="fa-regular fa-calendar"></i></p>
            <p>${lpost.author.posted_date}</p>
          </div>
          <p class="font-bold py-3">
           ${lpost.title}
          </p>
          <p class="text-sm h-24">
            ${lpost.description}
          </p>
          <div class="flex text-sm items-center gap-1 py-3">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img
                  src="${lpost.profile_image}"
                />
              </div>
            </div>
            <div class="">
              <p>${lpost.author.name}</p>
              <p>${lpost.author.designation}</p>
            </div>
          </div>
        </div>
    `;
    latestPost.appendChild(latestPostDiv);
    // console.log(lpost);
  });
}

latestPost();

// fetchComments();
