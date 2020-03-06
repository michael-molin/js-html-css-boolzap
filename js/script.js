$(document).ready(function(){
    var orario = new Date;
    var orarioMinuti = parseInt(orario.getMinutes());
    if(orarioMinuti < 10) {
        orarioMinuti = '0'+orarioMinuti;
    }

    var orarioOre = parseInt(orario.getHours());
    if(orarioOre < 10) {
        orarioOre = '0'+orarioMinuti;
    }
    
    var orarioAttuale = (orarioOre + ":" + orarioMinuti);

        $('.utente').click(function(){
            var dataUtenteTemp = $(this).data('nomeUtente');
            var nomeChat = $(this).find('h4').text();
            var orarioChat = $(this).find('h5').text();
            var imgUtente = $(this).find('.img-profilo').clone();
            $('.chat').each(function(){
                if(dataUtenteTemp == ($(this).data('nomeUtente'))) {
                    $('.chat').removeClass('chat-active');
                    $(this).addClass('chat-active');
                    $('.destinatario-chat-nome h4').text(nomeChat);
                    $('.destinatario-chat-nome p').text('Ultimo accesso alle: ' + orarioChat);
                    $('.destinatario-chat-img').html(imgUtente);
                }
            });
        });

        $('#invia').click(function(){
            inviaMessaggio();
            rispostaMessaggio();
        });

        $('#input-msg').keyup(function(event){
            if (($('#input-msg').val()) == '') {
                $('#invia').hide();
                $('#audio').show();
            } else {
                $('#audio').hide();
                $('#invia').show();
            }
            if (event.key == "Enter") {
                console.log('premuto invio');
                inviaMessaggio();
                rispostaMessaggio();
            }
        });

        $('#input-utenti').keyup(function(event){
            var carattereFiltro = $(this).val().toLowerCase();
            $('.utente').each(function() {
                if ($(this).find('h4').text().toLowerCase().includes(carattereFiltro)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        function inviaMessaggio() {
            var inputSalvato = $('#input-msg').val();
            $('#input-msg').val('');
            var nuovoMessaggio = $('.template .msg-sent').clone();
            creaMsg(nuovoMessaggio, inputSalvato, orarioAttuale);
            scroll();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                var nuovoMessaggio = $('.template .msg-receive').clone();
                creaMsg(nuovoMessaggio ,'ok', orarioAttuale);
                $('.destinatario-chat-nome p').text('Ultimo accesso alle: ' + orarioAttuale);
                scroll();
            }, 3000);
        }

        function scroll() {
            var pixelScroll =$('.chat.chat-active').height();
            console.log(pixelScroll);
            $('.chat.chat-active').scrollTop(pixelScroll);
        }

        function creaMsg(messaggio, testo, orario) {
            messaggio.children('.msg-testo').text(testo);
            messaggio.children('.msg-orario').text(orario);
            $('.chat.chat-active').append(messaggio);
            var dataUtenteTemp = $('.chat.chat-active').data('nomeUtente');
            $('.utente').each(function() {
                if (dataUtenteTemp == ($(this).data('nomeUtente'))) {
                    $(this).find('p').text(testo);
                    $(this).find('h5').text(orario);
                }
            });
        }
});
