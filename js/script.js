$(document).ready(function(){
    var orario = new Date;
    var orarioAttuale = (orario.getHours() + ":" + orario.getMinutes());

        $('.utente').click(function(){
            var dataUtenteTemp = $(this).data('nomeUtente');
            var nomeChat = $(this).find('h4').text();
            $('.chat').each(function(){
                if(dataUtenteTemp == ($(this).data('nomeUtente'))) {
                    $('.chat').removeClass('chat-active');
                    $(this).addClass('chat-active');
                    $('.destinatario-chat-nome h4').text(nomeChat);
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
            nuovoMessaggio.children('.msg-testo').text(inputSalvato);
            nuovoMessaggio.children('.msg-orario').text(orarioAttuale);
            $('.chat.chat-active').append(nuovoMessaggio);
            var dataUtenteTemp = $('.chat.chat-active').data('nomeUtente');
            $('.utente').each(function() {
                if (dataUtenteTemp == ($(this).data('nomeUtente'))) {
                    $(this).find('p').text(inputSalvato);
                    $(this).find('h5').text(orarioAttuale);
                }
            });
            scroll();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                var nuovoMessaggio = $('.template .msg-receive').clone();
                nuovoMessaggio.children('.msg-testo').text('Ok');
                nuovoMessaggio.children('.msg-orario').text(orarioAttuale);
                $('.chat.chat-active').append(nuovoMessaggio);
                var dataUtenteTemp = $('.chat.chat-active').data('nomeUtente');
                $('.utente').each(function() {
                    if (dataUtenteTemp == ($(this).data('nomeUtente'))) {
                        $(this).find('p').text('Ok');
                        $(this).find('h5').text(orarioAttuale);
                    }
                });
                scroll();
            }, 4000);
        }

        function scroll() {
            var pixelScroll =$('.chat.chat-active').height();
            console.log(pixelScroll);
            $('.chat.chat-active').scrollTop(pixelScroll);
        }
});
