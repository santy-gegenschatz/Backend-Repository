const localRoute = 'mongodb://localhost:27017/ecommerce'
const serverRoute = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nsmqg9h.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports = { localRoute, serverRoute, advancedOptions}
