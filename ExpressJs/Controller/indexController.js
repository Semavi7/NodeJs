const Index = (req, res) => {
    res.render('index')
}

const GetParameters = (req, res) => {
    const parameter = req.params
    console.log(parameter.markaAdi)
    console.log(parameter.segirAdi)
    const query = req.query
    console.log(query.min, query.max)
    res.render('index')
}

export {Index, GetParameters}