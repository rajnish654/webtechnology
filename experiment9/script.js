const form = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');
const notification = document.getElementById('notification');
const statusMessage = document.getElementById('statusMessage');

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

// Form submit event
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    
    // Validate fields
    if (!name || !email || !phone || !city) {
        showNotification('Please fill all fields', 'error');
        showStatus('Please fill all fields', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        showStatus('Please enter a valid email', 'error');
        return;
    }
    
    // Prepare data
    const data = {
        name: name,
        email: email,
        phone: phone,
        city: city
    };
    
    // Send to server
    submitData(data);
});

// Submit data to server
function submitData(data) {
    showStatus('Submitting...', 'loading');
    
    fetch('api/add_entry.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('✓ Entry added successfully!', 'success');
            showStatus('Entry added successfully!', 'success');
            form.reset();
            document.getElementById('name').focus();
            
            // Reload data after short delay
            setTimeout(() => {
                loadData();
            }, 500);
        } else {
            showNotification('Error: ' + result.message, 'error');
            showStatus('Error: ' + result.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to submit data', 'error');
        showStatus('Failed to submit data', 'error');
    });
}

// Load data from database
function loadData() {
    showStatus('Loading data...', 'loading');
    emptyMessage.textContent = 'Loading data from database...';
    
    fetch('api/get_entries.php')
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            displayData(result.data);
            showStatus('', '');
        } else {
            showStatus('Error loading data', 'error');
            emptyMessage.textContent = 'Error loading data from database.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showStatus('Failed to load data', 'error');
        emptyMessage.textContent = 'Failed to connect to database.';
    });
}

// Display data in table
function displayData(entries) {
    tableBody.innerHTML = '';
    
    if (entries.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
        entries.forEach((entry, index) => {
            const row = document.createElement('tr');
            const date = new Date(entry.created_at).toLocaleString();
            
            row.setAttribute('data-id', entry.id);
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${escapeHtml(entry.name)}</td>
                <td>${escapeHtml(entry.email)}</td>
                <td>${escapeHtml(entry.phone)}</td>
                <td>${escapeHtml(entry.city)}</td>
                <td>${date}</td>
                <td>
                    <button class="delete-row-btn" onclick="deleteEntry(${entry.id})">Delete</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Delete entry
function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        fetch('api/delete_entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification('✓ Entry deleted successfully!', 'success');
                loadData();
            } else {
                showNotification('Error deleting entry', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to delete entry', 'error');
        });
    }
}

// Download as CSV
function downloadCSV() {
    fetch('api/get_entries.php')
    .then(response => response.json())
    .then(result => {
        if (result.success && result.data.length > 0) {
            let csvContent = 'Name,Email,Phone,City,Added On\n';
            
            result.data.forEach(entry => {
                const date = new Date(entry.created_at).toLocaleString();
                const row = [
                    `"${entry.name}"`,
                    `"${entry.email}"`,
                    `"${entry.phone}"`,
                    `"${entry.city}"`,
                    `"${date}"`
                ].join(',');
                csvContent += row + '\n';
            });
            
            // Create blob and download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', `database_export_${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('✓ CSV downloaded successfully!', 'success');
        } else {
            showNotification('No data to download', 'info');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to download CSV', 'error');
    });
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to delete ALL entries? This action cannot be undone.')) {
        fetch('api/clear_all.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification('✓ All entries cleared!', 'success');
                loadData();
            } else {
                showNotification('Error clearing data', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Failed to clear data', 'error');
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Show status message
function showStatus(message, type = '') {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message ' + type;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
