const express = require("express"); 
const detectlang=require("lang-detector")
const cors = require("cors"); 
const Axios = require("axios"); 
const app = express(); 
const PORT = 8000 ||  process.env.PORT ; 
const path = require('path');

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");

app.get("/home",(req,res) => {
	res.render("home")
})

app.get("/",(req,res) => {
	res.render("home")
})

app.get("/frontend",(req,res) => {
	res.render("frontend")
})


app.post("/compile", (req, res) => { 
	//getting the required data from the request 
	let input = req.body.input;
	
	let code=req.body.code;
	const language= detectlang(code)
	let lang2 ="txt"
	let lang1=""
	if (language === "Python") { 
		lang2 = "py"
		lang1="python"
	} 

	if (language === "C") { 
		lang2 = "c"
		lang1="c"
	} 

	if (language === "C++") { 
		lang2 = "cpp"
		lang1="cpp"
	} 

	if (language === "Java") { 
		lang1="java"
		lang2 = "java"
	} 

	console.log(language+""+lang2)

	
	let data = ({ 
		
		"language": lang1, 
		"stdin": input ,
		files: [
			{
			  name: `index.${lang2}`,
			  content: code
			}
		  ]
	});

	let config = { 
		method: 'post', 
		 url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',

		 headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': 'c7fa03d1dcmsh0abec7a494a0b36p1d6413jsn20ac5ac76fd5',
			'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
		  }, 
		data: data 
	}; 
	
	//calling the code compilation API 
	Axios(config) 
		.then((response) => { 

				res.send(response.data) 
			
		}).catch((error) => { 
			console.log(error); 
		}); 
}) 

app.listen(process.env.PORT || PORT, () => { 
	console.log(`Server listening on port ${PORT}`); 
});
