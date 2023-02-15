require('dotenv').config({path : '../../.env'});
const Koa = require('koa');

const { koaBody } = require('koa-body');

const app = new Koa();

const router = require('./koaRouter');
app.use(koaBody());
app.use(router.routes());

// GraphQl Route
app.use((ctx) => {
    ctx.body = 'This is the main route of a Koa alternate routing power server';
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})