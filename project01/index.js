const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const {urlencoded} = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    fs.appendFile('log.txt', `${new Date(Date.now()).toLocaleString()} : ${req.method} : ${req.path}\n`, (err, data) => {
        if (err) res.status(500).end(JSON.stringify(err));
        next();
    });
})

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
});

app.get('/api/users', (req, res) => {
    return res.json(users);
});


app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1,...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({status: 'success', id: users.length});
    })
});

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// });
//
// app.patch('/api/users/:id', (req, res) => {
//     // later
//     return res.json({status: 'pending'});
// });
//
// app.delete('/api/users/:id', (req, res) => {
//     // later
//     return res.json({status: 'pending'});
// });

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const user = users.find(u => u.id === id);
        if (!user) return res.status(404).json({ error: "User not found" });

        Object.assign(user, body);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ status: 'error', message: 'Failed to update user' });

            return res.json({ status: 'updated', user });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);

        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({ error: "User not found" });

        const deletedUser = users.splice(index, 1);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ status: 'error', message: 'Failed to delete user' });
            return res.json({ status: 'deleted', user: deletedUser[0] });
        });
    });

app.listen(port, () => {
    console.log(`Server running on port: ${port}
    Access from: http://localhost:${port}/users`);
});