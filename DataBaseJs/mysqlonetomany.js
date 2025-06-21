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

const createOneToManyTable = () => {
    connection.query("CREATE TABLE IF NOT EXISTS kisiler (kisi_id INT AUTO_INCREMENT PRIMARY KEY, kisi_ad VARCHAR(100), kisi_soyad VARCHAR(100))", (err, res) => {
        if (!err) {
            connection.query("CREATE TABLE IF NOT EXISTS sosyal_medya(sosyal_medya_id INT AUTO_INCREMENT PRIMARY KEY, kisi_id INT NOT NULL, sosyal_medya_adi VARCHAR(100), FOREIGN KEY (kisi_id) REFERENCES kisiler(kisi_id) ON DELETE CASCADE)", (err, res) => {
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
const createUser = () => {
    const query = 'INSERT INTO kisiler (kisi_ad, kisi_soyad) VALUES(?,?)'
    const name = process.argv[2]
    const surname = process.argv[3]
    connection.query(query, [name, surname], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}

const createSocialMediaWithUser = () => {
    const query = "INSERT INTO sosyal_medya (kisi_id, sosyal_medya_adi) VALUES (?,?)"
    connection.query(query, [2, "Intagram"], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const getAllReationData = () => {
    const query = "SELECT * FROM kisiler AS k INNER JOIN sosyal_medya AS s ON k.kisi_id=s.kisi_id"
    connection.query(query, (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const getRelationById = (id) => {
    const query = "SELECT k.kisi_ad, s.sosyal_medya_adi, s.sosyal_medya_id FROM kisiler AS k INNER JOIN sosyal_medya AS s ON k.kisi_id=s.kisi_id WHERE k.kisi_id=?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const updateById = (kisiId,sosyalMedyaId,sosyalMedyaAdi) => {
    const query = "UPDATE sosyal_medya SET sosyal_medya_adi=? WHERE kisi_id=? AND sosyal_medya_id=?"
    connection.query(query, [sosyalMedyaAdi,kisiId,sosyalMedyaId], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

const deleteById = (id) => {
    const query = "DELETE FROM kisiler WHERE kisi_id=?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', res)
    })
}

connection.connect((err) => {
    if (err) {
        console.log('hata', err)
    }
    console.log('bağlandı')
    createOneToManyTable()
    // createUser()
    // createSocialMediaWithUser()
    // getAllReationData()
    // getRelationById(process.argv[2])
    // updateById(3,5,"Pinterest")
    deleteById(2)
})