const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const app = express();
app.use(express.json());

// MongoDB connection for local
mongoose.connect('mongodb://localhost/product_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Mongodb is connected...')
});
// mongoose.connect('mongodb+srv://cluster0-r3qkz.mongodb.net/test?retryWrites=true&w=majority', {
//     dbName: 'product_api',
//     user: 'ronak',
//     pass: 'ronak4490',
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=>{
//     console.log('Mongodb is connected...')
// });


// Test routes
app.all('/test', (req, res)=>{
    let result = req.body;
   console.log(result); 
   res.send(result);
});

// Routes inject
const productRoutes = require('./Routes/Product.routes');
// Routes
app.use('/product', productRoutes);

// 404 error handle
app.use((req, res, next)=>{
    // const err = new Error('Not found');
    // err.status = 404;
    // next(err)
    next(createError(404, 'Not found.'));
});


// Express error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

app.listen(3000, ()=>{
    console.log('Server is started on 3000');
});