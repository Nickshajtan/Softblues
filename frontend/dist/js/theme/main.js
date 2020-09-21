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
  
  const forms = document.querySelectorAll('.modal-form form');
  for (let el of forms) {
    const message = el.querySelector('.message-text');
    el.addEventListener('submit', function(e){
      e.preventDefault();
      let data = new FormData(el);
      let xhr  = new XMLHttpRequest();
      xhr.open('POST', 'http://example.com', true);
      xhr.send(data);
      xhr.ontimeout = function() {
          message.innerText = 'Статус отправки ' + xhr.status + ': ' + xhr.statusText;
      }
      xhr.onreadystatechange = function() {
        if (xhr.status != 200) {
          message.innerText = 'Статус отправки ' + xhr.status + ': ' + xhr.statusText;
        } 
        else {
          message.innerText = 'Статус отправки ' + xhr.status + ': ' + xhr.responseText;
        }
      }
      xhr.onerror = function() {
        message.innerText = 'Ошибка! ' + xhr.status + ': ' + xhr.responseText;
      }
      xhr.ontimeout = function() {
        message.innerText = 'Извините, запрос превысил максимальное время. ' + xhr.status + ': ' + xhr.responseText;
      }
      xhr.onload = function() {
        message.innerText = 'Сообщение успешно отправлено.';
        let inputs = el.querySelectorAll('input');
        for (let el of inputs) {
          el.value = "";
        }
        let textareas = el.querySelectorAll('textarea');
        for (let el of textareas) {
          el.innerText = "";
        }
      }
    });
  }
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
