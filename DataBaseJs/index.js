const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    waitForConnections: true,
    pool: 5,
    charset: 'UTF8_GENERAL_CI',
    port: '3306',
    debug: false,
    timezone: 'local',
    database: 'eğitim'
})


const createManyToManyTable = () => {
    connection.query("CREATE TABLE IF NOT EXISTS gonderi (gonderi_id INT AUTO_INCREMENT PRIMARY KEY, gonderi_adi VARCHAR(100))", (err, res) => {
        if (!err) {
            connection.query("CREATE TABLE IF NOT EXISTS etiket(etiket_id INT AUTO_INCREMENT PRIMARY KEY, etiket_adi VARCHAR(100))", (err, res) => {
                if (!err) {
                    console.log("hata yok")
                    connection.query("CREATE TABLE IF NOT EXISTS gonderi_etiket(gonderi_etiket_id INT AUTO_INCREMENT PRIMARY KEY, gonderi_id INT NOT NULL, etiket_id INT NOT NULL, FOREIGN KEY (gonderi_id) REFERENCES gonderi(gonderi_id) ON DELETE CASCADE, FOREIGN KEY (etiket_id) REFERENCES etiket(etiket_id) ON DELETE CASCADE)", (err, res) => {
                        if (!err) {
                            console.log("hata yok")
                        }
                        console.log('err', err)
                    })
                }
                console.log('err', err)
            })
        }
        else {
            console.log('err', err)
        }
    })
}

const createData = (data) => {
    const query = "INSERT INTO gonderi (gonderi_adi) VALUES (?)"
    connection.query(query, [data.gonderi_adi], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log("gonderi", res)
        console.log("gonderi hata", err)
        const gonderiId = res.insertId
        const etiketIds = []
        for (let index = 0; index < data.etiket.length; index++) {
            const query = "INSERT INTO etiket (etiket_adi) VALUES (?)"
            connection.query(query, [data.etiket[index]], (err, res) => {
                console.log("etiket", res)
                const query = "INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?,?)"
                connection.query(query, [gonderiId, res.insertId], (err, res) => {
                    console.log("gönderi etiket", res)
                    console.log("gönderi etiket hata", err);
                })
                console.log("etiket hata", err)
                etiketIds.push(res.insertId)
            })

        }
    })
}

createOtherData = (data) => {
    const query = "INSERT INTO gonderi (gonderi_adi) VALUES (?)"
    connection.query(query, [data.gonderi_adi], (err, res) => {
        const gonderiId = res.insertId
        for (let index = 0; index < data.etiket.length; index++) {
            console.log("hata", res)
            const query = "INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?,?)"
            connection.query(query, [gonderiId, data.etiket[index]], (err, res) => {
                console.log("gönderi etiket", res)
                console.log("gönderi etiket hata", err);
            })
        }
    })
}

const getAllData = () => {
    const query = "SELECT * FROM gonderi_etiket as ge INNER JOIN gonderi as g ON g.gonderi_id = ge.gonderi_id INNER JOIN etiket as e ON e.etiket_id = ge.etiket_id WHERE ge.gonderi_id=3"
    connection.query(query, (err, res) => {
        console.log('err', err);
        console.log('result', res)
        const gonderi = {}
        const etiketler = []
        for (let index = 0; index < res.length; index++) {
            etiketler.push(res[index].etiket_adi)
        }
        gonderi.gonderi_adi = res[0].gonderi_adi
        gonderi.etiketler = etiketler
        console.log('gonderi', gonderi)
    })
}

const updateGonderi = (etiketId, gonderiId, oldEtiketId) => {
    const query = "UPDATE gonderi_etiket SET etiket_id=? WHERE gonderi_id=? AND etiket_id=?"
    connection.query(query, [etiketId, gonderiId, oldEtiketId], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const removeEtiketFromGonderi = (gonderiId, etiketId) => {
    const query = "DELETE FROM gonderi_etiket WHERE gonderi_id=? AND etiket_id=?"
    connection.query(query, [gonderiId, etiketId], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const createWithTransaction = (data) => {
    const query = "INSERT INTO gonderi (gonderi_adi) VALUES (?)"
    connection.beginTransaction()
    connection.query(query, [data.gonderi_adi], (err, res) => {
        if (err) {
            connection.rollback()
            connection.end()
            return
        }
        const gonderiId = res.insertId
        const etiketIds = []
        for (let index = 0; index < data.etiket.length; index++) {
            const query = "INSERT INTO etiket (etiket_adi) VALUES (?)"
            connection.query(query, [data.etiket[index]], (err, res) => {
                if (err) {
                    connection.rollback()
                    connection.end()
                    return
                }
                console.log("etiket", res)
                const query = "INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?,?)"
                connection.query(query, [gonderiId, res.insertId], (err, res) => {
                    if (err) {
                        connection.rollback()
                        connection.end()
                        return
                    }
                    console.log("gönderi etiket", res)
                    console.log("gönderi etiket hata", err);
                })
                connection.commit()
                connection.end()
                console.log("etiket hata", err)
                etiketIds.push(res.insertId)
            })

        }
    })
}

connection.connect((err) => {
    if (err) {
        console.log('hata', err)
    }
    console.log('bağlandı')
    createManyToManyTable()
    // createData({
    //     gonderi_adi: "Merhaba bugün hava çok güzel",
    //     etiket: ["#piknik", "#gezi", "#eglence"]
    // })
    // createOtherData({
    //     gonderi_adi: "Merhaba bugün hava ne kadar güzel, hadi dışarı çıkalım",
    //     etiket: [5, 6]
    // })
    // getAllData()
    // updateGonderi(4,3,5)
    removeEtiketFromGonderi(3, 6)

})