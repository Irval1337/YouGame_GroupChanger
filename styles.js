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

.tracking-in-expand {
  -webkit-animation: tracking-in-expand 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite alternate backwards;
          animation: tracking-in-expand 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite alternate backwards;
}
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
`;
var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
