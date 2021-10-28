/* eslint-disable no-console */

let port = "dev"
let baseURL = "http://localhost:8080/Money_Manager_Backend"
let siteBaseUrl = "http://localhost:8081/invite/"


if(port === "dev"){
  baseURL = "http://localhost:8080/Money_Manager_Backend"
}

function checkUser() {
    let vendor = JSON.parse(localStorage.getItem('user'))
    if(vendor){
      return true
    }
    return false
}


export default {
    checkUser: checkUser,
    baseURL: baseURL,
    siteBaseUrl: siteBaseUrl
}
