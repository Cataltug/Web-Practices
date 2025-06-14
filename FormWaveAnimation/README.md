#  Form Wave Animation Login Page

A visually engaging login form with animated labels, built using HTML, CSS, and JavaScript. Each label letter animates with a wave-like effect as the user focuses on input fields — offering a smooth and modern UI experience.

##  Preview

![Form Wave Animation Preview](preview.png)  
*You can insert a screenshot or GIF of your project here.*

##  Features

- Smooth "wave" animation for form labels
- Responsive and clean UI
- Input field focus and validation styling
- Minimalistic glassmorphism-inspired design

##  Built With

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

##  How It Works

Each letter in the label is split into individual `<span>` elements using JavaScript. These spans are then animated with incremental transition delays, creating a wave-like motion when the input is focused or validated.

label.innerHTML = label.innerText
  .split("")
  .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
  .join("");

##   Inspiration
This project was inspired by modern form UI/UX trends and is great for learning creative ways to manipulate DOM elements with CSS transitions.