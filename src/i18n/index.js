import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      biography: 'Biography',
      exhibitions: 'Exhibitions',
      contact: 'Contact'
    },
    home: {
      title: 'Ilze Erba-Brenholma',
      subtitle: 'Textile Artist'
    },
    biography: {
      title: 'Biography',
      content: 'Ilze Erba-Brenholma is a Latvian textile artist focusing on digital embroidery and textile art. Her work explores feminist themes and gender issues through ready-made techniques and traditional textiles, including digital weaving and batik.'
    },
    portfolio: {
      title: 'Portfolio',
      works: {
        funguy: {
          title: 'Fun-guy',
          description: 'An installation consisting of four light objects. Each object functions both as an independent artwork and a functional light fixture. Each individual object measures 150x30x30cm. The illuminated, brownish translucent part - the "lampshade" is made using cellulose fiber grown by the author using symbiotic bacterial culture.'
        },
        rainbow: {
          title: 'Varavīksnene',
          description: 'Located in the middle of the exhibition, this object made of wool, polyester, and composite materials features a rainbow-colored eye observing the space. It challenges viewers to contemplate how differently each person might perceive the same view.'
        }
      }
    }
  },
  lv: {
    nav: {
      home: 'Sākums',
      portfolio: 'Portfolio',
      biography: 'Biogrāfija',
      exhibitions: 'Izstādes',
      contact: 'Kontakti'
    },
    home: {
      title: 'Ilze Erba-Brenholma',
      subtitle: 'Tekstilmāksliniece'
    },
    biography: {
      title: 'Biogrāfija',
      content: 'Ilze Erba-Brenholma ir latviešu tekstilmāksliniece, kas specializējas digitālajā izšūšanā un tekstilmākslā. Viņas darbi pēta feminisma tēmas un dzimumu jautājumus, izmantojot redīmeida tehniku un tradicionālās tekstiltehnikas, tostarp digitālo aušanu un batikošanu.'
    },
    portfolio: {
      title: 'Portfolio',
      works: {
        funguy: {
          title: 'Fun-guy',
          description: 'Instalācija, kas sastāv no četru gaismas objektu grupas. Katrs objekts darbojas gan kā patstāvīgs stājdarbs, gan kā funkcionāls gaismas priekšmets. Katra atsevišķa objekta izmērs 150x30x30cm. Darba izgaismotā, brūngani caurspīdīgā daļa - "abažūrs" veidots, izmantojot autores izaudzētu celulozes šķiedru, kas radīta izmantojot simbiotisko baktēriju kultūru.'
        },
        rainbow: {
          title: 'Varavīksnene',
          description: 'Ilzes Brenn "Varavīksnene" iekārtojusies izstādes vidusdaļā un vēro telpu ar savu varavīkšņoto aci. Šis objekts, veidots no vilnas, poliestera un kompozītmateriāliem, liek skatītājam iztēloties, ko un kā redz uz debesīm pavērstā acs.'
        }
      }
    }
  }
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})