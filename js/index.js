    // urls
const searchURL = 'https://api.github.com/search/users?q=octocat'
const repoURL = 'https://api.github.com/users/octocat/repos'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const searchForm = select('#github-form')
// console.log(form)
const searchInput = select('#search')
const userList = select('#user-list')
const repoList = select('#repos-list')

    // event listeners
searchForm.addEventListener('submit', e => {
    e.preventDefault()
    getSearchData()
})

    // callbacks
function renderUsers(userItems) {
    userList.innerText = ''
    for(let user of userItems) {
        if (user.login === searchInput.value) {
                // make stuff
            const userCard = create('li')
            const userName = create('h2')
            const userAvatar = create('img')
            const userProfileLink = create('a')
            const userRepoLink = create('button')
                // assign stuff
            userName.innerText = user.login
            userAvatar.src = user.avatar_url
            userProfileLink.href = user.html_url
            userProfileLink.innerText = 'Go To Profile'
            userRepoLink.innerText = 'View Repositories'
            repoList.innerText = ''
            userRepoLink.addEventListener('click', () => getRepoData(user.repos_url))
                //append stuff
            userCard.append(userName, create('br'), userAvatar, create('br'), userProfileLink, create('br'), userRepoLink)
            userList.append(userCard)
        }
    }
}

function renderRepos(repo) {
        // make stuff
    const repoCard = create('li')
    const repoName = create('h3')
    const repoLink = create('a')
        // assign stuff
    repoName.innerText = repo.name
    repoLink.innerText = 'View Repository'
    repoLink.href = repo.html_url
        // append stuff
    repoCard.append(repoName, repoLink)
    repoList.append(repoCard)
}

    // fetch
        // GET requests
function getSearchData() {
    fetch(searchURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(r => r.json())
    .then(users => renderUsers(users.items))
}

function getRepoData(userRepoURL) {
    fetch(userRepoURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(r => r.json())
    .then(repos => repos.forEach(repo => renderRepos(repo)))
}

    // initialize
function initialize() {
    getSearchData();
}

initialize();

// didn't do bonus