import { Express } from "express";
import { Server } from "http";
import { createServer } from "http";
import { createExpressApp } from "./app";
import { createSocketServer } from "./socket";

export function createServerApp(): Server {
    const app: Express = createExpressApp();
    const server: Server = createServer(app);
    createSocketServer(server);
    return server;
}
port = 5000
const server = createServerApp();
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.route('/status').get((req, res) => {
    res.json({ status: 'OK' });
}
app.route('/stats').get(async (req, res) => {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.json({ users, files });
}
app.route('/connect').get(async (req, res) => {
    const status = dbClient.isAlive();
    res.json({ status });
}
app.route('/disconnect').get(async (req, res) => {
    const status = dbClient.isAlive();
    res.json({ status });
}
app.route('/users/me').get(async (req, res) => {
    const user = await dbClient.nbUsers();
    res.json({ user });
}
app.route('/files/me').get(async (req, res) => {
    const file = await dbClient.nbFiles();
    res.json({ file });
}
app.route('/files/:id').get(async (req, res) => {
    const file = await dbClient.nbFiles();
    res.json({ file });
}
app.route('/files/:id').delete(async (req, res) => {
    const file = await dbClient.nbFiles();
    res.json({ file });
}
