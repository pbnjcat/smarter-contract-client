//needs brew install qpdf

const PDFDocument = require('pdfkit');
const fs = require('fs');
const qpdf = require('node-qpdf');

// Function to create a PDF from a string
function createPdfFromString(inputString, outputFilePath, callback) {
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(outputFilePath);

  doc.pipe(writeStream);
  doc.text(inputString);
  doc.end();

  writeStream.on('finish', callback);
}

// Function to encrypt the PDF file using node-qpdf
function encryptPdf(inputFilePath, outputFilePath, password, callback) {
  const options = {
    keyLength: 256, // Use 256-bit encryption key
    password: password,
    outputFile: outputFilePath
  };

  qpdf.encrypt(inputFilePath, options, function (error) {
    if (error) {
      console.error('Error encrypting PDF:', error);
    } else {
      console.log('PDF encrypted successfully.');
      callback();
    }
  });
}

const myString = "Hello, this is a contract generated from GPT";
const outputFilePath = 'contract.pdf';
const encryptedFilePath = 'encrypted_contract.pdf';
const password = 'password';


createPdfFromString(myString, outputFilePath, () => {
  encryptPdf(outputFilePath, encryptedFilePath, password, () => {
    console.log('Process completed successfully.');
  });
});
