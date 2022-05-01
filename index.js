
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=352',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#list').empty();
        response.tasks.forEach(function (task) {
          $('#list').append('<tr>' + '<td>' + task.content + '</td>' + '<td>' + '<button class="delete" data-id="' + task.id + '">Delete</button>' + '</td>' + '<td>' + '<input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '</td>' + '</tr>');
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=352',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#addItem').val()
        }
      }),
      success: function (response, textStatus) {
        $('addItem').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }

  var deleteTask = function (id) {
    $.ajax({
   type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=352',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=352',
      dataType: 'json',
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  $('#newTask').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('click', '.delete', function (){
    deleteTask($(this).data('id'));
  });

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markTaskComplete($(this).data('id'));
     }
   });
  
  
  getAndDisplayAllTasks();
