const express = require('express'); 
const path = require ('path'); 
const cors = require('cors');

const nav= [
    {
        link:"/books",
        title:"Books"
    },
    {
        link:"/authors",
        title:"Authors"
    },
    {
        link:"/books/addbook",
        title:"Add Book"
    },
    {
        link:"/authors/addauthor",
        title:"Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav); //part#1 point1
const booksRouter = require('./src/routes/booksroute')(nav);//part#2 point6
const authorsRouter = require('./src/routes/authorsroute')(nav);//part#2 point6

const app = express();       //part#1point1

app.use(cors());//part#2 point7

app.set('views','./src/views'); 
app.set('view engine','ejs'); 


app.use(express.urlencoded({extended:true})); //part#1 point2
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{});
    
});





app.listen(process.env.PORT||5000,()=>{
    console.log("Server Ready on 5000"); //part#1 point5::port number was given 5000 and server consoleloged in 3000.server is running in port number 5000 actually.
});