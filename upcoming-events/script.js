const eventsData = [
    {
        "date": "13th January 2024",
        "title": "PM LED Sabbath",
        "department": "Personal Ministry",
        "image": "path/to/image1.jpg"
        },
        {
        "date": "20th January 2024",
        "title": "Library and Publishing Sabbath",
        "department": "Library and Publishing",
        "image": "path/to/image2.jpg"
        },
        {
        "date": "27th January 2024",
        "title": "Welfare Led Sabbath",
        "department": "Welfare",
        "image": "path/to/image3.jpg"
        },
        {
        "date": "3rd February 2024",
        "title": "Health Led Sabbath",
        "department": "Health",
        "image": "./wp-content/uploads/2016/04/logo2.png"
        },
        {
        "date": "10th February 2024",
        "title": "Deaconry Led Sabbath",
        "department": "Deaconry",
        "image": "path/to/image5.jpg"
        },
        {
        "date": "17th February 2024",
        "title": "Staffs Led Sabbath",
        "department": "Patrons Office",
        "image": "path/to/image6.jpg"
        },
        {
        "date": "24th February 2024",
        "title": "Stewardship Led Sabbath",
        "department": "Stewardship",
        "image": "path/to/image7.jpg"
        },
        {
        "date": "2nd March 2024",
        "title": "Music Sabbath",
        "department": "Music",
        "image": "path/to/image8.jpg"
        },
        {
        "date": "9th March 2024",
        "title": "Associates Led Sabbath",
        "department": "Associates",
        "image": "path/to/image9.jpg"
        },
        {
        "date": "16th March 2024",
        "title": "Global Youth Day Led Sabbath",
        "department": "Children Ministry",
        "image": "path/to/image10.jpg"
        },
        {
        "date": "23rd March 2024",
        "title": "Handing Over Sabbath",
        "department": "Elders Office",
        "image": "path/to/image11.jpg"
        },
        {
        "date": "30th March 2024",
        "title": "Holy Communion Sabbath",
        "department": "Deaconry & Elders",
        "image": "path/to/image12.jpg"
        },
        {
        "date": "6th April 2024",
        "title": "End Time Led Sabbath",
        "department": "Personal Ministry",
        "image": "path/to/image13.jpg"
        },
        {
        "date": "13th April 2024",
        "title": "Family Life Led Sabbath",
        "department": "ALO/AMO Department",
        "image": "path/to/image14.jpg"
        },
        {
        "date": "20th April 2024",
        "title": "Finalist Led Sabbath",
        "department": "Finalists",
        "image": "path/to/image15.jpg"
        }
        
        
    // ...and so on for all events
  ];
  
  const eventsContainer = document.querySelector('.events-container');
  
  // Get today's date
  const today = new Date();
  
  eventsData.forEach(event => {
    // Parse event date
    const eventDate = new Date(event.date.replace(/(\d+)(st|nd|rd|th)/, "$1"));
    
    // Check if the event date is in the future
    if (eventDate >= today) {
      const eventItem = document.createElement('div');
      eventItem.classList.add('event');
  
      const imageElement = document.createElement('img');
      imageElement.classList.add('event__image');
      imageElement.src = event.image; // Set the image src based on event data
  
      const dateElement = document.createElement('p');
      dateElement.classList.add('event__date');
      dateElement.textContent = event.date;
  
      const titleElement = document.createElement('h3');
      titleElement.classList.add('event__title');
      titleElement.textContent = event.title;
  
      const departmentElement = document.createElement('p');
      departmentElement.classList.add('event__description');
      departmentElement.textContent = `Organized by: ${event.department}`;
  
      eventItem.appendChild(imageElement);
      eventItem.appendChild(dateElement);
      eventItem.appendChild(titleElement);
      eventItem.appendChild(departmentElement);
  
      eventsContainer.appendChild(eventItem);
    }
  });
  