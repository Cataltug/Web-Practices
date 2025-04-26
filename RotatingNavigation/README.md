## Rotating Navigation

- A lightweight frontend component showcasing a rotating navigation menu. 
- Click the hamburger icon to spin the main content and reveal the navigation items, then use the close icon to rotate back.




### Features

- Smooth 3D rotation effect using CSS transforms and transitions
- Toggleable navigation menu with open/close buttons
- Icon-based UI with Font Awesome
- Responsive design that works across modern browsers

### Tech Stack

- HTML5 for semantic markup
- CSS3 for styling and animations
- CSS variables for easy theming
- Transitions and transforms for rotation
- JavaScript (ES6+) for event handling
- Font Awesome for menu icons

### Usage

- Click the ☰ (hamburger) button to rotate the content and show the menu.
- Click the × (close) button to rotate back to the home view.
- Customize the menu items in the <nav> element in index.html.

### Customizations

- Rotation Angle: Open style.css and tweak the transform: rotate(-20deg) value under .container.show-nav.

- Menu Items: Edit the "<ul>" in index.html to add/remove navigation links.

- Colors & Fonts: Adjust CSS variables or override styles in style.css.
