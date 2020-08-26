
/* usei express para criar e configurar meu servidor */
const express = require("express")
const server = express()

const db = require("./db")

// const ideas =[ /* array (vetores) cria coleções */

//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2887/2887749.svg",
//         title:"Videos de Youtube",
//         category:"Entretenimento",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     },

//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2887/2887789.svg",
//         title:"Receitas Diversas",
//         category:"Culinaria",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     },

//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2887/2887812.svg",
//         title:"Dicas de Exercícios",
//         category:"Esporte",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     },

//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2887/2887747.svg",
//         title:"Dicas de Jogos",
//         category:"Game",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     },
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2729/2729038.svg",
//         title:"Pintura",
//         category:"Criatividade",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     },
//     {
//         img:"https://www.flaticon.com/premium-icon/icons/svg/2729/2729048.svg",
//         title:"Recortes",
//         category:"Criatividade",
//         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         url:"http://rocketseat.com.br", 
//     }
// ]

/* configurar arquivos estáticos (css, script, imagens) */
server.use(express.static("public"))

/*habilitar uso do req.body */
server.use(express.urlencoded({ extended:true }))

/* configuração do nunjucks */
const nunjucks = require ("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, /* boolean */

    /* desabilitar o Cache para quando atualizar qualquer 
    novidade, funcionar sem reiniciar o terminal
    desabilitar quando tudo estiver pronto */
})

/* criei uma rota /
e capturo o pedido do cliente para responder */
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err){
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }   

        const reversedIdeas = [...rows].reverse()
 
        let lastIdeas = []
        for (let idea of reversedIdeas){
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }     
        
        return res.render("index.html", { ideas: lastIdeas })
    }) 

   
})

server.get("/ideas", function (req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err){
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }   

        const reversedIdeas = [...rows].reverse()
        return res.render("ideas.html", { ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    /* Inserir dado na tabela */
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
`
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

   db.run(query, values, function(err) {

        if (err){
            console.log(err)
            return res.send ("Erro no banco de dados!")
        }   

        return res.redirect("/ideas")
    })


})

/* liguei meu servidor na porta 3000 */
server.listen(3000)



