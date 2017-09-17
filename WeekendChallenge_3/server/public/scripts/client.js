$(document).ready(onReady);

function onReady() {
    console.log('js');

    $('#addButton').on('click', addTask);

    $('#taskTable').on('click', '.deleteMe', deleteTask);
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
                console.log('in for loop');
                // console.log(res[i].id);
                var $trow = $('<tr id = "' + res[i].id + '">');
                var $id = res[i].id;
                var $delBtn = 
                    $('<td><input type="button" value= "Delete" class="deleteMe" data-id="' + $id + '"></input></td>');
                //     $('<input>', { //-> need td?
                //     type: 'button',
                //     class: 'deleteMe',
                //     value: 'Delete',
                //     data-id:"' + $id + '", //<- need this?
                // });
                $trow.append('<td>' + res[i].taskname + '</td>');
                $trow.append('<td>' + res[i].status + '</td>');
                $trow.append($delBtn);
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

    $('#inputBox').val('Task'); //reset placeholder
} //end addTask
function deleteTask() {
    var thisId = $(this).data('id'); //questionable inputs -> var thisId = $(this).parent().data('id');
    console.log('in deleteTask', thisId);
  
    
    console.log(this);
   
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + thisId, //taskId?
    
        success: function (res) {
            console.log('server responds with', res,);
            getTasks();
        } //end ajax success
    }) // end ajax DELETE
} // end deleteTask function
