$(document).ready(function(){
    var source = $('#messaggio-template').html();
    var template = Handlebars.compile(source);
    var sorgenteCreaContatto= $('#crea-contatto-template').html();
    var templateContatto = Handlebars.compile(sorgenteCreaContatto);
    var sorgenteCreaChat= $('#crea-chat-template').html();
    var templateChat = Handlebars.compile(sorgenteCreaChat);
    var indiceDataUtente = 11;

    //gestione orario
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
            $(this).find('.msg-overlay').hide()
        });

        // GESTIONE apertura opzioni chat
        $('.chat').on('click' , '.opzioni-chat i' , function() {
            $(this).next('.menu-opzioni').toggle();
        })

        $('.chat').on('click' , '.cancella-chat' , function() {
            $(this).parents('.msg').hide();
        })

        $(document).on('click', '.utente' , function() {
                $(this).removeClass('utenteclick');
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

        $('#i-crea-contatto').click(function() {
            creaNuovoContatto(indiceDataUtente , orarioAttuale);
            indiceDataUtente++;
        });

        function inviaMessaggio() {
            var inputSalvato = $('#input-msg').val();
            $('#input-msg').val('');
            creaMsg(inputSalvato, orarioAttuale, 'msg-sent');
            scroll();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                creaMsg('ok', orarioAttuale, 'msg-receive');
                $('.destinatario-chat-nome p').text('Ultimo accesso alle: ' + orarioAttuale);
                scroll();
            }, 3000);
        }

        function scroll() {
            var pixelScroll =$('.chat.chat-active').height();
            $('.chat.chat-active').scrollTop(pixelScroll);
        }

        function creaMsg(testo, orario, inviatoRicevuto) {
            var datiMessaggio = {                               //creo un oggetto con testo, orario e classe (Inviato/ricevuto)
                    testoMessaggio: testo,
                    orarioMessaggio: orario,
                    tipoMessaggio: inviatoRicevuto
            };

            var dataUtenteTemp = $('.chat.chat-active').data('nomeUtente'); //ricavo valore DATA
            $('.utente').each(function() {                                  // ciclo per controllare corrispondenza DATA
                if (dataUtenteTemp == ($(this).data('nomeUtente'))) {       // Se DATA uguale
                    $(this).find('p').text(datiMessaggio.testoMessaggio);   // Modifica anteprima messaggio chat sx
                    $(this).find('h5').text(datiMessaggio.orarioMessaggio); // modifica orario messaggio chat sx
                }
            });
            var templateCompilato = template(datiMessaggio);                //assegno valori oggetto alle parti in {{}} nel template
            $('.chat.chat-active').append(templateCompilato);               // append chat, ovvero inserisco messaggio
        }

        function generaRandom() {
            return Math.floor(Math.random() * 1000 +1);
        }

        function creaNuovoContatto(indiceData, orario ) {
            var datiContatto = {
                nomeUtente: prompt('Inserisci nome nuovo contatto: '),
                dataNumero: indiceData,
                numPicsum: generaRandom(),
                orarioContatto: orario,
            };
            var contattoCompilato = templateContatto(datiContatto);
            creaChat(datiContatto.nomeUtente, datiContatto.orarioContatto, datiContatto.dataNumero);
            $('.lista-utenti').append(contattoCompilato);
            //$('<div class="chat cleafix" data-nome-utente="'+indiceData+'">').insertBefore('.testo');
        }

        function creaChat(nome, orario, data) {
            var datiChat = {
                nomeContatto : nome,
                orarioContatto : orario,
                dataNumero: data
            }

            var chatCompilata = templateChat(datiChat);
            $(chatCompilata).insertBefore('.testo');
        }






});
