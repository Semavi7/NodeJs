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

const createDB = () => {
    connection.query('CREATE DATABASE egitimdb', (err, result) => {
        if (err) {
            console.log('err', err);
        }
        console.log('result', result)
    })
}
const createTable = () => {
    connection.query('CREATE TABLE IF NOT EXISTS ogrenciler (ogrenci_id int AUTO_INCREMENT, ogrenci_adi VARCHAR(100), ogrenci_soyadi VARCHAR(100), PRIMARY KEY(ogrenci_id))', (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const createRecord = () => {
    const query = 'INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES("Ahmet","Koç")'
    connection.query(query, (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const createMultipleRecord = () => {
    const studensArr = [
        ["Ahmet", "Uçar"],
        ["Rıza", "Uçar"],
        ["Salih", "Uçar"]
    ]
    const query2 = "INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES ?"
    connection.query(query2, [studensArr], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const createDynamicRecord = () => {
    const query = 'INSERT INTO ogrenciler (ogrenci_adi, ogrenci_soyadi) VALUES(?,?)'
    const name = process.argv[2]
    const surname = process.argv[3]
    connection.query(query, [name, surname], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const selectMyData = () => {
    const query = "SELECT * FROM ogrenciler"
    connection.query(query, (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const findById = (id) => {
    const query = "SELECT * FROM ogrenciler WHERE ogrenci_id = ?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const findByNameWithId = (id, name) => {
    const query = "SELECT * FROM ogrenciler WHERE ogrenci_id = ? AND ogrenci_adi = ?"
    connection.query(query, [id, name], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const findByNameOrSurname = (name, surname) => {
    const query = "SELECT * FROM ogrenciler WHERE ogrenci_adi = ? OR ogrenci_soyadi = ?"
    connection.query(query, [name, surname], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const deleteById = (id) => {
    const query = "DELETE FROM ogrenciler WHERE ogrenci_id = ?"
    connection.query(query, [id], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}
const updateById = (name, surname, id) => {
    const query = "UPDATE ogrenciler SET ogrenci_adi=?, ogrenci_soyadi=? WHERE ogrenci_id=?"
    connection.query(query, [name, surname, id], (err, res) => {
        if (err) {
            console.log('err', err)
        }
        console.log('res', res)
    })
}

connection.connect((err) => {
    if (err) {
        console.log('hata', err)
    }
    console.log('bağlandı')
    // createDB()
    createTable()
    // createRecord()
    // createMultipleRecord()
    // createDynamicRecord()
    // selectMyData()
    // findById(6)
    // findById(4)
    // findByNameWithId(6,"burchan")
    // findByNameOrSurname("Ahmet","Uçar")
    // deleteById(2)
    updateById("Niyazi","Tukaş",3)
})
