// Importer les modules express et socket.io
const express = require('express');
const socketio = require('socket.io');

// Créer une instance d'express
const app = express();

// Créer un serveur HTTP avec express
const server = require('http').createServer(app);

// Créer une instance de socket.io avec le serveur HTTP
const io = socketio(server);

// Définir le port d'écoute
const port = process.env.PORT ?? 4000;

// Gérer la connexion des clients
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Gérer les messages reçus du premier serveur
    socket.on('msgFromServer', (data) => {
        // Envoyer le message au client
        socket.emit('msgToClient', data);
    });
});

// Lancer le serveur socket.io
server.listen(port, () => {
    console.log(`Websocket Server listening on port ${port}`);
});
