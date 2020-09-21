document.addEventListener("DOMContentLoaded", function() {
  try {
    document.querySelectorAll('.modal-form form').forEach( element => element.addEventListener('submit', function(e) {
      e.preventDefault();
      const box     = this.querySelector('.message-text');
      let message   = function( value ) {
        if( !value ) return;
        box.innerText = value;
      }
      let data      = new FormData(this);
      let xhr       = new XMLHttpRequest();
      xhr.open('POST', 'http://example.com', true);
      xhr.send(data);
      xhr.ontimeout = () => {
        let text = 'Извините, запрос превысил максимальное время. ' + xhr.status + ': ' + xhr.responseText;
        if( isset( text ) ) {
          message( text );
        }
      };
      xhr.onerror = () => {
        let text = 'Ошибка! ' + xhr.status + ': ' + xhr.responseText;
        if( isset( text ) ) {
          message( text );
        }
      };
      xhr.onreadystatechange = () => {
        let text;
        if (xhr.status != 200) {
          text = 'Статус отправки ' + xhr.status + ': ' + xhr.statusText;
        }
        else {
          text = 'Статус отправки ' + xhr.status + ': ' + xhr.responseText;
        }
        if( isset( text ) ) {
          message( text );
        }
      };
      xhr.onload = () => {
        let text = 'Сообщение успешно отправлено.';
        if( isset( text ) ) {
          message( text );
        }
        this.querySelectorAll('input').forEach(
          element => function() { element.value = ""; }
        );
        this.querySelectorAll('textarea').forEach(
          element => function() { element.innerText = ""; }
        );
      };
    }));
  }
  catch(e){
    console.log('Form sendler error: ' + e);
  }
});