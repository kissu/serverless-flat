const cheerio = require('cheerio')
const axios = require('axios')


// let firstImage, secondImage
// function getWaterPlaceholderImage(params) {
//   axios.get('https://source.unsplash.com/1600x900/?nature,water')
//     .then(function (response) {
//       firstImage = 'https://images.unsplash.com' + response.request.path
//     })
// }
// function getJapanPlaceholderImage(params) {
//   axios.get('https://source.unsplash.com/1600x900/?japan')
//     .then(function (response) {
//       secondImage = 'https://images.unsplash.com' + response.request.path
//     })
// }

// axios.all([getWaterPlaceholderImage(), getJapanPlaceholderImage()])
//   .then(axios.spread(function (acct, perms) {
//     sendToSlack()
//   }))

// async function go() {
//   const [users, products] = await Promise.all(a, b)
// }

// function sendToSlack() {
//   axios({
//     method: 'post',
//     url: 'https://hooks.slack.com/services/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',
//     data: {
//       "channel": "#firebase_flats",
//       "username": "Immo de France",
//       "icon_url": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
//       "text": "Un T2 dans une résidence, comprenant une entrée, un séjour avec cuisine, une chambre avec placard, une salle de bains, WC séparés, un dégagement, un parking en sous-sol SANS FRAIS D'AGENCE RÉSERVE AUX SALARIES DU PRIVE 1% LOGEMENT\r\n" + firstImage + "\r\n" + secondImage,
//       "attachments": [
//         {
//           "fallback": "New flat submission !",
//           "color": "#19eaee",
//           "author_name": "Immo de France",
//           "author_link": "https://www.immodefrance.com/",
//           "author_icon": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
//           "title": "Un total de 48.5 m² pour 542 € sur Bordeaux\nAppart au 1er étage et avec 2 pièces\nConstruit en 2008",
//           "title_link": "https://www.seloger.com/annonces/locations/appartement/bordeaux-33/la-bastide/146438207.htm",
//           "footer": "https://www.immodefrance.com ~ 05 56 79 38 38",
//           "footer_icon": "https://v.seloger.com/s/width/75/logos/0/o/n/r/0onrd7bohk9jmfe6mghgl90kd9ouvcmon37z6ori3.jpg",
//           "ts": 1556409110
//         }
//       ]
//     }
//   })
// }

const flatsUrl = 'http://ws.seloger.com/search.xml?idtt=1&ci=330281,330063&idtypebien=1&nb_pieces=2&nb_chambres=1&pxmin=400&pxmax=550&surfacemin=45'

const payload = {
  data: {
    text: 'yolo',
    price: 12
  }
}

let
  aneecontruct, //bug? may be void
  bigurl,
  cp, // postal code
  descriptif,
  idannonce, // for the RealTime database
  logobigurl, // agence logo
  nbpiece,
  permalien, // to quickly access the offer
  nom,
  prix,
  surface,
  titre,
  ville,

  interesting_ones = ['aneecontruct', 'cp', 'descriptif', 'idannonce', 'logobigurl', 'nbpiece', 'permalien', 'prix', 'surface', 'titre', 'ville']

  ; (async () => {
    try {
      let seLoger = await axios.get(flatsUrl)
      const $ = cheerio.load(seLoger.data, { xmlMode: false, decodeEntities: true, normalizeWhitespace: true })
      const document = $('annonce') //! todo 2) make it awailable for all the 'annonces'
      let usefulOnes = document[0].children.filter(element => element.type !== 'text')
      let coreOnes = usefulOnes.filter(element => interesting_ones.includes(element.name))

      let finalOnes = {}
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
            finalOnes.bigurl.push(photo.children.filter(el => el.name === 'bigurl')[0].children[0].data)
          })
        }

      });

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

      console.log(constructionYear, flatImages, postalCode, description, flatId, agencyLogo, roomsAmount, permalink, agencyName, price, surface, title, city)
      //! todo 1) send a slack test notification

    } catch (error) {
      console.log(error)
    }
  })()

// how to properly destructure a nested object
// x = {
//   a: {
//     aa: 'aaaa'
//   }
// }

// var { a: { aa: ok } } = x // x >> aaaa
// https://www.sitepoint.com/es6-enhanced-object-literals/
