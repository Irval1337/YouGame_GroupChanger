var styles = `
 .neons {
   -webkit-animation: glow 2s ease-in-out infinite alternate;
   -moz-animation: glow 2s ease-in-out infinite alternate;
   animation: glow 2s ease-in-out infinite alternate;
 }
 
 @-webkit-keyframes glow {
      from {
       color: #fff;
     text-shadow: 0 0 10px #00fff2, 0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 90px #00fff2;
   }
   
   to {
      color: gray;
     text-shadow: 0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 80px #00fff2, 0 1 90px #00fff2;
   }
 }
 
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
