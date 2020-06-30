const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const database = {
	users:[
		{
			id : '123',
			name : 'Ajay',
			email : 'ajay@gmail.com',
			password : 'monster',
			entries : 0,
			joined : new Date()
		},
		{
			id : '124',
			name : 'Vijay',
			email : 'Vijay@gmail.com',
			password : 'demon',
			entries : 0,
			joined : new Date()
		}
	]
}

app.get('/',(req,res)=>{
	res.send(database.users);
});

app.post('/signin',(req,res)=>{
	if(req.body.email === database.users[0].email &&
	   req.body.password === database.users[0].password){
		res.json(database.users[0]);
	}else{
		res.status(400).json('error logging in');
	}
});

app.post('/register',(req,res)=>{
	database.users.push({
		id : '125',
		name : req.body.name,
		email : req.body.email,
		entries : 0,
		joined : new Date()
	});
	res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id',(req,res)=>{
	const { id } = req.params;
	let found = false;
	database.users.forEach(user=>{
		if(user.id===id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json('not found');
	}
})

app.put('/images',(req,res)=>{
	const { id } = req.body;
	let found = false;
	database.users.forEach(user=>{
		if(user.id===id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(404).json('not found');
	}
})

app.listen(3000,()=>{
	console.log("Working on 3000");
});