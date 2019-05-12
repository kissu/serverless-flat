const cheerio = require('cheerio')
const axios = require('axios')


let firstImage, secondImage
function getWaterPlaceholderImage(params) {
  axios.get('https://source.unsplash.com/1600x900/?nature,water')
    .then(function (response) {
      firstImage = 'https://images.unsplash.com' + response.request.path
    })
}
function getJapanPlaceholderImage(params) {
  axios.get('https://source.unsplash.com/1600x900/?japan')
    .then(function (response) {
      secondImage = 'https://images.unsplash.com' + response.request.path
    })
}

axios.all([getWaterPlaceholderImage(), getJapanPlaceholderImage()])
  .then(axios.spread(function (acct, perms) {
    sendToSlack()
  }))

async function go() {
  const [users, products] = await Promise.all(a, b)
}

function sendToSlack() {
  axios({
    method: 'post',
    url: 'https://hooks.slack.com/services/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',
    data: {
      "channel": "#firebase_flats",
      "username": "Immo de France",
      "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
      "text": "Un T2 dans une résidence, comprenant une entrée, un séjour avec cuisine, une chambre avec placard, une salle de bains, WC séparés, un dégagement, un parking en sous-sol SANS FRAIS D'AGENCE RÉSERVE AUX SALARIES DU PRIVE 1% LOGEMENT\r\n" + firstImage + "\r\n" + secondImage,
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
    }
  })
}

// const flatsUrl = 'http://ws.seloger.com/search.xml?idtt=1&ci=330281,330063&idtypebien=1&nb_pieces=2&nb_chambres=1&pxmin=400&pxmax=550&surfacemin=45'

// axios.get(flatsUrl)
//   .then(function (response) {
//     console.log('success')
//     const $ = cheerio.load(response.data, { xmlMode: false, decodeEntities: true, normalizeWhitespace: true })
//     const document = $('annonce')
//     console.log(document[1].children.filter(document => document.name == 'surface')[0].children[0].data)
//   })
//   .catch(function (error) {
//     console.log('fail...', error)
//   })
