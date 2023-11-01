// Get all events from the database
function getEvents() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'events.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Success
      var events = JSON.parse(xhr.responseText);
      displayEvents(events);
    } else {
      // Error
      console.log(xhr.statusText);
    }
  };
  xhr.send();
}

// Display events on the page
function displayEvents(events) {
  var eventsList = document.getElementById('events');
  eventsList.innerHTML = '';
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var eventItem = document.createElement('li');
    eventItem.innerHTML = event.name;
    eventItem.addEventListener('click', function() {
      editEvent(event);
    });
    eventsList.appendChild(eventItem);
  }
}

// Edit an event
function editEvent(event) {
  var idInput = document.getElementById('id');
  var nameInput = document.getElementById('name');
  var descriptionInput = document.getElementById('description');
  var startTimeInput = document.getElementById('startTime');
  var endTimeInput = document.getElementById('endTime');
  var locationInput = document.getElementById('location');

  idInput.value = event.id;
  nameInput.value = event.name;
  descriptionInput.value = event.description;
  startTimeInput.value = event.start_time;
  endTimeInput.value = event.end_time;
  locationInput.value = event.location;

  document.getElementById('edit-event-form').style.display = 'block';
}

// Submit the event form
document.getElementById('edit-event-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'event.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Success
      alert('Event updated successfully.');

      // Get the updated events from the database
      getEvents();
    } else {
      // Error
      console.log(xhr.statusText);
    }
  };

  var formData = new FormData(this);
  xhr.send(formData);
});

// Get all events on page load
window.addEventListener('load',)
