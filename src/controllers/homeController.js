let getHomepage = async(req, res) => {
    console.log('>>>test route home Page ')
    return res.render('index.ejs')
}

export default {
    getHomepage,

};