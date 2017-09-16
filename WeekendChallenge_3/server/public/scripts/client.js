$(document).ready(onReady);

function onReady() {
    console.log('js');

    $('#addButton').on('click', addTask);
    getTasks();
    //saveTask();
   
} //end onReady

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (res) {
            console.log('gotten', res);
            $('#taskTable').empty();
            for (var i = 0; i < res.length; i++) {
                console.log('in for loop');
                var $trow = $('<tr>');
                var $delBtn = $('<input>', {type: 'button', class: 'deleteMe', value: 'Delete'});
                $trow.append('<td>' + res[i].taskname +'</td>');
                $trow.append('<td>' + res[i].status + '</td>');
                $trow.append($delBtn);
                $('#taskTable').append($trow);
            } //end for loop
        } //end success

    }) //end ajax
} //end getTasks
function addTask() {
    console.log('I am clicked.')
    var taskToAdd ={
        task: $('#inputBox').val()
     
    }
    console.log(taskToAdd);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
        success: function(res){
            console.log('tasks posted');
            getTasks();

        } //end ajax success 
       
    }) //end ajax POST

    $('#inputBox').val( 'Task' ); //reset placeholder
} //end addTask

  