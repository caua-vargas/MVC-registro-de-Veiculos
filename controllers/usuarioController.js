const usuarioModel = require('../models/usuarioModel');

async function auth(req,res){
    if(req.body.email !== "" || req.body.senha !== ""){
        const {email, senha} = req.body;
        let resp = await usuarioModel.auth(email, senha);
        if(resp.length >0){
            req.session.user = {
                idUsuario: resp[0].idUsuario,
                nome: resp[0].nome,
                email: resp[0].email
            }
            res.redirect('/carros')
        } else{            
            res.redirect('/login')
        }
    } else{
        alert("Dados incompletos");
    }
}

async function cadastrar(req,res){
    const {nome, email, senha} = req.body;
    usuarioModel.cadastrar(nome, email, senha);
    res.redirect("/login");
}

module.exports = {auth,cadastrar};