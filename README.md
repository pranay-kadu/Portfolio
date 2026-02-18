# Professional Portfolio Website

A responsive personal portfolio website built with HTML, CSS, JavaScript, and Node.js.

## Features
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **Project Showcase**: Display your latest work with GitHub links.
- **Contact Form**: Functional email contact form using Nodemailer.
- **Modern UI**: Smooth animations (ScrollReveal, Typed.js) and clean layout.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer (Gmail)

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root directory and add your Gmail credentials:
    ```env
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    PORT=3000
    ```

3.  **Run the Server**:
    ```bash
    node server.js
    ```

4.  **View Project**:
    Open [http://localhost:3000](http://localhost:3000) in your browser.
