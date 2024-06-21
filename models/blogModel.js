const mongooes = require('mongoose');
const blogSchema = new mongooes.Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        body: {
            type: String,
            required: [true, 'discription is required'],
        },
        CoverimageURL: {
            type: String,
            default:["https://img.freepik.com/free-photo/abstract-dark-background-with-flowing-colouful-waves_1048-13124.jpg?w=900&t=st=1718961123~exp=1718961723~hmac=2fe5380ab76584ee9dfde5f23d2b5c8dd501ed5ce73cb1aab670327f6cd9cd1b"]
        },
        user: {
            type: mongooes.Types.ObjectId,
            ref: 'User',
            require:[true,'user id is required'],
        },
    },
    { timestamps: true }
);
const blogModel = mongooes.model('blog', blogSchema);

module.exports = blogModel;