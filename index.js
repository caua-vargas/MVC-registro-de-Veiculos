require("dotenv").config();

const path = require("path");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const multer = require('multer');

const PORT = 3000;
const app = express();

const usuarioController = require("./controllers/usuarioController");
const carrosController = require("./controllers/carroController");

app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
    })
);
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) =>{
    if (req.originalUrl === "/login" || req.originalUrl === "/cadastro") {
        app.set("layout", "./layouts/login");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Login",
        };

        next();
    } else if (req?.session?.user) {
        app.set("layout", "./layouts/index");

        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Cadastro de Veículos",
            user: req.session.user,
        };
        next();
    } else res.redirect("/login");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage });

//ROTAS
app.get('/login', (_req,res) => res.render("loginView"));
app.post('/login', usuarioController.auth);

app.get('/cadastro',(_req,res) => res.render("cadastroView"));
app.post('/cadastro', usuarioController.cadastrar);

app.get('/carros', carrosController.verCarros);
app.post('/carro', upload.single('filetoupload'), carrosController.adicionarCarro);

app.post('/carro/deletar', carrosController.deletarCarro);
app.get('/carro/editar/:id(\\d+)', carrosController.editarCarro);
app.post('/carro/update', upload.single('filetoupload'), carrosController.updateCarro);

app.listen(PORT, () => console.log("Rodando na porta: " + PORT));