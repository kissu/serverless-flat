[Basic url](http://ws.seloger.com/search.xml?idtt=1&ci=330281,330063&idtypebien=1&nb_pieces=2&nb_chambres=1&pxmin=400&pxmax=550&surfacemin=45) for an XML output of some filtered flats on [seloger.com](https://www.seloger.com/)

Example, take [this url](http://ws.seloger.com/search.xml?idtt=1&ci=330281,330063&idtypebien=1&nb_pieces=2&nb_chambres=1&pxmin=400&pxmax=550&surfacemin=45)
To get the squared surface in meters: `x[1].children.filter(x => x.name == 'surface')[0].children[0].data`

Un T2 dans une résidence, comprenant une entrée, un séjour avec cuisine, une chambre avec placard, une salle de bains, WC séparés, un dégagement, un parking en sous-sol SANS FRAIS D'AGENCE RÉSERVE AUX SALARIES DU PRIVE 1% LOGEMENT.

```
{
    "channel": "#firebase_flats",
	  "username": "Immo de France",
    "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
    "attachments": [
        {
            "fallback": "New flat submission !",
            "color": "#19eaee",
            "title": "\n\n> https://v.seloger.com/s/width/400/visuels/0/9/k/w/09kweeu97r5sx2jvnn45ck2n8x4zz2e0fswvwcoio.jpg\n> https://v.seloger.com/s/width/400/visuels/1/x/y/m/1xymp64qx0hobbuzf004w8ktohsv6v29van4i1o9s.jpg",
            "title_link": "https://www.seloger.com/annonces/locations/appartement/bordeaux-33/la-bastide/146438207.htm",
            "text": "https://cdn.vox-cdn.com/thumbor/im3DV37lGwiMGiX_FoTVhh92MTM=/0x0:1920x945/1200x480/filters:focal(807x320:1113x626)/cdn.vox-cdn.com/uploads/chorus_image/image/60757935/ply_best_manga_2018.1533678249.jpg",
            "fields": [
				{
                    "title": "Prix",
                    "value": "542 €",
                    "short": true
                },
                {
                    "title": "Superficie",
                    "value": "48.5 m²",
                    "short": true
                },
				{
                    "title": "Ville",
                    "value": "Bordeaux",
                    "short": true
                },
				{
                    "title": "Année de construction",
                    "value": "2008",
                    "short": true
                },
				{
                    "title": "Détails",
                    "value": "Un total de 48.5 m² pour 542 € sur Bordeaux.\nAppart au 1er étage et avec 2 pièces.\nConstruit en 2008.",
                    "short": false
                }

            ],
            "thumb_url": "https://v.seloger.com/s/width/800/visuels/1/x/y/m/1xymp64qx0hobbuzf004w8ktohsv6v29van4i1o9s.jpg",
            "footer": "https://www.immodefrance.com ~ 05 56 79 38 38",
            "footer_icon": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
            "ts": 1556409110
        }
    ]
}
```
