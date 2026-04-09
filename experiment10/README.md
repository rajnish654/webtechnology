# Experiment 10 - Scientific Calculator

A fully functional scientific calculator built with HTML, CSS, and JavaScript.

## Features

### Basic Mode
- Addition, Subtraction, Multiplication, Division
- Memory functions (M+, M-, MR, MC)
- Clear and Delete operations
- Sign toggle (+/-)
- Decimal point support

### Scientific Mode
- **Trigonometric Functions:** sin, cos, tan, asin, acos, atan
- **Logarithmic Functions:** log (base 10), ln (natural log)
- **Power Functions:** x², x³, xʸ, √x
- **Special Functions:** Factorial (n!), Reciprocal (1/x), Exponential (eˣ)
- **Constants:** π (Pi), e (Euler's number)
- **Other:** Percentage, Modulo, Parentheses support
- **Mode Toggle:** Degree/Radian switch for trigonometric functions

### Additional Features
- 📊 **Calculation History:** Stores last 10 calculations
- 💾 **LocalStorage:** History persists across sessions
- ⌨️ **Keyboard Support:** 
  - Numbers: 0-9
  - Operators: +, -, *, /
  - Enter or = to calculate
  - Backspace to delete
  - Escape to clear
- 📱 **Responsive Design:** Works on desktop and mobile
- 🎨 **Modern UI:** Dark theme with gradient buttons

## File Structure
```
experiment10/
├── index.html      # Calculator UI
├── style.css       # Styling
├── script.js       # Calculator logic
└── README.md       # Documentation
```

## How to Use

1. **Open** `index.html` in a web browser
2. **Choose Mode:**
   - Click "Basic" for basic operations
   - Click "Scientific" for advanced functions
3. **Enter Numbers:** Click buttons or use keyboard (0-9, .)
4. **Select Operation:** Click operator buttons (+, -, *, /)
5. **Calculate:** Click = or press Enter
6. **Memory Functions:** Use M+, M-, MR, MC for memory operations
7. **View History:** Check history section below calculator

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Enter numbers |
| . | Decimal point |
| + - * / | Operators |
| = / Enter | Calculate |
| Backspace | Delete last digit |
| Escape | Clear all |

## Advanced Features

### Trigonometric Functions
- Default: Degree mode
- Switch to Radian mode with "RAD" button
- Supported: sin, cos, tan and their inverse (asin, acos, atan)

### Logarithmic Functions
- **log:** Base 10 logarithm
- **ln:** Natural logarithm (base e)
- **eˣ:** Exponential function

### Memory System
- **M+:** Add current number to memory
- **M-:** Subtract current number from memory
- **MR:** Recall memory value
- **MC:** Clear memory

## Error Handling
- Division by zero protection
- Domain error handling (e.g., sqrt of negative)
- Invalid expression handling

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Technologies Used
- **HTML5:** Structure
- **CSS3:** Styling with gradients and animations
- **JavaScript (Vanilla):** All calculator logic and math functions

## Future Enhancements
- Support for complex numbers
- Graphing functionality
- More statistical functions
- Multi-line calculation display
- Equation solver

---
Created for web technology learning | 2026
