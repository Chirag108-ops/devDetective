const fullname = document.querySelector('[data-name]')
const username = document.querySelector('[data-username]')
const bio = document.querySelector('[data-bio]')
const root = document.documentElement.style
const repo = document.querySelector('[data-repo]')
const followers = document.querySelector('[data-followers]')
const following = document.querySelector('[data-following]')
const city = document.querySelector('[data-city]')
const website = document.querySelector('[data-website]')
const twitter = document.querySelector('[data-twitter]')
const company = document.querySelector('[data-company]')
const joinedDate = document.querySelector('[data-date]')
const input = document.querySelector('[data-input]')
const dp = document.querySelector('[profile-img]')
let user = "thepranaygupta"
fetchUserInfo()
let darkMode = false
const themeImg = document.querySelector('[theme-img]')
const themePara = document.querySelector('[data-theme]')
const searchform = document.querySelector('[data-form]')
const btn = document.querySelector('.theme')
searchform.addEventListener('submit', (e) => {
    e.preventDefault()
    let userName = input.value
    if(userName === "") return
    user = userName
    fetchUserInfo()
})

async function fetchUserInfo(){
    try{
        const response = await fetch(`https://api.github.com/users/${user}`)
        const data = await response.json()
        renderData(data)
    }
    catch(e){
        console.log('Error Found => ', e)
    }
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode = true
    darkModeProperties()
} else {
    darkMode = false
    lightModeProperties()
}

function renderData(data){
    fullname.innerText = data.name
    username.innerText = `@${data.login}`
    username.href = `https://github.com/${data.login}`
    if(data.bio === null) bio.innerText = "The profile has no bio"
    else bio.innerText = data.bio
    repo.innerText = data.public_repos
    followers.innerText = data.followers
    following.innerText = data.following
    if(data.location === null) city.innerText = "Not Available"
    else city.innerText = data.location
    if(data.blog === null) {
        website.href = '#'
        website.innerText = "Not Available"
    }
    else{
        website.href = `${data.blog}`
        website.innerText = data.blog
    }
    if(data.twitter_username === null) {
        twitter.innerText = "Not Available"
        twitter.href = '#'
    }
    else{
        twitter.innerText = data.twitter_username
        twitter.href = `https://twitter.com/${data.twitter_username}`
    }

    if(data.company === null) company.innerText = "Not Available"
    else company.innerText = data.company
    let dataDate = data.created_at
    let year = dataDate.split('T')[0].split('-')[0]
    let month = dataDate.split('T')[0].split('-')[1]
    let finalDate = dataDate.split('T')[0].split('-')[2]
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    month = months[month - 1]
    joinedDate.innerText = `Joined ${finalDate} ${month} ${year}`
    dp.src = data.avatar_url
}

btn.addEventListener('click',() => {
    if(darkMode === false) darkModeProperties()
    else lightModeProperties()
})

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    themePara.innerText = "Light";
    themeImg.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true
  }
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    themePara.innerText = "Dark";
    themeImg.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false
  }