# HTML-CSS-JAVASCRIPT-PROJECT-03 | Tidewick Games

A responsive, interactive, multi-section website for **Tidewick Games**, a fictional independent game development studio, built using HTML5, CSS3, and JavaScript.

This project started as an HTML and CSS website template and was later enhanced with JavaScript functionality, dynamic user interactions, and EmailJS integration to create a more realistic company website experience.

## 🎮 Project Overview

**Tidewick Games** is a fictional game development company focused on creating immersive gaming experiences and creative digital adventures.

The website introduces the studio and its featured game, *Low Lantern*, a coastal puzzle adventure. It provides visitors with an interactive experience through its navigation, gallery, skills, events, and production package sections.

The project demonstrates how JavaScript can transform a primarily static website into a more dynamic and functional front-end application.

## 🛠 Technologies Used

- **HTML5** – Semantic structure and website content.
- **CSS3** – Responsive layouts, animations, transitions, and visual styling.
- **JavaScript (ES6+)** – Dynamic content, interactive components, and DOM manipulation.
- **EmailJS** – Sending website form submissions directly to an email inbox without building a custom backend.
- **Font Awesome** – Icons and visual elements.
- **Google Fonts (Cairo)** – Typography.
- **Local Storage** – Saving selected user preferences and website interactions where applicable.

## 📁 Project Structure

```text
Tidewick-Games/
│
├── css/
│   ├── all.min.css
│   ├── normalize.css
│   └── elzero.css
│
├── js/
│   └── main.js
│
├── imgs/
│   └── (all project images)
│
├── webfonts/
│   └── (Font Awesome webfonts)
│
└── index.html
```

## ✨ Main Website Features

- Responsive multi-section website layout.
- Company branding and game studio introduction.
- Navigation bar with interactive dropdown menu.
- Landing section introducing Tidewick Games.
- Articles and studio content sections.
- Interactive image gallery.
- Company skills and statistics sections.
- Events and upcoming game-related announcements.
- Production packages and discount request section.
- Footer with social media icons and navigation links.
- CSS variables, Flexbox, and CSS Grid.
- Custom keyframe animations and hover effects.
- Responsive design using CSS media queries.

## ⚡ JavaScript Features & Enhancements

### 1. Interactive Navigation
- Dropdown navigation menu with click and hover interactions.
- Supports touch devices.
- Closes when clicking outside the menu.
- Supports the Escape key for improved usability.

### 2. Interactive Image Gallery
- Click images to open an enlarged lightbox view.
- Navigate between images using Previous and Next controls.
- Keyboard navigation using the arrow keys.
- Close the gallery using the Escape key.

### 3. Animated Skills Progress Bars
- Skill bars animate from zero to their target percentages.
- Animation starts when the skills section enters the viewport.
- Uses the Intersection Observer API to trigger animations efficiently.
- Supports reduced-motion accessibility preferences.

### 4. Dynamic Statistics Counters
- Statistics animate by counting up when their section becomes visible.
- Creates a more engaging presentation of company information.

### 5. Event Countdown
- Displays the event countdown when a valid future event date is configured.
- Automatically displays an ended status when the event date has passed.

### 6. EmailJS Integration

Two functional email forms are integrated into the website:

**Discount Request Form**
- Collects visitor information.
- Sends the visitor's name, email, phone number, selected package, and message.
- Delivers requests directly to the configured receiving inbox.

**Event Updates Form**
- Allows visitors to submit their email address.
- Sends event update requests directly to the configured inbox.

EmailJS handles email delivery without requiring a custom backend.

## 📧 EmailJS Configuration

The website uses EmailJS with two separate email templates:

- Contact / Discount Request Template.
- Newsletter / Event Updates Template.

Configuration requires:
- EmailJS Public Key.
- Email Service ID.
- Discount Request Template ID.
- Event Updates Template ID.

The email templates must contain variable names matching the HTML form fields.

## 🎯 Learning Objectives

Through this project, I practiced and applied:

- HTML5 semantic structure.
- CSS variables, pseudo-elements, and advanced selectors.
- Flexbox and CSS Grid layouts.
- Responsive web design using media queries.
- CSS animations, transitions, and hover effects.
- JavaScript DOM manipulation and event handling.
- Conditional interactions and form validation.
- Intersection Observer API.
- Browser keyboard and mouse interactions.
- EmailJS integration and asynchronous form submissions.
- Organizing and maintaining a multi-file front-end project.

## 🚀 Future Improvements

- Backend integration for managing customer requests.
- Database integration for storing visitor information.
- User authentication and account management.
- Dedicated game portfolio and project pages.
- Mailing-list management and automated event notifications.
- Improved SEO and website performance.
- Further accessibility and cross-browser testing.

## 👤 Author

**Mostafa Mahmoud**

GitHub: [mostafa501](https://github.com/mostafa501)

**Project:** Tidewick Games  
**Technologies:** HTML5 | CSS3 | JavaScript | EmailJS
