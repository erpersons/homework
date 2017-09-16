$(document).ready(onReady);

function onReady() {
    console.log('js');

    $('#addButton').on('click', addTask);
    getTasks();
}

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
                $trow.append('<td>' + res[i].task +'</td>');
                $trow.append('<td>' + res[i].complete + '</td>');
                $('#taskTable').append($trow);
            } //end for loop
        } //end success

    }) //end ajax
} //end getTasks
function addTask() {
    console.log('I am clicked.')
    var taskToAdd ={
        task: $('#task').val(),
        complete: $('#complete').val()
    }
    console.log(taskToAdd);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
        success: function(res){
            console.log('tasks posted');
            getTasks();
        }
    })
}