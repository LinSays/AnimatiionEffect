// function circularText(txt, radius, classIndex) {
//   txt = txt.split("");
//    classIndex = document.getElementsByClassName("circTxt")[classIndex];
//   var deg = 360 / txt.length, origin = 0;

//   txt.forEach(function(ea) {
//     ea = `<p style='height:${radius}px;transform:rotate(${origin}deg);'>${ea}</p>`;   
//     classIndex.innerHTML += ea;
//     origin += deg;
//   });
// }

// circularText("Design Development Marketing Branding ", 265, 0);

AOS.init({
  duration: 2000,
});





(function() {

  document.documentElement.classList.add('is-loaded');
  document.documentElement.classList.remove('is-loading');

  setTimeout(() => {
      document.documentElement.classList.add('is-ready');
  },300)

  let options = {
      el: document.querySelector('#js-scroll'),
      smooth: true,
      getSpeed: true,
      getDirection: true
  }

  if(document.querySelector('#js-scroll').getAttribute('data-horizontal') == 'true') {
      options.direction = 'horizontal';
      options.gestureDirection = 'both';
      options.tablet = {
          smooth: true,
          direction: 'horizontal',
          horizontalGesture: true
      }
      options.smartphone = {
          smooth: false
      }
      options.reloadOnContextChange = true
  }

  setTimeout(() => {
      const scroll = new LocomotiveScroll(options);

      let dynamicBackgrounds = [];
      let dynamicColorElements = [];

      scroll.on('scroll', (instance) => {
          const progress = 360 * instance.scroll.y / instance.limit.y;

          scroll.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;

          dynamicBackgrounds.forEach(obj => {
              obj.el.style.backgroundColor = `hsl(${progress}, 11%, 81%)`;
          });
          dynamicColorElements.forEach(obj => {
              obj.el.style.color = `hsl(${progress}, 11%, 81%)`;
          });

          document.documentElement.setAttribute('data-direction', instance.direction)

      });
      scroll_Y = 0;
      scroll.on('call', (value, way, obj) => {
          if (value === 'dynamicBackground') {
              if(way === 'enter') {
                  dynamicBackgrounds.push({
                      id: obj.id,
                      el: obj.el
                  });
              } else {
                  for (var i = 0; i < dynamicBackgrounds.length; i++) {
                      if(obj.id === dynamicBackgrounds[i].id) {
                          dynamicBackgrounds.splice(i,1);
                      }
                  }
              }
          } else if (value === 'dynamicColor') {
              if(way === 'enter') {
                  dynamicColorElements.push({
                      id: obj.id,
                      el: obj.el
                  });
              } else {
                  for (var i = 0; i < dynamicColorElements.length; i++) {
                      if(obj.id === dynamicColorElements[i].id) {
                          dynamicColorElements.splice(i,1);
                      }
                  }
              }
          } else if(value ==='type_sentence'){
            new TypeIt("#type1", {
              speed: 75,
              loop: false,
              cursor:false
            }).go();
          }else if(value ==='type_sentence1'){
            new TypeIt("#type2", {
              speed: 75,
              loop: false,
              waitUntilVisible: true,
              isDeleting:false,
              cursor:false
            }).go();
          }else if(value==="title-display"){
            $('p.title-display').removeClass('title-display').animate({'nothing':null}, 1, function () {
                $(this).addClass('title-display');
                });
            $('p.title-name').removeClass('pop-outin').animate({'nothing':null}, 1, function () {
                $(this).addClass('pop-outin');
                });
          }else if(value==="services-description"){
            new SplitLine(document.querySelector('.services-description'));
          }else if(value==="image_rotate"){
              
          }
      });

      scroll.on('scroll', (instance) => {
        console.log(instance.scroll.y);
        scroll_Y = instance.scroll.y;
        if(scroll_Y>2820){
            angle = Math.floor(scroll_Y) % 360;
            // $('#circle_text').animate({ deg: angle },
            // {
            //     duration: 1200,
            //     step: function(now) {
            //     $(this).css({ transform: 'rotate(' + now + 'deg)' });
            //     }
            // });
            $('#circle_text').css('transform','rotate('+angle+'deg)');
        }
    });

  }, 1000)

})();


// CURSOR
var cursor = $(".cursor"),
follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
        css: {
        left: posX - 12,
        top: posY - 12
        }
    });

    TweenMax.set(cursor, {
        css: {
        left: mouseX,
        top: mouseY
        }
    });
  }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
// yellow circle
$(".link").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
});
$(".link").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
});

class SplitLine{
    constructor(el) {
      this.el = el;
      this.el.classList.add('text--idle');
      this.classes = {
        word: 'splitText__word',
        line: 'splitText__line'
      }
      this.initialState = this.el.innerHTML;
      this.init();
    }
    
    init(){
      this.addSpans();
      this.checkHeight();
      this.animate();
    }
    
    addSpans() {
      let text = this.el.textContent.split(' ');
      let textHtml = '';
      for (let i = 0; i < text.length; i++) {
        let space = i == text.length - 1 ? '' : ' ';
        textHtml += `<span class="${this.classes.word}">${text[i] + space}</span>`;
      }
      this.el.innerHTML = textHtml;
    }
    
    checkHeight() {
      let words = this.el.querySelectorAll('.' + this.classes.word);
      let currentY = 0;
      let newLineHtml = `<div class="${this.classes.line} ${this.classes.line}--idle">`; 
      let html = newLineHtml;
      for (let i = 0; i < words.length; i++) {
        if (currentY && words[i].offsetTop !== currentY) {
          html += `</div>${newLineHtml}`;
        }
        html += words[i].innerHTML;
        currentY = words[i].offsetTop;
      }
      html += '</div>';
      this.el.innerHTML = html;
      
      let divs = this.el.querySelectorAll('.' + this.classes.line);
      for (let i = 0; i < divs.length; i++) {
        divs[i].setAttribute('data-content', divs[i].innerHTML);
        divs[i].innerHTML = '';
      }
      
      this.el.classList.remove('text--idle');
    }
    
    animate() {
      let divs = this.el.querySelectorAll('.' + this.classes.line);
      let delay = 0;
      let i = 0;
      let timer;
      timer = window.setInterval(() => {
        divs[i].classList.remove(this.classes.line + '--idle');
        i++;
        if (i >= divs.length) {
          window.clearTimeout(timer);
          window.setTimeout(this.resetState.bind(this), 1000);
        }
      }, 150);
    }
    
    resetState() {
      this.el.innerHTML = this.initialState;
    }
  }
  
  