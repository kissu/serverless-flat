const functions = require('firebase-functions')
const rp = require('request-promise')
// const fetch = require('unfetch')
// const fetch = require('whatwg-fetch')
const admin = require('firebase-admin')
admin.initializeApp()

exports.postToSlack = functions.https.onRequest((request, response) => {
  rp({
    method: 'POST',
    uri: 'https://hooks.slack.com/services/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',
    body: {
      "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
      "text": "Un T2 dans une résidence, comprenant une entrée, un séjour avec cuisine, une chambre avec placard, une salle de bains, WC séparés, un dégagement, un parking en sous-sol SANS FRAIS D'AGENCE RÉSERVE AUX SALARIES DU PRIVE 1% LOGEMENT\r\n",
      "attachments": [
        {
          "fallback": "New flat submission !",
          "color": "#19eaee",
          "author_name": "Immo de France",
          "author_link": "https://www.immodefrance.com/",
          "author_icon": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
          "title": "Un total de 48.5 m² pour 542 € sur Bordeaux\nAppart au 1er étage et avec 2 pièces\nConstruit en 2008",
          "title_link": "https://www.seloger.com/annonces/locations/appartement/bordeaux-33/la-bastide/146438207.htm",
          "footer": "https://www.immodefrance.com ~ 05 56 79 38 38",
          "footer_icon": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
          "ts": 1556409110
        }
      ]
    },
    json: true
  })
    .then(res => {
      console.log(res)
      return response.end(res)
    })
    .catch(error => {
      console.log(error)
      response.status(500).send(error)
    })

})
