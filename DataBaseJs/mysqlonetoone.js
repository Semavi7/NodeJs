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

const createOneToOneTable = () => {
    connection.query("CREATE TABLE IF NOT EXISTS personel_cv (personel_cv_id INT AUTO_INCREMENT PRIMARY KEY, personel_cv_ad VARCHAR(100))", (err, res) => {
        if (!err) {
            connection.query("CREATE TABLE IF NOT EXISTS personel(personel_id INT AUTO_INCREMENT PRIMARY KEY, personel_cv_id INT NOT NULL, personel_adi VARCHAR(100), personel_soyadi VARCHAR(100), personel_maas VARCHAR(100), FOREIGN KEY (personel_cv_id) REFERENCES personel_cv(personel_cv_id) ON DELETE CASCADE)", (err, res) => {
                if (!err) {
                    console.log("hata yok")
                }
                console.log('err', err)
            })
        }
        else {
            console.log('err', err)
        }
    })
}

const createPersonel = (user) => {
    const query = 'INSERT INTO personel_cv (personel_cv_ad) VALUES(?)'
    connection.query(query, [process.argv[2]], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
        const cvId = res.insertId
        const query = 'INSERT INTO personel (personel_cv_id, personel_adi, personel_soyadi, personel_maas) VALUES(?,?,?,?)'
        connection.query(query, [cvId, user.ad, user.soyad, user.maas], (err, res) => {
            if (err) {
                console.log('err', err)
            }
            console.log('res', res)
        })
    })
}

const getAllRelations = () => {
    const query = "SELECT p.personel_id, p.personel_adi, p.personel_soyadi, p.personel_maas, pc.personel_cv_ad FROM personel AS p INNER JOIN personel_cv AS pc ON p.personel_cv_id=pc.personel_cv_id"
    connection.query(query, (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const updateCv = (id, cvname) => {
    const query = "SELECT p.personel_id, personel_cv_id FROM personel AS p WHERE p.personel_id=?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
        const cvId = res[0].personel_cv_id
        const query = "UPDATE personel_cv SET personel_cv_ad=? WHERE personel_cv_id=? "
        connection.query(query, [cvname, cvId], (err, res) => {
            if (err) {
                console.log('err', err);
            }
            console.log('result', res)
        })
    })
}

const deleteCv = (id) => {
    const query = "SELECT p.personel_id, personel_cv_id FROM personel AS p WHERE p.personel_id=?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
        const cvId = res[0].personel_cv_id
        const query = "DELETE FROM personel_cv WHERE personel_cv_id=?"
        connection.query(query, [cvId], (err, res) => {
            if (err) {
                console.log('err', err);
            }
            console.log('result', res)
        })
    })
}

connection.connect((err) => {
    if (err) {
        console.log('hata', err)
    }
    console.log('bağlandı')
    createOneToOneTable()
    // createPersonel({ad:"ali", soyad:"Uçar", maas:"30000"})
    // getAllRelations()
    // updateCv(1, "yeni bir cv")
    deleteCv(1)

})