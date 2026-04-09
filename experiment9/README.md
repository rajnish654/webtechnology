# Experiment 9 - Form with Database

This is a complete form application with MySQL database integration. It demonstrates form submission, data storage, and retrieval from a database.

## Files Structure

```
experiment9/
├── index.html          # Main HTML form and table
├── style.css           # CSS styling
├── script.js           # Frontend JavaScript (AJAX)
├── config.php          # Database configuration
├── database.sql        # Database schema
└── api/
    ├── add_entry.php   # Add new entry
    ├── get_entries.php # Retrieve all entries
    ├── delete_entry.php # Delete specific entry
    └── clear_all.php   # Clear all entries
```

## Setup Instructions

### For Local Development (localhost):

1. **Create Database:**
   - Open phpMyAdmin or MySQL command line
   - Run the SQL queries from `database.sql`
   OR
   - Import `database.sql` file directly

2. **Configure Database:**
   - Edit `config.php`
   - Update `DB_HOST`, `DB_USER`, `DB_PASS` as per your setup
   - Default: localhost, root, (empty password)

3. **Run Locally:**
   - Use PHP built-in server: `php -S localhost:8000`
   - Or use XAMPP/WAMP/LAMP

### For Infinity Free Hosting:

1. **Create Account:**
   - Go to https://infinityfree.net
   - Sign up and create a new account
   - Create a new website

2. **Upload Files:**
   - Use File Manager or FTP
   - Upload all files to `htdocs` or `public_html` folder
   - Keep the folder structure intact

3. **Create Database:**
   - Use the control panel → MySQL Manager
   - Copy-paste the SQL from `database.sql`
   - Create table named `entries`

4. **Configure Connection:**
   - Edit `config.php` with your Infinity database details
   - Database name, username, and password from control panel

5. **Important for Infinity:**
   - Database host is usually the server name (check control panel)
   - All files must be in public_html or a subdirectory
   - Use strong database password

## Features

✅ Add entries via form
✅ View all entries in table with timestamps
✅ Delete individual entries
✅ Clear all data at once
✅ Download data as CSV
✅ Real-time database synchronization
✅ Full input validation
✅ XSS protection with HTML escaping
✅ Prepared statements to prevent SQL injection
✅ Responsive design

## API Endpoints

- `POST /api/add_entry.php` - Add new entry
- `GET /api/get_entries.php` - Get all entries
- `POST /api/delete_entry.php` - Delete specific entry
- `POST /api/clear_all.php` - Delete all entries

## Security Features

- Prepared statements (prevent SQL injection)
- HTML escaping (prevent XSS attacks)
- Email validation
- Input trimming and validation
- CORS headers can be added if needed

## Deployment Checklist

- [ ] Database created on hosting
- [ ] Table structure imported
- [ ] config.php updated with correct credentials
- [ ] All files uploaded
- [ ] Test form submission
- [ ] Test data retrieval
- [ ] Test delete functionality
- [ ] Test CSV download
- [ ] Test on mobile devices

---
Created for web technology learning | 2026
