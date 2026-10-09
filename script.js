const userList = document.getElementById("user-list");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search");
const statusMessage = document.getElementById("status");
let allUsers = [];

function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.company.name}</p>
    `;
    userList.appendChild(card);
  });
  resultCount.textContent = `Showing ${users.length} of ${allUsers.length} users`;
}

async function fetchUsers() {
  statusMessage.textContent = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const users = await response.json();
    allUsers = users;
    displayUsers(users);
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = `Error loading users: ${error.message}`;
  }
}

fetchUsers();
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  );

  displayUsers(filteredUsers);
});