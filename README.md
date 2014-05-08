##SlimUI Framework

Thank you for trying out the SlimUI framework. 

Some of the project goals:
- Simplify the process of developing web applications
- Abstract-away the web technology stack
- Allow developers of all skill levels to add and modify application-specific functionality in a framework-agnostic way


##Sample Application
A sample application is included with this repository. To try it out, follow these steps:

0. Clone this repository to your local machine
1. Install NodeJS (and Node Package Manager, NPM) on your machine
2. Install Gulp (a NodeJS built-tool) by running 'npm install'
3. Build the framework and sample application by running 'gulp SampleApplication'
    - This collects all the source files and HTML into a file, app.js, and puts it in the project directory.
    - This app.js file is loaded by the SlimUI framework when the sample_application.html is opened by your browser
4. Host this folder with a webserver and open sample_application.html, and navigate to it from your favorite browser.

More documentation is provided in the sample application.


## Building SlimUI
To build the SlimUI framework, (in this directory) run 'bower install' followed by 'gulp'. 