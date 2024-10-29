const express = require("expresss");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes")

app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/admin',adminRouter);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

