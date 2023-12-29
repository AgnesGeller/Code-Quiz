document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the JSON string from local storage using the key
    var storedData = localStorage.getItem('quizz');
  
    // Parse the JSON string to get back the original data (an array)
    var parsedData = JSON.parse(storedData);
  
    // Access the ol element where highscores will be displayed
    var highscoresList = document.getElementById('highscores');
  
    // Clear any existing content in the highscores list
    highscoresList.innerHTML = '';
  
    // Check if parsedData is an array and has items
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      // Sort the array in descending order based on the 'number' property
      parsedData.sort((a, b) => b.number - a.number);
  
      // Loop through the sorted array and create list items for each entry
      parsedData.forEach(entry => {
        var listItem = document.createElement('li');
        listItem.textContent = entry.key + ': ' + entry.number;
        highscoresList.appendChild(listItem);
      });
    } else {
      // Display a message when there are no highscores
      var noScoresMessage = document.createElement('p');
      noScoresMessage.textContent = 'No highscores available.';
      highscoresList.appendChild(noScoresMessage);
    }
  
    // Add event listener to the clear button
    var clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function () {
      // Clear the data in local storage and reset the highscores list
      localStorage.removeItem('quizz');
      highscoresList.innerHTML = '<p>No highscores available.</p>';
    });
  });
  