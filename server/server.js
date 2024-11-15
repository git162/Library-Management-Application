const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin.routes");
const userRouter = require("./routes/user.routes");
const librarianRouter = require("./routes/librarian.routes");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/librarian', librarianRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(Date());
});
