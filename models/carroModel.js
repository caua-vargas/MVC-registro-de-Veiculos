const database = require("./database");

class Carro{
    constructor(placa, ano, modelo, fabricante, renavam, foto){
        this.placa = placa;
        this.ano = ano;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.renavam = renavam;
        this.foto = foto;
    }
    static async getCarros(){
        return await database.query(`SELECT * FROM carro;`);   
    }

    static async getCarro(id){
        return await database.query(`SELECT * FROM carro WHERE idCarro = ${id};`);
    }

    static async addCarro(carro){
        return await database.query(`INSERT INTO carro (placa, ano, modelo, fabricante, renavam, foto) 
        VALUES (
            '${carro.placa}',
            '${carro.ano}',
            '${carro.modelo}',
            '${carro.fabricante}',
            '${carro.renavam}',
            '${carro.foto}'
        );`)
    }

    static async deleteCarro(id){
        return await database.query(`DELETE FROM carro WHERE idCarro = ${id};`);
    }

    static async update(carro,id){
        return await database.query(`UPDATE carro SET placa = '${carro.placa}', ano = '${carro.ano}', modelo = '${carro.modelo}', fabricante = '${carro.fabricante}', renavam = '${carro.renavam}', foto = '${carro.foto}' WHERE idCarro = ${id};`);
    }
}

module.exports= Carro;