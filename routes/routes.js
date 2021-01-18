const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { join } = require('path');
const { title } = require('process');

const albumsFile = fs.readFileSync("./albums.json", "utf8");
let albums = JSON.parse(albumsFile);

//Metodo GET
router.get("/albums", (req, res)=>{
    res.status(200).json(albums);

});

//Metodo POST

router.post("/albums", (req, res)=>{
    const {name, artist, year, genres, tracks, duration, cover} = req.body;

    if(!name || !artist || !year || !genres  || !tracks || !duration|| !cover){
        res.status(401).json({error: "Por favor, diligencie todos los datos"})
    }else{
        const id = albums.length + 1;
    
        let newAlbum = {
            id,
            name,
            artist, 
            year, 
            genres, 
            tracks, 
            duration, 
            cover
            
        }
        
        albums.push(newAlbum);
        const json_albums =  JSON.stringify(albums);
    
        fs.writeFileSync("./albums.json", json_albums, "utf-8");
        res.status(200).json(albums);
    };
});

//Metodo PUT
router.put("/albums/:id", (req, res)=>{
    const {name, artist, year, genres, tracks, duration, cover} = req.body;
    const id = req.params.id;

    if(!name || !artist || !year || !genres || !duration || !tracks || !cover){
        res.status(401).json({error: "Debes completar los datos y especificar id"})
    }else{
        albums.filter((album)=>{
            if(album.id ==id){
                album.name = name;
                album.artist = artist;
                album.year = year;
                album.genres = genres;
                album.duration = duration;
                album.tracks = tracks;
                album.cover = cover;
            }
        });

        const json_albums = JSON.stringify(albums);
        fs.writeFileSync("./albums.json", json_albums, "utf-8")
        res.status(200).json(albums);
    }

});

//Metodo DELETE
router.delete('albums/:id', (req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(401).json({error: "Especifica un id"})
    }else{
        const indexAlbum = albums.findIndex((album)=> album.id === id)
        albums.splice(indexAlbum, 1);

        const json_albums = JSON.stringify(albums)
        fs.writeFileSync("./albums.json", json_albums, "utf-8")

        res.status(200).json(albums)
    }
});

module.exports = router; 