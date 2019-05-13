const functions = require('firebase-functions')
const rp = require('request-promise')
const admin = require('firebase-admin')
admin.initializeApp()

function postToSlack() {
  return rp({
    method: 'POST',
    uri: functions.config.slack_webhook_url,
    body: {
      "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
      "text": "test from firebase working",
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
}

postToSlack()
