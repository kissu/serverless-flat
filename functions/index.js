// https://us-central1-tastyflats.cloudfunctions.net/postToSlack

// const payload = {
//   data: {
//     text: 'yolo',
//     price: 12
//   }
// }

// const rp = require('request-promise')
// const fetch = require('whatwg-fetch')
// const fetch = require('isomorphic-unfetch') // not used because we're using a stream with //ws ??
const functions = require('firebase-functions')
const cheerio = require('cheerio')
const axios = require('axios')
const admin = require('firebase-admin')
admin.initializeApp()

const flatsUrl = 'http://ws.seloger.com/search.xml?idtt=1&ci=330281,330063&idtypebien=1&nb_pieces=2&nb_chambres=1&pxmin=400&pxmax=550&surfacemin=45'
const slackWebhook = 'https://hooks.slack.com/services/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'
let finalOnes = {}
associative_array_agencies = { //extract that one to Firestore one day
  "Foncia Bordeaux": {
    "url": "https://fr.foncia.com/location/merignac-33700",
    "phone": "05 56 12 42 20"
  }
}

function parseImageArrays(images, ...expressions) {
  const finalSentence = []
  for (const image of images) {
    finalSentence.push(image)
  }
  console.log(finalSentence)
  return finalSentence.join('\r\n ')
}

async function crawl(response) {
  const interesting_ones = ['aneecontruct', 'cp', 'descriptif', 'idannonce', 'logobigurl', 'nbpiece', 'permalien', 'prix', 'surface', 'titre', 'ville']

  try {
    let seLoger = await axios.get(flatsUrl)
    const $ = cheerio.load(seLoger.data, { xmlMode: false, decodeEntities: true, normalizeWhitespace: true })
    const document = $('annonce') //! todo 2) make it awailable for all the 'annonces'
    let usefulOnes = document[0].children.filter(element => element.type !== 'text')
    let coreOnes = usefulOnes.filter(element => interesting_ones.includes(element.name))

    coreOnes.forEach((el, index) => {
      let fieldName = Object.values(el)[1]
      finalOnes[fieldName] = el.children[0].data
      finalOnes['nom'] = usefulOnes
        .filter(el => el.name === 'contact')[0].children
        .filter(el2 => el2.name === 'nom')[0].children[0].data

      let flatPhotos = usefulOnes
        .filter(el => el.name === 'photos')[0].children
        .filter(element => element.type !== 'text')
      if (flatPhotos.length > 0) { //bug? check what happens if there is not photos field or something alike
        finalOnes['bigurl'] = []
        flatPhotos.forEach(photo => {
          finalOnes.bigurl.push(photo.children.filter(el => el.name === 'stdurl')[0].children[0].data)
        })
      }

    });
    return finalOnes

  } catch (error) {
    console.log('error...', error)
    return response.status(500).send(error)
  }
}

async function sendToSlack(crawledObject, response) {
  ({
    aneecontruct: constructionYear,
    bigurl: flatImages,
    cp: postalCode,
    descriptif: description,
    idannonce: flatId,
    logobigurl: agencyLogo,
    nbpiece: roomsAmount,
    permalien: permalink,
    nom: agencyName,
    prix: price,
    surface,
    titre: title,
    ville: city,
  } = finalOnes)

  try {
    const currentAgency = associative_array_agencies[agencyName]

    const post = await axios.post(slackWebhook, {
      "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
      "text": parseImageArrays`${flatImages}`,
      "attachments": [
        {
          "fallback": "New flat submission !",
          "color": "#237aee",
          "author_name": agencyName,
          "author_link": currentAgency.url,
          "author_icon": agencyLogo,
          "title": "Un total de 48.5 m² pour 542 € sur Bordeaux\r\nAppart au 1er étage et avec 2 pièces\r\nConstruit en 2008",
          "title_link": "https://www.seloger.com/annonces/locations/appartement/bordeaux-33/la-bastide/146438207.htm",
          "footer": `${currentAgency.url} ~${currentAgency.phone} `,
          "footer_icon": agencyLogo,
          "ts": 1556409110,
        }
      ]
    })

    console.log(post.config.data)
    response.send('ok')
  } catch (error) {
    console.log(error)
    response.status(500).send(error)
  }
}

exports.postToSlack = functions.https.onRequest(async (request, response) => {
  const objec = await crawl(response)
  sendToSlack(objec, response)
})
