import express from 'express';
import errorHandlingMiddle from './middlewares/error.handling.middle.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(errorHandlingMiddle);

app.use('/api', router);

app.listen(port, () => {
    console.log(`서버가 정상적으로 구동되었습니다. ${port}`);
});
