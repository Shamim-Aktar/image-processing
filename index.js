var Peer=require('simple-peer')

navigator.webkitGetUserMedia({
            video: true,
            audio: false
        }, function (stream) {

var peer=new Peer({

    initiator:location.hash==='#init',
    trickle:false,
    stream:stream
})

var id1;
peer.on('signal', function(data){
    console.log(data)   
    document.getElementById('yourId').value=JSON.stringify(data);
    localStorage.setItem("id1",JSON.stringify(data));
})
            /*window.addEventListener('load',function(){
                console.log(JSON.parse(localStorage.getItem("id1")))
                document.getElementById('otherId').value = JSON.parse(localStorage.getItem("id1"));
                var otherId = JSON.parse(document.getElementById('otherId').value)
                peer.signal(otherId);
            })*/

document.getElementById('connect').addEventListener('click',function(){
    console.log(JSON.parse(localStorage.getItem("id1")))
    document.getElementById('otherId').value = JSON.parse(localStorage.getItem("id1"));
    var otherId=JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId);
})

document.getElementById('send').addEventListener('click',function(){
    var yourMessage=document.getElementById('yourMessage').value
    peer.send(yourMessage);
})
peer.on('data', function(data){
     document.getElementById('messages').textContent+=data+'\n';
})

peer.on('stream', function(stream){
    var video=document.createElement('video')
    document.body.appendChild(video)
    video.src=window.URL.createObjectURL(stream)
    video.play()
})


var mediaRecorder = new MediaRecorder(stream);

var recordmedia = function () {
    mediaRecorder.start()
}

var stop = function () {
    mediaRecorder.stop()
}

document.getElementById('recordmedia').addEventListener('click',function(){
    recordmedia();
})

document.getElementById('stop').addEventListener('click', function () {
    stop();
})
}, function (err){
    console.log(err);
})