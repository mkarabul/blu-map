const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 8000;

// Sample data for users
const users = [
    {
        "username": "lbailey",
        "password": "#anrk6Ug3#",
        "followers": "408",
        "following": "87",
        "profile_description": "Although miss real information.",
        "name": "Thomas Greene",
        "created_at": "2020-05-06",
        "gender": "Male",
        "phone_number": "986.724.6736",
        "age": "18",
        "amount_of_reports": 10,
        "is_suspended": true,
        "is_deleted": true
    },
    {
        "username": "thomasrichardson",
        "password": "$7zpp8AlsA",
        "followers": "282",
        "following": "900",
        "profile_description": "Feeling detail court recognize.",
        "name": "Jason Davis",
        "created_at": "2024-02-12",
        "gender": "Female",
        "phone_number": "001-896-764-6489x9754",
        "age": "34",
        "amount_of_reports": 4,
        "is_suspended": true,
        "is_deleted": true
    },
    {
        "username": "blanchardphillip",
        "password": "j6XPuOie^f",
        "followers": "259",
        "following": "608",
        "profile_description": "Watch pattern wide certainly clear capital.",
        "name": "Paul Baldwin",
        "created_at": "2023-11-28",
        "gender": "Female",
        "phone_number": "3489823571",
        "age": "59",
        "amount_of_reports": 9,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "calvinrandolph",
        "password": "N(pDelkQ+9",
        "followers": "998",
        "following": "434",
        "profile_description": "Artist set claim inside.",
        "name": "Joanne Ortiz",
        "created_at": "2023-09-11",
        "gender": "Male",
        "phone_number": "(677)770-3581x79704",
        "age": "40",
        "amount_of_reports": 2,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "saraguzman",
        "password": "*DY7zdevS2",
        "followers": "163",
        "following": "946",
        "profile_description": "Local blood choice wait table late notice.",
        "name": "Morgan Gonzales",
        "created_at": "2021-05-06",
        "gender": "Male",
        "phone_number": "001-871-989-9133x87126",
        "age": "51",
        "amount_of_reports": 3,
        "is_suspended": false,
        "is_deleted": false
    },
    {
        "username": "jimenezcarlos",
        "password": "_8B+QUqi_d",
        "followers": "911",
        "following": "913",
        "profile_description": "Relationship instead general style similar heart.",
        "name": "James Jones",
        "created_at": "2022-02-16",
        "gender": "Male",
        "phone_number": "692.562.7234x80115",
        "age": "40",
        "amount_of_reports": 6,
        "is_suspended": false,
        "is_deleted": false
    },
    {
        "username": "ichase",
        "password": "2nj1rEDw&B",
        "followers": "173",
        "following": "643",
        "profile_description": "Defense shake party want study reveal.",
        "name": "Amanda Cunningham",
        "created_at": "2023-03-19",
        "gender": "Female",
        "phone_number": "242.376.4064x875",
        "age": "37",
        "amount_of_reports": 1,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "jonathan89",
        "password": "#GSqfGW00b",
        "followers": "721",
        "following": "304",
        "profile_description": "Paper friend ahead.",
        "name": "Daniel Evans",
        "created_at": "2022-05-09",
        "gender": "Female",
        "phone_number": "980.861.3490x008",
        "age": "53",
        "amount_of_reports": 9,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "markanderson",
        "password": "*Od8&Uv_QR",
        "followers": "254",
        "following": "682",
        "profile_description": "Our they national five act.",
        "name": "Nancy Bruce",
        "created_at": "2023-01-01",
        "gender": "Male",
        "phone_number": "493-571-0873x25100",
        "age": "47",
        "amount_of_reports": 7,
        "is_suspended": true,
        "is_deleted": false
    },
    {
        "username": "mauricesimmons",
        "password": "&z7DSlK0_m",
        "followers": "818",
        "following": "406",
        "profile_description": "Policy loss news law.",
        "name": "Justin Forbes",
        "created_at": "2023-10-23",
        "gender": "Female",
        "phone_number": "001-600-451-2394x0543",
        "age": "55",
        "amount_of_reports": 0,
        "is_suspended": true,
        "is_deleted": false
    },
    {
        "username": "kosborn",
        "password": "I(1OdX7X$&",
        "followers": "149",
        "following": "514",
        "profile_description": "Gas bar test model.",
        "name": "Rebekah Perkins",
        "created_at": "2022-11-28",
        "gender": "Male",
        "phone_number": "471-597-0010x018",
        "age": "40",
        "amount_of_reports": 3,
        "is_suspended": false,
        "is_deleted": false
    },
    {
        "username": "vcrane",
        "password": "cWi68MSu+8",
        "followers": "440",
        "following": "581",
        "profile_description": "Hospital somebody back voice air pass term sense.",
        "name": "Andrew Mclaughlin II",
        "created_at": "2021-07-27",
        "gender": "Female",
        "phone_number": "001-981-278-5039x40832",
        "age": "42",
        "amount_of_reports": 2,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "kenneth41",
        "password": "*x_YLb#sh2",
        "followers": "186",
        "following": "552",
        "profile_description": "Open model point international difficult answer scientist.",
        "name": "Cameron Jones",
        "created_at": "2020-07-25",
        "gender": "Male",
        "phone_number": "(286)346-2812x73838",
        "age": "53",
        "amount_of_reports": 7,
        "is_suspended": false,
        "is_deleted": false
    },
    {
        "username": "kayla17",
        "password": "BNh0&J%v*1",
        "followers": "709",
        "following": "659",
        "profile_description": "Act agent others three message way popular.",
        "name": "Devin Morris",
        "created_at": "2020-08-09",
        "gender": "Male",
        "phone_number": "764.367.2106x95859",
        "age": "28",
        "amount_of_reports": 7,
        "is_suspended": true,
        "is_deleted": false
    },
    {
        "username": "amandahenderson",
        "password": "+8NGa5x(^D",
        "followers": "915",
        "following": "30",
        "profile_description": "Hard thus dream data experience speak serious.",
        "name": "Sharon Lopez MD",
        "created_at": "2022-06-25",
        "gender": "Female",
        "phone_number": "(916)493-3011x0488",
        "age": "42",
        "amount_of_reports": 6,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "kprice",
        "password": "*T@P5XQv5*",
        "followers": "217",
        "following": "823",
        "profile_description": "Personal pick everyone from.",
        "name": "James Wright",
        "created_at": "2023-10-25",
        "gender": "Female",
        "phone_number": "(251)641-4622x80177",
        "age": "52",
        "amount_of_reports": 3,
        "is_suspended": true,
        "is_deleted": false
    },
    {
        "username": "imccarty",
        "password": "E9_Q^@bz#B",
        "followers": "220",
        "following": "846",
        "profile_description": "Could scientist decade edge about.",
        "name": "Crystal Mack",
        "created_at": "2020-10-24",
        "gender": "Male",
        "phone_number": "875-250-4777",
        "age": "33",
        "amount_of_reports": 8,
        "is_suspended": false,
        "is_deleted": true
    },
    {
        "username": "terrimays",
        "password": "i*9TFTEr3#",
        "followers": "998",
        "following": "558",
        "profile_description": "Population establish I pick now sort will unit.",
        "name": "Monica Hart",
        "created_at": "2020-09-18",
        "gender": "Female",
        "phone_number": "(430)647-8876x87397",
        "age": "28",
        "amount_of_reports": 4,
        "is_suspended": false,
        "is_deleted": false
    },
    {
        "username": "romerocarol",
        "password": "*6E0NdV&Wo",
        "followers": "895",
        "following": "623",
        "profile_description": "Decision detail friend fine simply blood through every.",
        "name": "Grant Ward",
        "created_at": "2020-03-09",
        "gender": "Male",
        "phone_number": "9338854732",
        "age": "37",
        "amount_of_reports": 4,
        "is_suspended": true,
        "is_deleted": false
    },
    {
        "username": "lisa66",
        "password": "5v1XuBxf(C",
        "followers": "410",
        "following": "789",
        "profile_description": "Assume before vote.",
        "name": "William Torres",
        "created_at": "2020-02-21",
        "gender": "Male",
        "phone_number": "385.284.5254x405",
        "age": "49",
        "amount_of_reports": 8,
        "is_suspended": true,
        "is_deleted": true
    }
];

const admin = {
    username: "admin",
    password: "admin123",
    isAdmin: true
};

app.get("/api/home", (req, res) => {
    const data = {
        admin: admin,
        users: users
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
