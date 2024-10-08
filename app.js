import express from 'express';
const app = express();

const port =2000;

const first=((res,req,next)=>{
    if(20 > 10){
         next();
    }

});
const secound = ((req,res,next)=>{
    if (20 > 10){
        next();
    }
});
const third=((req,res,next)=>{
    if(10<20){
        next();
    }
});

app.get('/blank', first,(req,res)=>{
    res.send('Your Searching blank page');
});

app.get('/abouts',secound,(req,res)=>{
    res.send("This  is about page");

});

app.get('/user/:121',third,(req,res)=>{
    res.send("This is user page");
});

app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });

   /* import express from 'express'; // Import express

const app = express(); // Create an instance of express

const port = 2000; // Define the port

// Define a route for "/blank"
app.get("/blank", (req, res) => {
    res.send('You are searching a blank page');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/
