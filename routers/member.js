const { request, response } = require("express")
const express = require("express")
const app = express()

//membaca request dari body dengan type json
app.use(express.json())
//memanggil model
const models = require("../models/index")

//memanggil models member
const member = models.member

//Validasi Token
const {auth} = require("./login")
app.use(auth)

//endpoint to get all member
app.get("/", async (request, response) =>{
    let dataMember = await member.findAll()
    return response.json(dataMember)
})

//endpoint untuk menambah data member
app.post("/", (request, response) => {
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }
    member.create(newMember)
    .then(result => {
        response.json({
            message: `Data Berhasil Ditambahkan`,
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

//endpoint untuk merubah data member
app.put("/:id_member", async(request,response) => {
    let param = {id_member : request.params.id_member}
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        jenis_kelamin: request.body.jenis_kelamin,
        telepon: request.body.telepon
    }
    member.update(newMember, {where: param})
    .then(result => {
        response.json({
            message: `Data Berhasil Dirubah`,
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})

app.delete("/:id_member", async(request,response) => {
    let param = {id_member : request.params.id_member}
    member.destroy({where:param})
    .then(result => {
        response.json({
            message: `Data Berhasil Dihapus`
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
})
module.exports = app
//app di export agar bisa dijalankan di server