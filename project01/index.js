const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connection

mongoose.connect('mongodb://localhost:27017/project01')
.then(() => console.log('MongoDB Connected!'))
.catch((err) => console.log(err));

// Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    jobTitle: {
        type: String,
        required: true,
    }
},
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

//Middleware

app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    if (req.url === '/favicon.ico') {
        next();
    }
    fs.appendFile('log.txt', `${new Date(Date.now()).toLocaleString()} : ${req.method} : ${req.path}\n`, (err) => {
        if (err) res.status(500).end(JSON.stringify(err));
        next();
    });
});

// Routes

app.get('/users', async (req, res) => {
    const allDBUsers = await User.find({});
    const html = `
    <ul>
        ${allDBUsers.map(user => `<li>${user.firstName}, ${user.email}</li>`).join('')}
    </ul>
    `
    res.send(html);
});

app.get('/api/users', async (req, res) => {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
});


app.post('/api/users', async (req, res) => {
    const body = req.body;
    const searchValidation = !body || !body.first_name || !body.email || !body.gender || !body.job_title
    if (searchValidation) res.status(400).send(JSON.stringify({error: 'Please fill all fields'}));
    const addUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("user", addUser);
    return res.status(201).json({msg: 'User Created Successfully'});
});

app.route('/api/users/:id')
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch(async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({ msg: 'User Updated Successfully' });
        } catch (err) {
            return res.status(400).json({ error: 'User not found' });
        }
    })
    .delete(async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ msg: 'User Delete Successfully' });
        } catch (err) {
            return res.status(400).json({ error: 'User not found' });
        }
    });

app.listen(port, () => {
    console.log(`Server running on port: ${port}
    Access from: http://localhost:${port}/users`);
});