// Code đếm ngược
// var comingdate = new Date("Jul 31, 2020 10:25:00");

// var d = document.getElementById('d');
// var h = document.getElementById('h');
// var m = document.getElementById('m');
// var s = document.getElementById('s');

// var x = setInterval(function(){
//   var now = new Date();
//   var des = comingdate.getTime() - now.getTime();
//   var days = Math.floor(des/(1000 * 60 * 60 * 24));
//   var hours = Math.floor(des%(1000 * 60 * 60 * 24) / (1000 * 60 *60));
//   var mins = Math.floor(des%(1000 * 60 * 60) / (1000 * 60));
//   var secs = Math.floor(des%(1000 * 60) / 1000);

//   d.innerHTML = getTrueNumber(days);
//   h.innerHTML = getTrueNumber(hours);
//   m.innerHTML = getTrueNumber(mins);
//   s.innerHTML = getTrueNumber(secs);

//   if(des <= 0) clearInterval(x);

// },1000);

// function getTrueNumber(x) {
//   if (x<10) return '0'+x;
//   else return x;
// }

// Code đếm 
const yourDate = new Date("2020-07-31T10:25:00"),
music = ['always', 'everytime', 'foryou', 'yumetourou'];

document.addEventListener('DOMContentLoaded', function(){
      var rootTime = document.querySelector("time");

      // document.querySelector("anni").textContent = `${(yourDate.getDate()>9)?yourDate.getDate():"0"+yourDate.getDate()}-${(yourDate.getMonth()>8)?(yourDate.getMonth()+1):"0"+(yourDate.getMonth()+1)}-${yourDate.getFullYear()}`;
      
      document.querySelector("date").textContent = Math.floor( Math.floor((new Date() - yourDate) / 1000) / 60 / 60 / 24)+" Ngày";

      function olock() {
            var today = new Date(),
            hrs = (Math.floor( Math.floor((today - yourDate) / 1000) / 60 / 60)) % 24,
            min = (Math.floor( Math.floor((today - yourDate) / 1000) / 60)) % 60,
            sec =  Math.floor((today - yourDate) / 1000) % 60;
            rootTime.textContent = `${(hrs>9)?hrs:"0"+hrs}:${(min>9)?min:"0"+min}:${(sec>9)?sec:"0"+sec}`;
      } olock();
      var timer = setInterval(function(){olock()}, 1000);
      
      document.querySelector("audio").setAttribute("src", `music/${music[Math.floor(Math.random()*music.length)]}.mp3`);

      document.getElementsByTagName("body")[0].insertAdjacentHTML(
            "beforeend",
            "<div id='mask'></div>"
      );

}, false);



