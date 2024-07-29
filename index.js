const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./User.js');0

const corsOptions = {
    origin: '*',
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type','Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const mongoURI = `mongodb+srv://saxenay117:mongoDB2024%23@cluster1.unzxb3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/register', async (req, res) => {
    const { name, contact } = req.body;
    try {
        const user = await User.findOne({contact});
        if(user)
        {
            return res.status(400).json({message: 'User already exists'});
        }
        if(contact.length == 10){
            const newUser = new User({ name, contact });
            await newUser.save();
            return res.status(200).json({ message: 'Registered successfully!' });
        }
        else{
            return res.status(400).json({message : 'Invalid Contact Number'});
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.error });
    }
});

app.get('/',(req,res)=>{
    res.send('Online !');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

