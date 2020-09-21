'use strict';

document.addEventListener("DOMContentLoaded", function() {
  const globals = {
    'BODY'   : document.querySelector('body'),
    'OVERLAY': document.querySelector('.overlay'),
    'NAV'    : document.querySelector('.site-header__nav__menu'),
  };
  
  MobileBurgerMenu( globals );
  ModalLinks( globals );
});

function MobileBurgerMenu( args = {} ) {
  try {
      document.querySelector('.site-header__burger-switcher').onclick = function() {        
        this.classList.toggle('is-active');
        
        if( isset( args.NAV ) ) {
          args.NAV.classList.toggle('is-active');
        }
        
        if( isset( args.BODY ) ) {
          args.BODY.classList.toggle('noscroll');
        }
        
        if( isset( args.OVERLAY ) ) {
          OverlaySet( args );
        }
      }
  }
  catch(e) {
    console.log('Burger menu script error: ' + e);
  }
}

function OverlaySet( args = {} ) {
  try {
    if( !isset( args.OVERLAY ) ) {
      throw new Error('Overlay not found: ' + e);
      return false;
    }
    
    let OVERLAY = args.OVERLAY;
    OVERLAY.classList.toggle('is-active');
    
    OVERLAY.onclick = () => {
      document.querySelector('.site-header__burger-switcher').classList.remove('is-active');
      OVERLAY.classList.remove('is-active');
      args.BODY.classList.remove('is-active');
      args.BODY.classList.remove('noscroll');
      args.NAV.classList.remove('is-active');
      
      document.querySelectorAll('.modal-form').forEach(function( element ) {
        element.classList.remove('is-active');
      });
    }
    
  }
  catch(e) {
    console.log('Error with overlay function: ' + e );
  }
}

function ModalLinks( args = {} ) {
  try {
    const modaLinks = document.querySelectorAll('.modal-caller');
    
    if( modaLinks.length == 0 ) {
      throw new Error('Modal links not found: ' + e);
      return false;
    }
    
    modaLinks.forEach(function( element ) {
      element.onclick = function(e) {
        e.preventDefault();
        ModalForm( args );
      }
    });
  }
  catch(e) {
    console.log(e);
  }
}

function ModalForm( args = {} ) {
  try {
    const modalForms = document.querySelectorAll('.modal-form');
    let BODY         = args.BODY;
    if( modalForms.length == 0 ) {
      throw new Error('Modal forms not found: ' + e);
      return false;
    }
    
    modalForms.forEach(function( element ) {
      element.classList.toggle('is-active');
      BODY.classList.toggle('noscroll');
      
      element.remove = () => {
        element.classList.remove('is-active');
        BODY.classList.remove('noscroll');
      };
      
      element.querySelector('.modal-closer').onclick = () => {
        element.remove();
      };
      
      document.addEventListener('keydown', function(e){
        if(e.which == 27) {
          element.remove();
        }
      });
      
      element.onclick = function(e) {
        if( e.target.nodeName !== 'DIV' ) {
          return;
        }
        let container = element.querySelector(".modal-form__modal-body");
        if ( container.classList[0] !== e.target.classList[0] && container.querySelector('.' + e.target.classList[0]) === null ){
          element.remove();
        }
      }
      
    });
  }
  catch(e){
    console.log(e);
  }
}
