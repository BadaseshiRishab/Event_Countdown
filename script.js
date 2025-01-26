document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the event name and date from the form
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    
    // Convert to UTC and create an event object
    const eventObj = { 
      name: eventName, 
      date: new Date(eventDate).toISOString() // Store in ISO 8601 (UTC) format
    };
    
    // Get existing events from localStorage or initialize an empty array
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Add the new event to the array
    events.push(eventObj);
    
    // Save the updated events array to localStorage
    localStorage.setItem('events', JSON.stringify(events));
    
    // Display the updated event list
    displayEvents();
    
    // Clear the form fields
    document.getElementById('eventForm').reset();
  });
  
  // Function to display events
  function displayEvents() {
    // Get events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Get the div where events will be displayed
    const eventListDiv = document.getElementById('eventList');
    
    // Clear the current list
    eventListDiv.innerHTML = '';
    
    // Check if there are any events to display
    if (events.length > 0) {
      events.forEach((eventData, index) => {
        // Parse the stored date back to Date object
        const eventDate = new Date(eventData.date);  // Convert back to Date object in UTC format
  
        // Calculate the countdown to the event
        const countdown = calculateCountdown(eventDate);
        
        // Create a div for each event
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
          <div>
            <h3>${eventData.name}</h3>
            <p>Event Date: ${eventDate.toLocaleString()}</p>
            <p class="countdown">Countdown: ${countdown}</p>
          </div>
          <button class="delete" onclick="deleteEvent(${index})">Delete</button>
        `;
        eventListDiv.appendChild(eventDiv);
      });
    } else {
      eventListDiv.innerHTML = '<p>No events available</p>';
    }
  }
  
  // Function to calculate the countdown to the event
  function calculateCountdown(eventDate) {
    const now = new Date();
    const timeDifference = eventDate - now;
    
    // Log the time difference calculation for debugging
    console.log('Time Difference (ms):', timeDifference);
    
    if (timeDifference <= 0) {
      return 'Event has passed';
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }
  
  // Function to delete an event
  function deleteEvent(index) {
    // Get events from localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Remove the event from the array by its index
    events.splice(index, 1);
    
    // Save the updated list back to localStorage
    localStorage.setItem('events', JSON.stringify(events));
    
    // Display the updated list of events
    displayEvents();
  }
  
  // Display events on page load
  window.onload = displayEvents;
  