const express=require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const clientElastic = new elastic.Client(
    {host:'localhost:9200'}
)

router.get('/',async (req,res)=>{
    try{

        let retorno = await clientElastic.search({
            index:'indexcliente',
            type:'cliente'
        });

        res.status(200).json(retorno.hits.hits);
    }
    catch(err){
        res.status(400).json({erro:err});
    }
});

router.get('/:id',async (req,res)=>{
    try{
        let retorno = await clientElastic.get({
            index:'indexcliente',
            type:'cliente',
            id: req.params.id
        });

        res.status(200).json(retorno);
    }
    catch(err){
        res.status(400).json({erro:err});
    }
});

router.post('/', async (req,res)=>{
    try{
        await clientElastic.index({
            index:'indexcliente',
            type:'cliente',
            body: req.body
        });
        res.status(201).send();
    }
    catch(err){
        res.status(400).json({erro:err});
    }    
});

router.patch('/:id', async (req,res)=>{
    try{
        await clientElastic.update({
            index:'indexcliente',
            id: req.params.id, 
            body: {doc: req.body}
        });
        res.status(202).send();
    }
    catch(err){
        res.status(400).json({erro:err});
    }      
});

router.delete('/:id',async (req,res)=>{
    try{
        await clientElastic.delete({
            index:'indexcliente',
            type:'cliente', 
            id: req.params.id
        });
        res.status(204).send();
    }
    catch(err){
        res.status(400).json({erro:err});
    }
});


module.exports= app => app.use('/cliente',router);
