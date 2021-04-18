<<<<<<< HEAD
var styles = `
 .neons {
   -webkit-animation: glow 2s ease-in-out infinite alternate;
   -moz-animation: glow 2s ease-in-out infinite alternate;
   animation: glow 2s ease-in-out infinite alternate;
 }
 
 @-webkit-keyframes glow {
      from {
       color: #fff;
     text-shadow: 0 0 3px #00fff2, 0 0 6px #00fff2;
   }
   
   to {
      color: #b1b0b0;
     text-shadow: 0 1 6px #00fff2;
   }
 }

 @-webkit-keyframes glowBanner {
    from {
      background: #cac7c7;
      border-color: #fff;
      box-shadow: 0 0 3px #00fff2 , 0 0 6px #00fff2;
    }

    to {
      background: #666363;
      border-color: #666363;
      box-shadow: 0 1 6px #00fff2;
    }
  }
`;
var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
=======
var styles = `
 .neons {
   -webkit-animation: glow 2s ease-in-out infinite alternate;
   -moz-animation: glow 2s ease-in-out infinite alternate;
   animation: glow 2s ease-in-out infinite alternate;
 }
 
 @-webkit-keyframes glow {
      from {
       color: #fff;
     text-shadow: 0 0 3px #00fff2, 0 0 6px #00fff2;
   }
   
   to {
      color: #b1b0b0;
     text-shadow: 0 1 6px #00fff2;
   }
 }

 @-webkit-keyframes glowBanner {
    from {
      background: #cac7c7;
      border-color: #fff;
      box-shadow: 0 0 3px #00fff2 , 0 0 6px #00fff2;
    }

    to {
      background: #666363;
      border-color: #666363;
      box-shadow: 0 1 6px #00fff2;
    }
  }
`;
var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
>>>>>>> 5f1969e58caf602ff3375a1e5841783fd77697e2
