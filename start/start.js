let is_firstClick = true;
let is_startClick = false;
(function() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://script.google.com/macros/s/AKfycbzxPcbqvA-Oc1Kbo-ljqBi4Kh114j-FapaINL4xg-CS5_HNFXajne8z_H4_2FpBXb_WCw/exec');
        request.responseType = 'json';
        request.onload = function () {
            data = this.response;
            backgroundImgSet(data)
        };
    request.send();
})();

function backgroundImgSet(data){
    const ObjData = Object.keys(data);
    const dataIndex = ObjData[Math.floor(Math.random()*ObjData.length)];
    const YoutubeVideoID = data[dataIndex]["URL"];
    document.body.style.backgroundImage = `URL(http://img.youtube.com/vi/${YoutubeVideoID}/mqdefault.jpg)`;
    videoSET(YoutubeVideoID)
}

document.addEventListener('click',()=>{
    player.playVideo();
    if(is_firstClick){
        document.getElementById('clickHere').remove();
        AnimationFunc();
        let VolumeCnt = 0;
        let FadeIn = setInterval(() => {
            VolumeCnt += 0.1;
            player.setVolume(VolumeCnt);
            if(VolumeCnt >= 8){
                clearInterval(FadeIn);
            }
        },50);

         is_firstClick = false;
    }
    //音量
})

document.getElementById('startBtn').addEventListener('click',()=>{
    const AnimationSec = 0.5;
    if(!is_startClick){
        gsap.to('#startBtn', AnimationSec, {
            x: '-10vw',
       });
        gsap.fromTo('#accountBtnContent', AnimationSec,
        { opacity: 0, display:'block', x: '-15vw'},
        { opacity: 1, x:'0vw'}
        )
       is_startClick = true;
    }else{
        gsap.to('#startBtn', AnimationSec, {
            x: '0vw',
        });
        gsap.fromTo('#accountBtnContent', AnimationSec,
        { opacity: 1,},
        { opacity: 0, display:'none', x: '-15vw'},
        )
        is_startClick = false;
        document.getElementById('sign-in').style.display = 'none';
    }
})

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function videoSET(ID) {
    player = new YT.Player('player', {
        width: '640', //幅
        height: '360',
        videoId: ID,
        playerVars: {
            start: 0,
            startSeconds: 0,
            controls: 0, // コントロールバーを非表示にする
            enablejsapi: 1,
            disablekb: 1,
            rel: 0,
            volume:0.05,
            origin: location.protocol + '//' + location.hostname + "/"
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

}
//Youtube playerAPI

function onPlayerReady() {
    player.seekTo(10);
    player.setVolume(0);
}

function AnimationFunc(){
    gsap.timeline()
    .fromTo('#welcome', 4,
    { fontSize:'0.1em',},
    { fontSize:'100px' ,display:'none'}
    )
    .fromTo('#startBtn', 2,
    { opacity: 0, display:'block'},
    { opacity: 1,},
    )
    .fromTo('#startBtn', 0.5,
    { scale: 0.96,},
    { scale:1, repeat: -1}
    );

}


document.getElementById('account').addEventListener('click',signInDisplaySetting = ()=>{
    const signIn = document.getElementById('sign-in');
    const style = getComputedStyle(signIn).display;
    if(style == 'none'){
        signIn.style.display = 'block';
    }else{
        signIn.style.display = 'none';
    }
    
})

document.getElementById('start').addEventListener('click',()=>{
    location.href = 'https://tube22-ex.github.io/TYTUBE/' //今はURLを変えてページに遷移するだけ
})
