const sqlit3 = require('sqlite3').verbose()

const db = new sqlit3.Database('./casacreativa.db')

db.serialize(function() {

    /* Criar a tabela rodar no terminal => node db.js*/
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    /* Instalar a tabela */
    /*const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`
    
    const values = [
        "https://www.flaticon.com/premium-icon/icons/svg/2887/2887749.svg",
        "Videos de Youtube",
        "Entretenimento",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        "http://rocketseat.com.br"
    ]

   db.run(query, values, function(err) {

        if (err) return console.log(err)

        console.log(this)
    })
    

    /* Deletar um dado da tabela */
    /*  db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
        if (err) return console.log(err)

        console.log("DELETEI", this)
    })

    
    /* Consultar dados na tabela */
    /*  db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log (err)

        console.log(rows)
    })  */
    
    
    

})

module.exports = db