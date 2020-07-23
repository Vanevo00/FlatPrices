const axios = require('axios')
const config = require('config')

const feedBezrealitkyScraperData = async () => {
  try {
    console.log('feeding Bezrealitky scraper data...')
    const feedData = [
      // {
      //   name: 'Praha',
      //   locationInput: 'Praha, Hlavní město Praha, Česko',
      //   boundary: [[[{"lat":50.031871,"lng":15.6249984},{"lat":50.0316743,"lng":15.6289141},{"lat":50.0301816,"lng":15.6299177},{"lat":50.0300032,"lng":15.628183},{"lat":50.0239412,"lng":15.6398878},{"lat":50.016209,"lng":15.6734044},{"lat":50.0141246,"lng":15.6698916},{"lat":50.0108628,"lng":15.6707549},{"lat":50.0100744,"lng":15.6687976},{"lat":50.0093911,"lng":15.6778982},{"lat":50.0110255,"lng":15.6815255},{"lat":50.0091378,"lng":15.6778476},{"lat":50.0069561,"lng":15.6783925},{"lat":50.0070961,"lng":15.6851859},{"lat":50.0051601,"lng":15.684359},{"lat":50.0022322,"lng":15.6874897},{"lat":50.0048775,"lng":15.6930832},{"lat":50.0047114,"lng":15.6961722},{"lat":50.0060793,"lng":15.6961897},{"lat":50.0062234,"lng":15.7054682},{"lat":50.0097022,"lng":15.7053415},{"lat":50.0107487,"lng":15.7092822},{"lat":50.0114002,"lng":15.7053634},{"lat":50.0146046,"lng":15.704372},{"lat":50.0185099,"lng":15.7056304},{"lat":50.0189168,"lng":15.7091441},{"lat":50.0135979,"lng":15.7129666},{"lat":50.0134498,"lng":15.7185146},{"lat":50.007464,"lng":15.7260288},{"lat":50.0105732,"lng":15.7307831},{"lat":50.0146839,"lng":15.7302986},{"lat":50.0148168,"lng":15.73199},{"lat":50.013235,"lng":15.7322035},{"lat":50.0136244,"lng":15.7355132},{"lat":50.0163985,"lng":15.7418463},{"lat":50.0156842,"lng":15.7470198},{"lat":50.0141875,"lng":15.7455901},{"lat":50.0140216,"lng":15.7480029},{"lat":50.0176656,"lng":15.7492972},{"lat":50.0198805,"lng":15.7529983},{"lat":50.015656,"lng":15.7621909},{"lat":50.0163406,"lng":15.7560722},{"lat":50.0134638,"lng":15.7547332},{"lat":50.0095881,"lng":15.7580339},{"lat":50.009754,"lng":15.7630582},{"lat":50.0082927,"lng":15.7619879},{"lat":50.003977,"lng":15.7647779},{"lat":50.0039071,"lng":15.7628525},{"lat":49.9958851,"lng":15.7612384},{"lat":49.9968234,"lng":15.7702428},{"lat":49.9955687,"lng":15.7699484},{"lat":49.9959934,"lng":15.7723402},{"lat":49.9937999,"lng":15.7731366},{"lat":49.9940838,"lng":15.7771826},{"lat":49.9963675,"lng":15.7764891},{"lat":49.9967169,"lng":15.7775651},{"lat":49.9957446,"lng":15.7893727},{"lat":49.9978451,"lng":15.7881497},{"lat":50.0031768,"lng":15.7891721},{"lat":50.0022552,"lng":15.7936684},{"lat":50.0046981,"lng":15.7903149},{"lat":50.0060398,"lng":15.7907673},{"lat":50.0051813,"lng":15.7965313},{"lat":50.0026498,"lng":15.7940654},{"lat":50.0021562,"lng":15.7952846},{"lat":50.0038069,"lng":15.7969999},{"lat":50.0039541,"lng":15.8016457},{"lat":49.9989223,"lng":15.8060794},{"lat":50.0008411,"lng":15.8174192},{"lat":49.9994305,"lng":15.8286288},{"lat":50.0010118,"lng":15.8294359},{"lat":49.9988123,"lng":15.8340767},{"lat":49.9981784,"lng":15.8424876},{"lat":50.0008377,"lng":15.8475693},{"lat":49.9958814,"lng":15.8494978},{"lat":49.9953394,"lng":15.8540592},{"lat":49.9933197,"lng":15.8523553},{"lat":49.9924553,"lng":15.8566053},{"lat":49.9933062,"lng":15.8580739},{"lat":49.9958186,"lng":15.8567631},{"lat":49.9975689,"lng":15.8594343},{"lat":49.9985579,"lng":15.8641886},{"lat":49.9972871,"lng":15.8692759},{"lat":49.995479,"lng":15.8675815},{"lat":49.9951021,"lng":15.8685548},{"lat":50.008442,"lng":15.8831713},{"lat":50.0089818,"lng":15.8902336},{"lat":50.0098141,"lng":15.8892579},{"lat":50.0115574,"lng":15.8905887},{"lat":50.0105686,"lng":15.8890696},{"lat":50.0134879,"lng":15.8913546},{"lat":50.0171161,"lng":15.8917673},{"lat":50.0200463,"lng":15.8811591},{"lat":50.0237302,"lng":15.8812259},{"lat":50.0240365,"lng":15.8757993},{"lat":50.0224606,"lng":15.8739238},{"lat":50.020093,"lng":15.8748308},{"lat":50.01799,"lng":15.8733796},{"lat":50.0186944,"lng":15.8695327},{"lat":50.0160415,"lng":15.8654821},{"lat":50.0169711,"lng":15.8639268},{"lat":50.0163585,"lng":15.8630345},{"lat":50.0142071,"lng":15.8651137},{"lat":50.0129425,"lng":15.8595476},{"lat":50.0169062,"lng":15.8590612},{"lat":50.0223209,"lng":15.8426605},{"lat":50.0267566,"lng":15.8476404},{"lat":50.0374801,"lng":15.8491246},{"lat":50.0398982,"lng":15.8408732},{"lat":50.044103,"lng":15.8419713},{"lat":50.0506308,"lng":15.8404596},{"lat":50.051422,"lng":15.8352698},{"lat":50.0541514,"lng":15.8347303},{"lat":50.0570096,"lng":15.8314635},{"lat":50.0601611,"lng":15.8311699},{"lat":50.0575245,"lng":15.8125341},{"lat":50.0554146,"lng":15.8095432},{"lat":50.0561707,"lng":15.795574},{"lat":50.0595521,"lng":15.7932145},{"lat":50.0601838,"lng":15.7893564},{"lat":50.0598199,"lng":15.7872061},{"lat":50.0565198,"lng":15.7857805},{"lat":50.0581502,"lng":15.7809889},{"lat":50.0563767,"lng":15.7758411},{"lat":50.0575437,"lng":15.7761817},{"lat":50.0586709,"lng":15.7739431},{"lat":50.0626905,"lng":15.7756345},{"lat":50.0626024,"lng":15.763628},{"lat":50.0721783,"lng":15.7594326},{"lat":50.0737504,"lng":15.7591709},{"lat":50.073893,"lng":15.7613814},{"lat":50.0755687,"lng":15.7558791},{"lat":50.0730296,"lng":15.7544691},{"lat":50.0696212,"lng":15.7467355},{"lat":50.0726008,"lng":15.7354674},{"lat":50.0696912,"lng":15.7255338},{"lat":50.0723694,"lng":15.7240607},{"lat":50.0739044,"lng":15.7185026},{"lat":50.0774041,"lng":15.7172186},{"lat":50.0763795,"lng":15.7099783},{"lat":50.0731778,"lng":15.7080536},{"lat":50.0684964,"lng":15.7083513},{"lat":50.0678271,"lng":15.7097817},{"lat":50.0656046,"lng":15.7082329},{"lat":50.0610018,"lng":15.7125889},{"lat":50.0600015,"lng":15.7178796},{"lat":50.0595992,"lng":15.7164291},{"lat":50.0569428,"lng":15.7177085},{"lat":50.0545917,"lng":15.7152074},{"lat":50.0527683,"lng":15.7161483},{"lat":50.0521638,"lng":15.714279},{"lat":50.0480008,"lng":15.7202202},{"lat":50.0459869,"lng":15.7189265},{"lat":50.046911,"lng":15.7138352},{"lat":50.0443822,"lng":15.7113989},{"lat":50.0415306,"lng":15.7140595},{"lat":50.0426496,"lng":15.7197222},{"lat":50.0415045,"lng":15.7205905},{"lat":50.0386919,"lng":15.7189073},{"lat":50.0400999,"lng":15.716562},{"lat":50.038347,"lng":15.7167876},{"lat":50.0379327,"lng":15.7150228},{"lat":50.0332446,"lng":15.7184882},{"lat":50.0310367,"lng":15.7179779},{"lat":50.0311718,"lng":15.7117485},{"lat":50.0345473,"lng":15.7124419},{"lat":50.035233,"lng":15.7082956},{"lat":50.0298553,"lng":15.7067591},{"lat":50.0288833,"lng":15.7020274},{"lat":50.0300821,"lng":15.7024653},{"lat":50.0314863,"lng":15.6957026},{"lat":50.0340802,"lng":15.6918211},{"lat":50.0363855,"lng":15.6927699},{"lat":50.0370753,"lng":15.6949616},{"lat":50.0383271,"lng":15.6904323},{"lat":50.041755,"lng":15.6908841},{"lat":50.0423876,"lng":15.686313},{"lat":50.0400106,"lng":15.682827},{"lat":50.0410093,"lng":15.681624},{"lat":50.0432569,"lng":15.6832177},{"lat":50.0435374,"lng":15.6780786},{"lat":50.0466722,"lng":15.6766513},{"lat":50.0474996,"lng":15.6740242},{"lat":50.0437218,"lng":15.6687811},{"lat":50.0461426,"lng":15.6628264},{"lat":50.0460136,"lng":15.6577748},{"lat":50.0448851,"lng":15.6559122},{"lat":50.0422025,"lng":15.6554931},{"lat":50.0408663,"lng":15.6525114},{"lat":50.0422852,"lng":15.6460058},{"lat":50.0397717,"lng":15.6427297},{"lat":50.0420195,"lng":15.6335093},{"lat":50.0373219,"lng":15.6360899},{"lat":50.0333943,"lng":15.6346649},{"lat":50.0340515,"lng":15.6281773},{"lat":50.031871,"lng":15.6249984}],[{"lat":50.0476174,"lng":15.8133625},{"lat":50.0507206,"lng":15.8243879},{"lat":50.0465024,"lng":15.8278685},{"lat":50.0447981,"lng":15.8264717},{"lat":50.0422365,"lng":15.8328187},{"lat":50.0391378,"lng":15.8355472},{"lat":50.0373192,"lng":15.831812},{"lat":50.0354231,"lng":15.8340164},{"lat":50.0317629,"lng":15.8279942},{"lat":50.0338851,"lng":15.8233998},{"lat":50.0476174,"lng":15.8133625}]]]
      // },
      {
        name: 'Kolín',
        locationInput: 'Kolín, Středočeský kraj, Česko',
        boundary: [[[{"lat":49.9987742,"lng":15.1458142},{"lat":49.998437,"lng":15.1488128},{"lat":49.9945533,"lng":15.1493413},{"lat":49.9949149,"lng":15.1538613},{"lat":49.9923945,"lng":15.1542575},{"lat":49.9930392,"lng":15.1612294},{"lat":49.9949271,"lng":15.1694789},{"lat":49.997785,"lng":15.1701187},{"lat":49.9982311,"lng":15.16886},{"lat":50.0045034,"lng":15.1739423},{"lat":50.0052206,"lng":15.1726413},{"lat":50.0082763,"lng":15.1773845},{"lat":50.0067096,"lng":15.178671},{"lat":50.0066145,"lng":15.1848238},{"lat":50.0081092,"lng":15.1896281},{"lat":50.0067122,"lng":15.1885235},{"lat":50.0046302,"lng":15.1925974},{"lat":50.0079888,"lng":15.1960169},{"lat":50.0051176,"lng":15.20306},{"lat":50.0067364,"lng":15.2032503},{"lat":50.0089506,"lng":15.1985263},{"lat":50.0104677,"lng":15.2002353},{"lat":50.0078799,"lng":15.2048664},{"lat":50.010611,"lng":15.2077973},{"lat":50.0111879,"lng":15.2110204},{"lat":50.0092082,"lng":15.2159323},{"lat":50.012945,"lng":15.2203492},{"lat":50.0118435,"lng":15.2229313},{"lat":50.0058658,"lng":15.2181126},{"lat":50.007591,"lng":15.2227135},{"lat":50.005025,"lng":15.2261805},{"lat":50.0077054,"lng":15.2315159},{"lat":50.0063974,"lng":15.231213},{"lat":50.0046056,"lng":15.2344072},{"lat":50.0079241,"lng":15.2380576},{"lat":50.0040336,"lng":15.2466755},{"lat":50.0070344,"lng":15.2484339},{"lat":50.0076907,"lng":15.2518871},{"lat":50.0087926,"lng":15.2504944},{"lat":50.0083437,"lng":15.2525101},{"lat":50.0149579,"lng":15.2576813},{"lat":50.0112956,"lng":15.2582849},{"lat":50.0102294,"lng":15.2604043},{"lat":50.0115573,"lng":15.2626269},{"lat":50.014064,"lng":15.2609734},{"lat":50.0136632,"lng":15.2654481},{"lat":50.0161213,"lng":15.2678436},{"lat":50.017554,"lng":15.2660522},{"lat":50.0190749,"lng":15.2506549},{"lat":50.0201176,"lng":15.2533975},{"lat":50.0240812,"lng":15.2527138},{"lat":50.027396,"lng":15.2454391},{"lat":50.0274264,"lng":15.2417773},{"lat":50.0333475,"lng":15.2403022},{"lat":50.0364551,"lng":15.2365231},{"lat":50.0366909,"lng":15.2378228},{"lat":50.0455653,"lng":15.2327893},{"lat":50.0474546,"lng":15.2341032},{"lat":50.0469404,"lng":15.2406437},{"lat":50.0498554,"lng":15.2495834},{"lat":50.0488494,"lng":15.2516628},{"lat":50.0504942,"lng":15.2537156},{"lat":50.0512451,"lng":15.2513114},{"lat":50.053723,"lng":15.2511079},{"lat":50.0524654,"lng":15.2397442},{"lat":50.0554729,"lng":15.2394595},{"lat":50.0581307,"lng":15.2294753},{"lat":50.0598485,"lng":15.2311142},{"lat":50.0605607,"lng":15.2253491},{"lat":50.0652073,"lng":15.2260593},{"lat":50.0667518,"lng":15.2180357},{"lat":50.0698531,"lng":15.2161113},{"lat":50.0708469,"lng":15.2123966},{"lat":50.066784,"lng":15.2119232},{"lat":50.0635335,"lng":15.209335},{"lat":50.0609619,"lng":15.2034859},{"lat":50.0542863,"lng":15.205783},{"lat":50.0520322,"lng":15.2032045},{"lat":50.0511379,"lng":15.1983237},{"lat":50.0496388,"lng":15.1975284},{"lat":50.0535944,"lng":15.1870952},{"lat":50.050964,"lng":15.1840723},{"lat":50.0490665,"lng":15.1849518},{"lat":50.0454562,"lng":15.1795097},{"lat":50.0387607,"lng":15.1744081},{"lat":50.0372213,"lng":15.1656532},{"lat":50.0383736,"lng":15.164022},{"lat":50.0393089,"lng":15.166577},{"lat":50.0412969,"lng":15.1645234},{"lat":50.0362397,"lng":15.1550633},{"lat":50.0347771,"lng":15.1539057},{"lat":50.0337062,"lng":15.158331},{"lat":50.0317771,"lng":15.1556285},{"lat":50.0286154,"lng":15.1581045},{"lat":50.026191,"lng":15.1550779},{"lat":50.0254361,"lng":15.156939},{"lat":50.0235575,"lng":15.1547515},{"lat":50.0178382,"lng":15.153189},{"lat":50.0177036,"lng":15.1572489},{"lat":50.0161753,"lng":15.1571017},{"lat":50.0132209,"lng":15.1645008},{"lat":50.013779,"lng":15.1663869},{"lat":50.0089318,"lng":15.1578586},{"lat":50.00799,"lng":15.1529744},{"lat":50.0046226,"lng":15.1524309},{"lat":50.0027979,"lng":15.14646},{"lat":49.9987742,"lng":15.1458142}]]]
      }
    ]

    feedData.map(async (city) => {
      try {
        const {
          data,
          data: {
            _id
          }
        } = await axios.get(`${config.get('dbAddress')}/api/cities/byExactName/${encodeURIComponent(city.name)}`)

        await axios.post(`${config.get('dbAddress')}/api/cities/edit/${_id}`, {
          ...data,
          bezrealitkyScraper: {
            locationInput: city.locationInput,
            boundary: city.boundary
          }
        })
        console.log(`${city.name} successfully fed!`)
      } catch (err) {
        console.log(err)
      }
    })
    console.log("feed complete!")
  } catch(err) {
    console.log(err)
  }

}

feedBezrealitkyScraperData()

