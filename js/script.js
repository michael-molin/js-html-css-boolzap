$(document).ready(function(){
    var source = $('#messaggio-template').html();                    //CREO IL TEMPLATE BASE PER I MESSAGGI
    var template = Handlebars.compile(source);

    var sorgenteCreaContatto= $('#crea-contatto-template').html();  //CREO IL TEMPLATE BASE PER POTER INSERIRE UN NUOVO UTENTE
    var templateContatto = Handlebars.compile(sorgenteCreaContatto);

    var sorgenteCreaChat= $('#crea-chat-template').html();          //CREO IL TEMPLATE BASE PER LA CHAT CORRISPONDENTE AL NUOVO UTENTE
    var templateChat = Handlebars.compile(sorgenteCreaChat);

    var indiceDataUtente = 0;  //VARIABILE UTILIZZATA COME INDICE PER LEGARE UTENTE E CHAT CORRISPONDENTE

    creaContattiDefault();

        //GESTIONE ICONA OPZIONI MESSAGGIO MOUSEENTER/MOUSELEAVE
        $('.chat').on('mouseenter', '.msg' , function() {
            $(this).find('.msg-overlay').show();
            $(this).find('.menu-opzioni').hide();
        });
        $('.chat').on('mouseleave', '.msg' , function() {
            $(this).find('.msg-overlay').hide()
        });

        // GESTIONE APERTURA OPZIONI MESSAGGIO
        $('.chat').on('click' , '.opzioni-chat i' , function() {
            $(this).next('.menu-opzioni').toggle();
        })

        // CANCELLAZIONE MESSAGGIO
        $('.chat').on('click' , '.cancella-chat' , function() {
            $(this).parents('.msg').remove();
        })

        // GESTIONE CLICK UTENTE/APERTURA CHAT CORRISPONDENTE
        $(document).on('click', '.utente' , function() {
                $('.chat').removeClass('default');
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

        // GESTIONE PULSANTE INVIA
        $('#invia').click(function(){
            inviaMessaggio();
            rispostaMessaggio();
        });

        // GESTIONE TASTIERA CHAT
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

        // GESTIONE RICERCA
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

        // CREAZIONE NUOVO CONTATTO
        $('#i-crea-contatto').click(function() {
            var nomeNuovoContatto = prompt('Inserisci nome nuovo contatto: ');
            creaNuovoContatto(nomeNuovoContatto, indiceDataUtente);
            indiceDataUtente++;
        });


        // GESTIONE FUNZIONI PRIMARIE MESSAGGISTICA

        function inviaMessaggio() {
            var inputSalvato = $('#input-msg').val();
            $('#input-msg').val('');
            creaMsg(inputSalvato, 'msg-sent');
            scroll();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                creaMsg('ok', 'msg-receive');
                $('.destinatario-chat-nome p').text('Ultimo accesso alle: ' + settaOra ());
                scroll();
            }, 3000);
        }

        function creaMsg(testo, inviatoRicevuto) {
            var datiMessaggio = {                               //creo un oggetto con testo, orario e classe (Inviato/ricevuto)
                    testoMessaggio: testo,
                    orarioMessaggio: settaOra (),
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

        function creaNuovoContatto(nomeContatto, indiceData) {
            var datiContatto = {
                nomeUtente: nomeContatto,
                dataNumero: indiceData,
                numPicsum: generaRandom(),
                orarioContatto: settaOra(),
            };
            var contattoCompilato = templateContatto(datiContatto);
            creaChat(datiContatto.nomeUtente, datiContatto.dataNumero);
            $('.lista-utenti').append(contattoCompilato);
        }

        function creaChat(nome, indiceData) {
            var datiChat = {
                nomeContatto : nome,
                orarioContatto : settaOra (),
                dataNumero: indiceData
            }

            var chatCompilata = templateChat(datiChat);
            $(chatCompilata).insertBefore('.testo');
        }

        function creaContattiDefault() {
            var utentiDefault = ["Shana", "Alessandro", "Enrico", "Arianna", "Daniel"];
            console.log('dentro creaContattiDefault');
            for (indiceDataUtente ; indiceDataUtente < utentiDefault.length ; indiceDataUtente++ ) {
                console.log('dentro al for');
                creaNuovoContatto(utentiDefault[indiceDataUtente], indiceDataUtente);
            }
        }
        // GESTIONE FUNZIONI SECONDARIE

        function settaOra () {
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
            return orarioAttuale;
        }

        function generaRandom() {
            return Math.floor(Math.random() * 1000 +1);
        }

        function scroll() {
            var pixelScroll =$('.chat.chat-active').height();
            $('.chat.chat-active').scrollTop(pixelScroll);
        }




});
