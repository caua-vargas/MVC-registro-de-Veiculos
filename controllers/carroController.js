const Carro = require('../models/carroModel');

async function verCarros (req, res) {
    const carros = await Carro.getCarros();
    return res.render('carrosView', {carros});
}

async function adicionarCarro(req, res){
    const { placa, ano, modelo, fabricante, renavam } = req.body;
    const foto = req.file.originalname;
    const carro = new Carro(placa, ano, modelo, fabricante, renavam, foto);
    Carro.addCarro(carro);
    res.redirect('/carros');
}

async function deletarCarro(req, res){
    const {id} = req.body;
    Carro.deleteCarro(id);
    res.redirect('/carros');
}

async function editarCarro(req, res){
    const {id} = req.params; 
    const carro = await Carro.getCarro(id);
    return res.render('editView', { carro: carro[0] });
}

async function updateCarro(req, res){
    const{ placa, ano, modelo, fabricante, renavam, id } = req.body;
    console.log(req.file);
    const foto = req.file.originalname;
    const carro = new Carro(placa, ano, modelo, fabricante, renavam, foto);
    Carro.update(carro,id);
    res.redirect('/carros');
}

module.exports = {verCarros,adicionarCarro,deletarCarro,editarCarro,updateCarro};