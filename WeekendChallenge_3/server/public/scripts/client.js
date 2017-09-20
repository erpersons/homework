$(document).ready(onReady);

function onReady() {
    console.log('js');

    $('#addButton').on('click', addTask);

    $('#taskTable').on('click', '.deleteMe', deleteTask);
    $('#taskTable').on('click', '.imComplete', completeTask);
    getTasks();
}; //end onReady

function getTasks() {

    $.ajax({
        type: 'GET',
        url: '/tasks',
        success: function (res) {
            console.log('gotten', res);
            $('#taskTable').empty();
            for (var i = 0; i < res.length; i++) {
                console.log('in getTasks for loop');
                // console.log(res[i].id);
                var $trow = $('<tr id = " + res[i].id + ">');
                var $id = res[i].id;
                var $delBtn =
                    $('<td><input type="button" value= "Delete" class="deleteMe" data-id="' + $id + '"></input></td>');
                var $completeBtn = $('<td><input type = "checkbox" value= "Complete" class = "imComplete" data-id ="' + $id + '"></input></td>');
                $trow.append('<td>' + res[i].taskname + '</td>');
                $trow.append('<td>' + res[i].status + '</td>');
                $trow.append($delBtn, $completeBtn);
                // $trow.prepend($completeBtn);
                $('#taskTable').append($trow);
            } //end for loop
        } //end success

    }) //end ajax
} //end getTasks
function addTask() {
    console.log('I am clicked.')
    var taskToAdd = {
        task: $('#inputBox').val()

    }
    console.log(taskToAdd);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
        success: function (res) {
            console.log('tasks posted');
            getTasks();

        } //end ajax success 

    }) //end ajax POST

    $('#inputBox').val(''); //reset placeholder 
} //end addTask
function deleteTask() {
    var thisId = $(this).data('id');
    console.log('in deleteTask', thisId);

    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + thisId,

        success: function (res) {
            console.log('server responds with', res, );
            getTasks();
        } //end ajax success
    }) // end ajax DELETE
} // end deleteTask function
function completeTask() {
    var thisId = $(this).data('id');
    console.log('in completeTask', thisId);

    $.ajax({
        method: 'PUT',
        url: '/tasks/' + thisId,

        success: function(res) {
            console.log('server responds with', res);
            getTasks();
        }
    })
} // end completeTask function