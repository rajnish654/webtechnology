const form = document.getElementById('userForm');
const displayDiv = document.getElementById('displayDiv');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;
    
    // Display values in the div
    document.getElementById('displayName').textContent = name || 'Not provided';
    document.getElementById('displayEmail').textContent = email || 'Not provided';
    document.getElementById('displayAge').textContent = age || 'Not provided';
    document.getElementById('displayCountry').textContent = country || 'Not provided';
    document.getElementById('displayMessage').textContent = message || 'Not provided';
    
    // Show the display div with animation
    displayDiv.classList.add('show');
    
    // Optionally reset the form
    form.reset();
});

function clearDisplay() {
    displayDiv.classList.remove('show');
    form.reset();
}
