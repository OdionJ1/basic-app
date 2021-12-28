Running the Application from scratch (Prerequisites: Git, Node):
Click on this link (https://github.com/OdionJ1/basic-app).
When the page opens, click on the green button in the center right of the page. This will open a small model. Copy the link on the modal.
Create a new folder anywhere in your local environment. Right click on the new folder. On the menu that opens, click 'Git Bash Here'.
In the git terminal type 'git clone' then paste the link gotten from the modal, press enter.
After clone has been completed, in the terminal, type 'cd basic-app' to get into the basic app folder, then press enter. Then type 'npm i' to download node modules.
After node modules has been downloaded, type 'npm start' then press enter. This will run the application on the browser


Running the Application (Follow this process if application is already on your local environment):
Right click on the application folder. On the menu that opens, click 'Git Bash Here'. In the git terminal type 'npm start' then press enter
This will run the application on the browser


Application Usage:
When the application runs on the browser, user may have to wait for a few seconds for the application data to load.
User must select a Date to be able to see planned flights
User must select an Aircraft to be able to add flights to rotation


*Click the plus button on a flight to add to rotation
*Click the times button on a rotation to remove it


Adding flights to rotation enforces the following rules:
    - All aircrafts must be on the ground at midnight
    - The turnaround time (minimum time between the end of a flight and the beginning of the next one) is always 20min for this airline.