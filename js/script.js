$(document).ready(function(){
    var orario = new Date;
    var orarioAttuale = (orario.getHours() + ":" + orario.getMinutes());
    
        $('#invia').click(function(){
            inviaMessaggio();
            rispostaMessaggio();
        });

        $('#input-msg').keydown(function(event){
            if (($('#input-msg').val()) == '') {
                $('#invia').hide();
                $('#audio').show();
            } else {
                $('#audio').hide();
                $('#invia').show();
            }
            if (event.key == "Enter") {
                console.log('tasto funzionante');
                inviaMessaggio();
                rispostaMessaggio();
            }
        });


        function inviaMessaggio() {
            var inputSalvato = $('#input-msg').val();
            $('#input-msg').val('');
            var nuovoMessaggio = $('.template .msg-sent').clone();
            nuovoMessaggio.children('.msg-testo').text(inputSalvato);
            nuovoMessaggio.children('.msg-orario').text(orarioAttuale);
            $('.chat').append(nuovoMessaggio);
            $('#invia').hide();
            $('#audio').show();
        }

        function rispostaMessaggio() {
            setTimeout(function () {
                var nuovoMessaggio = $('.template .msg-receive').clone();
                nuovoMessaggio.children('.msg-testo').text('Ok');
                nuovoMessaggio.children('.msg-orario').text(orarioAttuale);
                $('.chat').append(nuovoMessaggio);
            }, 1000);
        }
});
