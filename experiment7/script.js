// Initialize data array
let entriesData = [];

// Get DOM elements
const form = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');
const notification = document.getElementById('notification');

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
        return;
    }
    
    // Create entry object
    const entry = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        city: city
    };
    
    // Add to array
    entriesData.push(entry);
    
    // Add to table
    addRowToTable(entry);
    
    // Reset form
    form.reset();
    document.getElementById('name').focus();
    
    // Show notification
    showNotification('Entry added successfully!', 'success');
    
    // Update empty message visibility
    updateEmptyMessage();
});

// Add row to table
function addRowToTable(entry) {
    const rowIndex = entriesData.length;
    const row = document.createElement('tr');
    row.setAttribute('data-id', entry.id);
    
    row.innerHTML = `
        <td>${rowIndex}</td>
        <td>${escapeHtml(entry.name)}</td>
        <td>${escapeHtml(entry.email)}</td>
        <td>${escapeHtml(entry.phone)}</td>
        <td>${escapeHtml(entry.city)}</td>
        <td>
            <button class="delete-row-btn" onclick="deleteRow(${entry.id})">Delete</button>
        </td>
    `;
    
    tableBody.appendChild(row);
}

// Delete row from table
function deleteRow(id) {
    const rowIndex = entriesData.findIndex(entry => entry.id === id);
    if (rowIndex > -1) {
        entriesData.splice(rowIndex, 1);
    }
    
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
        row.remove();
    }
    
    // Refresh table indexing
    refreshTableIndexes();
    updateEmptyMessage();
    showNotification('Entry deleted successfully!', 'success');
}

// Refresh table row numbers
function refreshTableIndexes() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

// Update empty message visibility
function updateEmptyMessage() {
    if (entriesData.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

// Copy to clipboard
function copyToClipboard() {
    if (entriesData.length === 0) {
        showNotification('No data to copy!', 'error');
        return;
    }
    
    let text = 'Name\tEmail\tPhone\tCity\n';
    entriesData.forEach(entry => {
        text += `${entry.name}\t${entry.email}\t${entry.phone}\t${entry.city}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✓ Data copied to clipboard!', 'success');
    }).catch(err => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Download as CSV
function downloadCSV() {
    if (entriesData.length === 0) {
        showNotification('No data to download!', 'error');
        return;
    }
    
    let csvContent = 'Name,Email,Phone,City\n';
    
    entriesData.forEach(entry => {
        const row = [
            `"${entry.name}"`,
            `"${entry.email}"`,
            `"${entry.phone}"`,
            `"${entry.city}"`
        ].join(',');
        csvContent += row + '\n';
    });
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `data_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('✓ CSV downloaded successfully!', 'success');
}

// Clear all data
function clearTable() {
    if (entriesData.length === 0) {
        showNotification('No data to clear!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to delete all entries? This action cannot be undone.')) {
        entriesData = [];
        tableBody.innerHTML = '';
        updateEmptyMessage();
        showNotification('All entries cleared!', 'success');
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

// Initialize empty message
updateEmptyMessage();
