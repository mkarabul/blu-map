const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 8000;


app.get("/api/home", (req, res) => {
    res.json( { username : "example",
                password : "password",
                followers : "12",
                following : "11",
                profile_description : "something idk",
                name: "Meet Patel"});

});


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})