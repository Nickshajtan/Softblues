'use strict';

const BODY = document.querySelector('body');

document.addEventListener("DOMContentLoaded", function() {
  modalLinks();
  
  let nav     = document.querySelector('.site-header__nav__menu');
  let burger  = document.querySelector('.site-header__burger-switcher');
  burger.onclick = function(){
    burger.classList.toggle('is-active');
    document.querySelector('.overlay').classList.toggle('is-active');
    nav.classList.toggle('is-active');
  };
  
  document.querySelector('.overlay').onclick = function(){
    nav.classList.remove('is-active');
    burger.classList.remove('is-active');
    this.classList.remove('is-active');
  };
  
});

function  modalLinks() {
  try {
    const modaLinks = document.querySelectorAll('.modal-caller');
    
    if( modaLinks.length == 0 ) {
      throw new Error('Modal links not found: ' + e);
      return false;
    }
    
    for (let el of modaLinks) {
      el.onclick = function(e) {
        e.preventDefault();
        modalForm();
      }
    }
    
  }
  catch(e) {
    console.log(e);
  }
}

function modalForm() {
  try {
    const modalForms = document.querySelectorAll('.modal-form');
    if( modalForms.length == 0 ) {
      throw new Error('Modal forms not found: ' + e);
      return false;
    }
    for (let el of modalForms) {
      (function(){
        
      })();
      el.classList.toggle('is-active');
      BODY.classList.toggle('noscroll');
      el.querySelector('.modal-closer').onclick = () => {
        el.classList.remove('is-active');
        BODY.classList.remove('noscroll');
      };
      document.addEventListener('keydown', function(eventObject){
                if (eventObject.which == 27){ 
                  el.classList.remove('is-active');
                  BODY.classList.remove('noscroll');
                }
      });
      el.onclick = function (e) {
          
          if( e.target.nodeName !== 'DIV' ) {
            return;
          }
          let container = el.querySelector(".modal-form__modal-body");
          if ( container.classList[0] !== e.target.classList[0] && container.querySelector('.' + e.target.classList[0]) === null ){
              el.classList.remove('is-active');
              BODY.classList.remove('noscroll');
          }
      };
    }
  }
  catch(e){
    console.log(e);
  }
}
