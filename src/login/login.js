import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

const CLIENT_ID=import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI=import.meta.env.VITE_REDIRECT_URI
const APP_URL=import.meta.env.VITE_APP_URL;
const scopes="user-top-read user-follow-read playlist-read-private user -library-read";

const authorizeUser=()=>{
    const url=`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scopes=${scopes}&show_dialogue=true`;
    window.open(url,"login","width=800,height=600")
}
document.addEventListener("DOMContentLoaded",()=>{
    const loginButton=document.getElementById("login-to-spotify");
    loginButton.addEventListener("click",authorizeUser);
})

window.setItemsInLocalStorage=({accessToken,tokenType,expiresIn})=>{
    localStorage.setItem(ACCESS_TOKEN,accessToken);
    localStorage.setItem(TOKEN_TYPE,tokenType);
    localStorage.setItem(EXPIRES_IN,expiresIn);
    window.location.href=APP_URL;
}

window.addEventListener("load",()=>{
    const accessToken=localStorage.getItem(ACCESS_TOKEN);
    if(accessToken){
        window.location.href=`${APP_URL}/dashboard/dashboard.html`
    }
    if(window.opener!==null && !window.opener.closed){
        window.focus();
        if(window.location.href.includes("error")){
            window.close();
        }
        const {hash}=window.location;
        const searchParams=new URLSearchParams(hash);
        const accessToken=searchParams.get("#access_token");
        //#access_token=BQDG6WKO2vLoVqfGL9Yga1OaR3-TBADTq4-hGXmUyltiN3SzI5N1s_Q3ccl8k2GlpVyW2srTxSP42-VVJWDVlBgT_8Q-riz_10EwVABNQjP3Jb0ZZ0zE0bo2tK2fuX1hfO1XAEgYxxNAoxxoO2VnnJAFq0usb_BamhvY-vs59kljpyZFKHty4LiLRpFkJ3qY2xI&token_type=Bearer&expires_in=3600
        const tokenType=searchParams.get("token_type");
        const expiresIn=searchParams.get("expires_in");
        if(accessToken){
            window.close();
            window.opener.setItemsInLocalStorage({accessToken,tokenType,expiresIn});
        }else{
            window.close();
        }
    }
})