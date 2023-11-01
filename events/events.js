document.addEventListener('DOMContentLoaded', function() {
    fetch('events-data.json')
        .then(response => response.json())
        .then(data => {
            const eventsContainer = document.getElementById('events-container');

            data.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');

                // Customize the HTML structure based on your event data
                eventElement.innerHTML = `
                    <h2>${event.title}</h2>
                    <p>Date: ${event.date}</p>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                `;

                eventsContainer.appendChild(eventElement);
            });
        })
        .catch(error => {
            console.error('Error retrieving event data:', error);
        });
});
