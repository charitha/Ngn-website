$('document').ready(function () {



    $('#btnCreateEvent').on('click', createEvent);

    //Creating Event
    function createEvent (event) {

        event.preventDefault;

        var errorCount = 0;

        $('#addEvent input').each(function(index,val){

            if($(this).val() === ''){

                errorCount++;
            }

        });

        if(errorCount === 0) {
            var resourcesArray = $('#addEvent fieldset input#inputResourceLink').val().split(',');
            var conductedByArray = $('#addEvent fieldset input#inputConduct').val().split(',');
         //   var imagePoster = document.getElementById('inputImage').files[0];

            var newEvent = {
                 'eventName': $('#addEvent fieldset input#inputEventTitle').val(),
                 'eventLocation': $('#addEvent fieldset input#inputLocation').val(),
                 'eventDate': $('#addEvent fieldset input#inputDate').val() ,
                 'eventTime':$('#addEvent fieldset input#inputTime').val(),
                 'eventDuration': $('#addEvent fieldset select#inputDuration').val(),
                 'eventType': $('#addEvent fieldset select#inputEventType').val(),
                 'eventTechnology' : $('#addEvent fieldset input#inputKeyTags').val(),
                 'eventDescription': $('#addEvent fieldset input#inputDescription').val(),
               //  'eventImage':imagePoster,
                 'eventConductedBy': conductedByArray,
                 'eventResources': resourcesArray
                }

            $.ajax({
                type:'POST',
                data:newEvent,
                url:'/admin',
                dataType:'JSON'
            }).done(function(response){
                   if (response === 'Your submission has been recorded'){
                       $('#addEvent fieldset input').val('');

                   }
                   $('p.successMsg').html(response);
                }

            );

        }
        else
        {
            alert('Please fill in all fields');
            return false;
        }


    }

});