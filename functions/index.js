require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const firebaseHelper = require('firebase-functions-helper');
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory }= require('@angular/platform-server');
const cors = require('cors');

const { AppServerModuleNgFactory } = require('./dist/server/main');
const firebase = require('firebase-admin');

enableProdMode();

const index = require('fs')
    .readFileSync(path.resolve(__dirname, './dist/browser/index.html'), 'utf8')
    .toString();

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);
var db = firebaseApp.firestore();

let main = express();
let app = express();
const contactsCollection = 'cities';
app.use('/ssr', main);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.get('**', function(req,res){
    renderModuleFactory(AppServerModuleNgFactory, {
        url: req.path,
        document: index
    }).then( html => res.status(200).send(html));
});

exports.ssr = functions.https.onRequest(app);

// Add new contact
main.post('/contacts', (req, res) => {
    firebaseHelper.firestore
        .creatNewDocument(db, contactsCollection, req.body);
    res.send('Create a new contact');
})

// Update new contact
main.patch('/contacts/:contactId', (req, res) => {
    firebaseHelper.firestore
        .updateDocument(db, contactsCollection, req.params.contactId, req.body);
    res.send('Update a new contact');
})

// View a contact
main.get('/contacts/:contactId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, contactsCollection, req.params.contactId)
        .then(doc => res.status(200).send(doc));
})

// View all contacts
main.get('/contacts', (req, res) => {
    firebaseHelper.firestore
        .backup(db, contactsCollection)
        .then(data => res.status(200).send(data))
})



// Delete a contact 
main.delete('/contacts/:contactId', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, contactsCollection, req.params.contactId);
    res.send('Contact is deleted');
})