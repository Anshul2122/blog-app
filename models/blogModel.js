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
            default:"this is image cover of the blog"
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