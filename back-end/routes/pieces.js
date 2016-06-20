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

        console.log('Récupération des pièces. Id de connexion:' + connection.threadId);
        
        connection.query("select * from piece",function(err,rows){
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

//Initialisation de la base, table pieces
router.get('/init', function(req, res, next) {
		 var pool = req.pool;
	 pool.getConnection(function(err,connection){
		    if (err) {
		      connection.release();
		      res.json({"code" : 100, "status" : "Error in connection database"});
		      return;
		    }   

		    //Vidage de la table
		    connection.query("delete from piece");
		    //Insertion des pièces
		    connection.query("insert into piece(code_piece,libelle, icone) values "+
		    	"('S', 'Salon', 'salon.png'),"+
		    	"('C', 'Cuisine', 'cuisine.png'),"+
		    	"('B', 'Bureau', 'bureau.png'),"+
		    	"('A', 'Chambre d\'\'amis', 'amis.png'),"+
		    	"('T', 'Salle de sport', 'sport.png'),"+
		    	"('G', 'Garage', 'garage.png'), "+
		    	"('P', 'Suite parentale', 'parentale.png'), "+
		    	"('M', 'Salle à manger', 'sam.png')",
		    	function(err,rows){
		    connection.release();
		    if(!err) {
		        return res.json({"code" : 200, "status" : "Base initialisée."});
		    }
		    else
		    {
		    	console.log('Erreur lors de l\'initialisation des pièces' + err);
		    	res.json({"code" : 100, "status" : "Erreur lors de l\'initialisation des pièces"+err});
		    }        
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
  });
});

//Ajout d'une pièce
router.put('/piece', function(req, res, next) {
		 var pool = req.pool;
	 pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        var put = {
        code_piece: req.body.code_piece,
        libelle: req.body.libelle
   		};
        
        connection.query('INSERT INTO piece VALUES ?', put,function(err,rows){
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

router.get('/:code_piece', function(req, res, next) {
	 var pool = req.pool;
	 pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from piece where code_piece='"+req.params.code_piece+"'",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
            else
            {
            	 res.json({"code" : 100, "status" : "Erreur lors de la récupération de la pièce code_piece="+req.params.code_piece+", erreur: "+err});
            }       
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

module.exports = router;
