const Index = (req, res) => {
    res.sendFile('D:/Project/NodeJs/ExpressJs'+ '/index.html')
}

const GetParameters = (req, res) => {
    const parameter = req.params
    console.log(parameter.markaAdi)
    console.log(parameter.segirAdi)
    const query = req.query
    console.log(query.min, query.max)
    res.sendFile('D:/Project/NodeJs/ExpressJs'+ '/index.html')
}

export {Index, GetParameters}