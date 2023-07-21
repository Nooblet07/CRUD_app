In order for this app to function, you will need to pull my database image from Docker Hub.  Log into your Docker Hub by using 'Docker login' in the command prompt. Once authenticated, type the following command to pull my database down 'docker pull nooblet07/inventory-db-image:latest'.  Once the database is pulled, run the following command to run the container on your machine 'docker run -d -p 5432:5432 --name my-database-container nooblet07/inventory-db-image:latest'



Welcome to the Galvanize Inventory!  

When you first navigate to the site, you can see all of the inventory items in the database. Unfortunately there is a 100 character limit in the description field, so in order to read the full description, click the "View Item" button.  Next you can log in with the following usernames and passwords:

Username: mgreen    Password: 12345
Username: sshine    Password: 12346

You can also click the Create Account link in order to create your own account.  Just fill in you information and click the "Create Account" button and it will navigate you to the UserPage.  Just like the Login page, you can see all items in the inventory with the option to view specific items by clicking the "View Item" button.  You can also click the "Remove Item" button to delete the item from the inventory.  The "Update Item" button will allow you to edit the item and change whatever fields you want.  If you need to add an item to the inventory click the "Add Item" link at the top of the screen.  Fill in the fields and click the "Create Item" button and it will return you back to the UserPage with the newly added item. You can click the "Logout" button to log out and be brought back to the Login screen.

Thank you for using the Galvanize Inventory!