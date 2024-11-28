var express = require('express');
var router = express.Router();
var os = require('os');
router.get('/', (req, res) => {
    res.json({
        platform: os.platform(),
        hostname: os.hostname(),
        type: os.type()
      }); 
  });
router.get('/cpus', (req, res) => {
    const cpus = os.cpus(); 
    res.json(cpus); 
  });

  router.get('/cpus/:id', (req, res) => {
    const cpus = os.cpus(); 
    const id = parseInt(req.params.id); 
  
    if (isNaN(id) || id < 0 || id >= cpus.length) {
      return res.status(404).json({ error: "Processeur non trouvé" });
    }
  
    res.json(cpus[id]);
  });

module.exports = router;
