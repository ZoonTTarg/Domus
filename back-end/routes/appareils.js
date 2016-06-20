var express = require('express');
var router = express.Router();

/* Liste des pièces  */
router.get('/', function(req, res, next) {
	var pool = req.pool;
	 pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        
        connection.query("select * from appareil",function(err,rows){
            connection.release();
            if(!err) {
            	res.setHeader('Content-Type', 'application/json');
            	res.setHeader('Access-Control-Allow-Origin', '*');
                res.json(rows);
            }
            else
            {
				console.log('Erreur lors de la récupération des pièces' + err);
            }
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

//Initialisation de la base, table appareils
router.get('/init', function(req, res, next) {
	 var pool = req.pool;
	 pool.getConnection(function(err,connection){
		    if (err) {
		      connection.release();
		      res.json({"code" : 100, "status" : "Error in connection database"+err});
		      return;
		    }   

		    //Vidage de la table
		    connection.query("delete from appareil");
        connection.query("delete from appareil_type where code_type_appareil='V'");
        //Initialisation des types d'appareils
        connection.query("insert into appareil_type(code_type_appareil, libelle) values ('V', 'Volet')");
		    //Insertion des pièces
		    connection.query("insert into appareil(code_appareil, code_type_appareil, libelle, pourcentage_etat, icone, code_piece) values "+
		    	"('VB', 'V', 'Fenêtre', '0', 'fenetre.png','B'),"+ //Fenêtre bureau
		    	"('VC', 'V', 'Fenêtre', '0', 'fenetre.png','C'),"+ //Fenêtre cuisine
          "('VA', 'V', 'Baie', '0', 'baie.png','A'),"+ //Baie chambre d'amis
          "('VS', 'V', 'Baie', '0', 'baie.png','S'),"+ //Baie salon
		    	"('VT', 'V', 'Fenetre', '0', 'fenetre.png','T'),"+ //Fenetre salle de sport
          "('PT', 'V', 'Porte', '0', 'porte.png','T'),"+ //Porte salle de sport
		    	"('VG', 'V', 'Fenêtre', '0', 'fenetre.png','G'), "+ //Fenetre garage
          "('PG', 'V', 'Porte', '0', 'porte.png','G'), "+ //Porte garage
		    	"('VP', 'V', 'Fenêtre', '0', 'fenetre.png','P'), "+ //Fenetre suite parentale
		    	"('PM', 'V', 'Fenetre', '0', 'fenetre.png','M')", //Fenetre salle a manger
		    	function(err,rows){
		    connection.release();
		    if(!err) {
            res.setHeader('Content-Type', 'application/json');
		        res.json({"code" : 200, "status" : "Base initialisée."});
            return;
		    }
		    else
		    {
		    	console.log('Erreur lors de l\'initialisation des pièces' + err);
          res.setHeader('Content-Type', 'application/json');
		    	res.json({"code" : 100, "status" : "Erreur lors de l\'initialisation des pièces"+err});
		    }        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"+err});
              return;
        });
  });
});

//Ajout d'une pièce
router.put('/appareil', function(req, res, next) {
		 var pool = req.pool;
	 pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        var put = {
        code_appareil: req.body.code_appareil,
        code_type_appareil: req.body.code_type,
        libelle: req.body.libelle,
        pourcentage_etat: req.body.pourcentage_etat,
        icone: req.body.icone
   		};
        
        connection.query('INSERT INTO appareil VALUES ?', put,function(err,rows){
            connection.release();
            if (error) {
            	console.log(error.message);
	        } else {
	            console.log('success');    
	        }         
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

router.get('/:code_appareil', function(req, res, next) {
	 var pool = req.pool;
	 pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from appareil where code_appareil='"+req.params.code_appareil+"'",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
            else
            {
            	 res.json({"code" : 100, "status" : "Erreur lors de la récupération de la pièce code_appareil="+req.params.code_appareil+", erreur: "+err});
            }       
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

module.exports = router;
