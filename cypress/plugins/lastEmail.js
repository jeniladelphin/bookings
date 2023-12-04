import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
 
// Function to connect to the mailbox using Ethereal SMTP server details.
const connectToMailbox = async () => {
  // Replace these with the Ethereal SMTP server details obtained while creating the account.
  const client = new ImapFlow({
    host: 'smtp.ethereal.email',
    port: '587',
    secure: false,
    auth: {
      user: 'solon.steuber80@ethereal.email', // Ethereal username
      pass: '1fmfueV7v13tSXdw1t', // Ethereal password
    },
  });
 
  await client.connect(); // Connect to the mailbox
  return client;
};
 
// Function to fetch the last email from the INBOX mailbox.
const fetchLastEmail = async (client) => {
  let lock;
  let message;
 
  try {
    lock = await client.getMailboxLock('INBOX'); // Acquire the mailbox lock
    message = await client.fetchOne(client.mailbox.exists, { source: true }); // Fetch the last email
  } finally {
    if (lock) {
      await lock.release(); // Release the mailbox lock
    }
  }
 
  return message;
};
 
// Function to parse the email content.
const parseEmail = async (source) => {
  const parsedEmail = await simpleParser(source);
 
  // Extract the necessary information from the parsed email
  return {
    subject: parsedEmail.subject,
    text: parsedEmail.text,
    html: parsedEmail.html,
    attachments: parsedEmail.attachments,
  };
};
 
// Function to retrieve the last received email from the mailbox.
const lastEmail = async () => {
  try {
    const client = await connectToMailbox();
    const message = await fetchLastEmail(client);
 
    if (!message) {
      throw new Error('No message found');
    }
 
    const source = Buffer.from(message.source);
    const parsedData = await parseEmail(source);
 
    await client.logout();
 
    return parsedData; // Return the parsed email data
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
 
export default lastEmail;