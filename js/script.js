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

        //Gestione ICONA mouseenter mouseleave
        $('.chat').on('mouseenter', '.msg' , function() {
            $(this).find('.msg-overlay').show();
            $(this).find('.menu-opzioni').hide();

        });

        $('.chat').on('mouseleave', '.msg' , function() {
            console.log('mouseleave su msg');
            $(this).find('.msg-overlay').hide()
        });


        // GESTIONE apertura opzioni chat
        $('.chat').on('click' , '.opzioni-chat i' , function() {
            console.log('click opzioni chat');
            $(this).next('.menu-opzioni').toggle();
        })

        $('.chat').on('click' , '.cancella-chat' , function() {
            console.log('click cancella chat');
            var checkposition = $(this).parentsUntil('.msg');
            console.log(checkposition);
            $('this').parentsUntil('.msg').hide();
        })





        $('.utente').click(function(){
            $('.utente').removeClass('utenteclick');
            $(this).addClass('utenteclick');
            var dataUtenteTemp = $(this).data('nomeUtente');
            var nomeChat = $(this).find('h4').text();
            var orarioChat = $(this).find('h5').text();
            var imgUtente = $(this).find('.img-profilo').clone();
            $('.chat').each(function(){
                if(dataUtenteTemp == ($(this).data('nomeUtente'))) {
                    $('.chat').removeClass('chat-active');
                    $(this).addClass('chat-active');
                    $('.testo').addClass('testo-active');
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
            var nuovoMessaggio = $('.template .msg').clone();
            nuovoMessaggio.addClass('msg-sent');
            creaMsg(nuovoMessaggio, inputSalvato, orarioAttuale);
            scroll();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                var nuovoMessaggio = $('.template .msg').clone();
                nuovoMessaggio.addClass('msg-receive');
                creaMsg(nuovoMessaggio ,'ok', orarioAttuale);
                $('.destinatario-chat-nome p').text('Ultimo accesso alle: ' + orarioAttuale);
                scroll();
            }, 3000);
        }

        function scroll() {
            var pixelScroll =$('.chat.chat-active').height();
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
