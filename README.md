
## General Information
1. Make sure to install Node.js
2. Cypress Installing command : `npm install cypress --save-dev`

## Project Setting up
Clone this repository. In the cloned repository's root run `npm install` to guarantee the dev dependencies are included.
After previous steps are done, run `npx cypress open` to open the cypress test runner.
Please find the test case in the path `./e2e/patientBooking.js`

## Mailslurp
To get the confirmation code from the mail or to validate the Appointment confirmation mail.
I have used the "Mailslurp" (Free services for testing email functionality => [https://www.mailslurp.com/])
To install the "Mailslurp" I have used the below commands
`npm install axios --save-dev`
`npm install --save cypress mailslurp`
`npm install mailslurp-client`

## Difficulties faced
The challenging part for me is the "Mail" testing part where I have to get the confirmation code, which I haven't done it before.
Also I don't have any account for the mail service provider. 
But still I manage to find one free service provider to automate this flow.
I have used cy.wait in cypress inorder to wait for the mail to be received in the mailslurp inbox.

## Video
Please find the test case passed in this video : ` https://app.screencast.com/pjKtNKRMsrNv7 `