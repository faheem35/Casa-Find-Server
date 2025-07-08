
require('dotenv').config() 
const express = require('express') 
const cors = require('cors')     
const userRouter= require('./routes/userRouter')
const adminRouter= require('./routes/adminRouter')
require('./database/dbConnection') 

const cfserver= express()  

cfserver.use(cors()) 
cfserver.use(express.json()) 
cfserver.use(userRouter)
cfserver.use(adminRouter)
cfserver.use('/uploads', express.static('./uploads'))

const PORT= 3000 || process.env.PORT 

cfserver.listen(PORT,()=>{   
          console.log(`My pfserver is ruuning in port: ${PORT} and waiting for client request!!!`);
})

cfserver.get('/',(req,res)=>{  
          res.status(200).send('<h1 style="color:red;">My pfserver is ruuning in port and waiting for client request!!!</h1>')
})

cfserver.post('/',(req,res)=>{
          res.status(200).send("POST request")
})
