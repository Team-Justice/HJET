## Housing Justice Evaluation Tool v1.0

#### Release Notes 
NEW FEATURES \
  Added user and admin account creation \
  Added case creation, view, and edit functionality \
  Added decision trees and associated resources \
  Added graphs to view changes in case data over time \
  \
BUG FIXES \
	Removed submit ability until form fields are filled correctly \
	Fixed issues with field types and how they are being saved to the database \
	Fixed authorization issues to access database information \
  \
KNOWN BUGS \
	Going back to the case page from a view decision tree page can result in missing data \
	Security issues with access to front-end routes \
	UI is not currently configured for access on mobile phones 

#### Install Guide 
PRE-REQUISITES \
	You must install Node v12.0 before proceeding \
  \
DEPENDENCIES \
  To get dependencies for the project, launch the terminal, enter the folder for the application, and type: npm install \
\
DOWNLOAD \
  Project can be downloaded from: https://github.com/Team-Justice/HJET if you want to run the application locally or access the web application at: https://hjet.herokuapp.com/ \
\
INSTALLATION \
	No installation steps are needed \
  \
RUNNING APPLICATION \
  Launch a terminal window and enter the application folder and run: nodemon server \
  Launch a second terminal window and enter the client folder in the terminal folder and type: npm run start \
\
TROUBLESHOOTING \
  When trying to run the application locally, you might run into issues with the dependencies, to help with this first try rm -rf node_modules and then repeat the steps to add dependencies and run the application. 

	
