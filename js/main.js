let images = [{
   url: '..//img/aglaonema_foto.jpg', 
   title: 'Офисное решение - аглаонема'
}, {
   url: '..//img/lechuza_foto.jpg', 
   title: 'Лечуза для офисов'
}, {
   url: '..//img/raspis_foto.jpg', 
   title: 'Неприхотливое растение - распис'
}, {
   url: '..//img/rondo-foto.jpg', 
   title: 'Рондо'
}, {
   url: '..//img/zema_foto.jpg', 
   title: 'Замиокулькас - долларовое дерево'
}]

function initSlider(options) {
   if (!images || !images.length) return;
   options = options || {
      titles: true,
      dots: true,
      autoplay: false
   };

   let slideImages = document.querySelector('.slide-image');
   let slideBtns = document.querySelector('.slide-btns');
   let slideDots = document.querySelector('.slide-dots');

   initImages();
   initBtns();

   if (options.dots) {
         initDots();
   }

   if (options.titles) {
      initTitles();
   }

   if (options.autoplay) {
      initAutoplay();
   }

   function initImages() {
      images.forEach((image, index) => {
         let imgDiv = `<div class = "img n${index} ${index === 0? "active": ""}" 
         style="background-image: url(${images[index].url});" data-index="${index}"></div>`;

         slideImages.innerHTML += imgDiv;

      })
   }

   function initBtns() {
      slideBtns.querySelectorAll('.slide-btn').forEach(btn => {
         btn.addEventListener('click', function() {
            let curNumber = +slideImages.querySelector('.active').dataset.index;
           let nextNumber;
            if (btn.classList.contains('left')) {
               nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
               } else {
                  nextNumber = curNumber === images.length - 1? 0 : curNumber +1;
               } 
               moveSlider(nextNumber);
         });
      });
   }

function initDots() {
   images.forEach((image, index) => {
      let dots = `<div class = "slide-dots-item n${index} ${index === 0? "active" : ""}" data-index='${index}'></div>`;
      slideDots.innerHTML += dots;
   });
   slideDots.querySelectorAll('.slide-dots-item').forEach(dots => {
      dots.addEventListener('click', function() {
         moveSlider(this.dataset.index);
       
      });
   });
}


   function moveSlider(num) {
      slideImages.querySelector('.active').classList.remove('active');
      slideImages.querySelector('.n' + num).classList.add('active');
      if (options.dots) {
         slideDots.querySelector('.active').classList.remove('active');
         slideDots.querySelector('.n' + num).classList.add('active');
      }
      if (options.titles) changeTitle(num);
   }

   function initTitles() {
      let titleDiv = `<div class="slide-img-title">${images[0].title}</div>`;
      slideImages.innerHTML += cropTitle(titleDiv, 50);
     
   }

   function changeTitle(num) {
      if (!images[num].title) return;
      let slideTitle = slideImages.querySelector('.slide-img-title');
      slideTitle.innerText = cropTitle(images[num].title, 50);
   }

   function cropTitle(title, size) {
      if (title.length <= size) {
         return title;
      } else {
         return title.substr(0, size) + '...';
      }
   }

   function initAutoplay() {
      setInterval(() => {
         let curNumber = +slideImages.querySelector('.active').dataset.index;
         let nextNumber = curNumber === images.length - 1? 0 : curNumber +1;
         moveSlider(nextNumber);
      }, options.autoInterval);
   }
}

let slideOption = {
   titles: true,
   dots: true,
   autoplay: true,
   autoInterval: 3000
}


document.addEventListener('DOMContentLoaded', function() {
   initSlider(slideOption);
 }
 );
