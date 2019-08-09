// Data source: https://github.com/stefangabos/world_countries/blob/master/data/en/countries.json
const CountryService = {

  findAllCountriesByLocale: async (locale) => {
    switch(locale) {
      case 'es':
        return CountryService.countries_es;
      default:  // en
        return CountryService.countries_en;
    }
  },

  countries_en: [
    {
      "value": "af",
      "text": "Afghanistan"
    },
    {
      "value": "al",
      "text": "Albania"
    },
    {
      "value": "dz",
      "text": "Algeria"
    },
    {
      "value": "ad",
      "text": "Andorra"
    },
    {
      "value": "ao",
      "text": "Angola"
    },
    {
      "value": "ag",
      "text": "Antigua and Barbuda"
    },
    {
      "value": "ar",
      "text": "Argentina"
    },
    {
      "value": "am",
      "text": "Armenia"
    },
    {
      "value": "au",
      "text": "Australia"
    },
    {
      "value": "at",
      "text": "Austria"
    },
    {
      "value": "az",
      "text": "Azerbaijan"
    },
    {
      "value": "bs",
      "text": "Bahamas"
    },
    {
      "value": "bh",
      "text": "Bahrain"
    },
    {
      "value": "bd",
      "text": "Bangladesh"
    },
    {
      "value": "bb",
      "text": "Barbados"
    },
    {
      "value": "by",
      "text": "Belarus"
    },
    {
      "value": "be",
      "text": "Belgium"
    },
    {
      "value": "bz",
      "text": "Belize"
    },
    {
      "value": "bj",
      "text": "Benin"
    },
    {
      "value": "bt",
      "text": "Bhutan"
    },
    {
      "value": "bo",
      "text": "Bolivia (Plurinational State of)"
    },
    {
      "value": "ba",
      "text": "Bosnia and Herzegovina"
    },
    {
      "value": "bw",
      "text": "Botswana"
    },
    {
      "value": "br",
      "text": "Brazil"
    },
    {
      "value": "bn",
      "text": "Brunei Darussalam"
    },
    {
      "value": "bg",
      "text": "Bulgaria"
    },
    {
      "value": "bf",
      "text": "Burkina Faso"
    },
    {
      "value": "bi",
      "text": "Burundi"
    },
    {
      "value": "cv",
      "text": "Cabo Verde"
    },
    {
      "value": "kh",
      "text": "Cambodia"
    },
    {
      "value": "cm",
      "text": "Cameroon"
    },
    {
      "value": "ca",
      "text": "Canada"
    },
    {
      "value": "cf",
      "text": "Central African Republic"
    },
    {
      "value": "td",
      "text": "Chad"
    },
    {
      "value": "cl",
      "text": "Chile"
    },
    {
      "value": "cn",
      "text": "China"
    },
    {
      "value": "co",
      "text": "Colombia"
    },
    {
      "value": "km",
      "text": "Comoros"
    },
    {
      "value": "cg",
      "text": "Congo"
    },
    {
      "value": "cd",
      "text": "Congo, Democratic Republic of the"
    },
    {
      "value": "cr",
      "text": "Costa Rica"
    },
    {
      "value": "ci",
      "text": "Côte d'Ivoire"
    },
    {
      "value": "hr",
      "text": "Croatia"
    },
    {
      "value": "cu",
      "text": "Cuba"
    },
    {
      "value": "cy",
      "text": "Cyprus"
    },
    {
      "value": "cz",
      "text": "Czechia"
    },
    {
      "value": "dk",
      "text": "Denmark"
    },
    {
      "value": "dj",
      "text": "Djibouti"
    },
    {
      "value": "dm",
      "text": "Dominica"
    },
    {
      "value": "do",
      "text": "Dominican Republic"
    },
    {
      "value": "ec",
      "text": "Ecuador"
    },
    {
      "value": "eg",
      "text": "Egypt"
    },
    {
      "value": "sv",
      "text": "El Salvador"
    },
    {
      "value": "gq",
      "text": "Equatorial Guinea"
    },
    {
      "value": "er",
      "text": "Eritrea"
    },
    {
      "value": "ee",
      "text": "Estonia"
    },
    {
      "value": "sz",
      "text": "Eswatini"
    },
    {
      "value": "et",
      "text": "Ethiopia"
    },
    {
      "value": "fj",
      "text": "Fiji"
    },
    {
      "value": "fi",
      "text": "Finland"
    },
    {
      "value": "fr",
      "text": "France"
    },
    {
      "value": "ga",
      "text": "Gabon"
    },
    {
      "value": "gm",
      "text": "Gambia"
    },
    {
      "value": "ge",
      "text": "Georgia"
    },
    {
      "value": "de",
      "text": "Germany"
    },
    {
      "value": "gh",
      "text": "Ghana"
    },
    {
      "value": "gr",
      "text": "Greece"
    },
    {
      "value": "gd",
      "text": "Grenada"
    },
    {
      "value": "gt",
      "text": "Guatemala"
    },
    {
      "value": "gn",
      "text": "Guinea"
    },
    {
      "value": "gw",
      "text": "Guinea-Bissau"
    },
    {
      "value": "gy",
      "text": "Guyana"
    },
    {
      "value": "ht",
      "text": "Haiti"
    },
    {
      "value": "hn",
      "text": "Honduras"
    },
    {
      "value": "hu",
      "text": "Hungary"
    },
    {
      "value": "is",
      "text": "Iceland"
    },
    {
      "value": "in",
      "text": "India"
    },
    {
      "value": "id",
      "text": "Indonesia"
    },
    {
      "value": "ir",
      "text": "Iran (Islamic Republic of)"
    },
    {
      "value": "iq",
      "text": "Iraq"
    },
    {
      "value": "ie",
      "text": "Ireland"
    },
    {
      "value": "il",
      "text": "Israel"
    },
    {
      "value": "it",
      "text": "Italy"
    },
    {
      "value": "jm",
      "text": "Jamaica"
    },
    {
      "value": "jp",
      "text": "Japan"
    },
    {
      "value": "jo",
      "text": "Jordan"
    },
    {
      "value": "kz",
      "text": "Kazakhstan"
    },
    {
      "value": "ke",
      "text": "Kenya"
    },
    {
      "value": "ki",
      "text": "Kiribati"
    },
    {
      "value": "kp",
      "text": "Korea (Democratic People's Republic of)"
    },
    {
      "value": "kr",
      "text": "Korea, Republic of"
    },
    {
      "value": "kw",
      "text": "Kuwait"
    },
    {
      "value": "kg",
      "text": "Kyrgyzstan"
    },
    {
      "value": "la",
      "text": "Lao People's Democratic Republic"
    },
    {
      "value": "lv",
      "text": "Latvia"
    },
    {
      "value": "lb",
      "text": "Lebanon"
    },
    {
      "value": "ls",
      "text": "Lesotho"
    },
    {
      "value": "lr",
      "text": "Liberia"
    },
    {
      "value": "ly",
      "text": "Libya"
    },
    {
      "value": "li",
      "text": "Liechtenstein"
    },
    {
      "value": "lt",
      "text": "Lithuania"
    },
    {
      "value": "lu",
      "text": "Luxembourg"
    },
    {
      "value": "mg",
      "text": "Madagascar"
    },
    {
      "value": "mw",
      "text": "Malawi"
    },
    {
      "value": "my",
      "text": "Malaysia"
    },
    {
      "value": "mv",
      "text": "Maldives"
    },
    {
      "value": "ml",
      "text": "Mali"
    },
    {
      "value": "mt",
      "text": "Malta"
    },
    {
      "value": "mh",
      "text": "Marshall Islands"
    },
    {
      "value": "mr",
      "text": "Mauritania"
    },
    {
      "value": "mu",
      "text": "Mauritius"
    },
    {
      "value": "mx",
      "text": "Mexico"
    },
    {
      "value": "fm",
      "text": "Micronesia (Federated States of)"
    },
    {
      "value": "md",
      "text": "Moldova, Republic of"
    },
    {
      "value": "mc",
      "text": "Monaco"
    },
    {
      "value": "mn",
      "text": "Mongolia"
    },
    {
      "value": "me",
      "text": "Montenegro"
    },
    {
      "value": "ma",
      "text": "Morocco"
    },
    {
      "value": "mz",
      "text": "Mozambique"
    },
    {
      "value": "mm",
      "text": "Myanmar"
    },
    {
      "value": "na",
      "text": "Namibia"
    },
    {
      "value": "nr",
      "text": "Nauru"
    },
    {
      "value": "np",
      "text": "Nepal"
    },
    {
      "value": "nl",
      "text": "Netherlands"
    },
    {
      "value": "nz",
      "text": "New Zealand"
    },
    {
      "value": "ni",
      "text": "Nicaragua"
    },
    {
      "value": "ne",
      "text": "Niger"
    },
    {
      "value": "ng",
      "text": "Nigeria"
    },
    {
      "value": "mk",
      "text": "North Macedonia"
    },
    {
      "value": "no",
      "text": "Norway"
    },
    {
      "value": "om",
      "text": "Oman"
    },
    {
      "value": "pk",
      "text": "Pakistan"
    },
    {
      "value": "pw",
      "text": "Palau"
    },
    {
      "value": "pa",
      "text": "Panama"
    },
    {
      "value": "pg",
      "text": "Papua New Guinea"
    },
    {
      "value": "py",
      "text": "Paraguay"
    },
    {
      "value": "pe",
      "text": "Peru"
    },
    {
      "value": "ph",
      "text": "Philippines"
    },
    {
      "value": "pl",
      "text": "Poland"
    },
    {
      "value": "pt",
      "text": "Portugal"
    },
    {
      "value": "qa",
      "text": "Qatar"
    },
    {
      "value": "ro",
      "text": "Romania"
    },
    {
      "value": "ru",
      "text": "Russian Federation"
    },
    {
      "value": "rw",
      "text": "Rwanda"
    },
    {
      "value": "kn",
      "text": "Saint Kitts and Nevis"
    },
    {
      "value": "lc",
      "text": "Saint Lucia"
    },
    {
      "value": "vc",
      "text": "Saint Vincent and the Grenadines"
    },
    {
      "value": "ws",
      "text": "Samoa"
    },
    {
      "value": "sm",
      "text": "San Marino"
    },
    {
      "value": "st",
      "text": "Sao Tome and Principe"
    },
    {
      "value": "sa",
      "text": "Saudi Arabia"
    },
    {
      "value": "sn",
      "text": "Senegal"
    },
    {
      "value": "rs",
      "text": "Serbia"
    },
    {
      "value": "sc",
      "text": "Seychelles"
    },
    {
      "value": "sl",
      "text": "Sierra Leone"
    },
    {
      "value": "sg",
      "text": "Singapore"
    },
    {
      "value": "sk",
      "text": "Slovakia"
    },
    {
      "value": "si",
      "text": "Slovenia"
    },
    {
      "value": "sb",
      "text": "Solomon Islands"
    },
    {
      "value": "so",
      "text": "Somalia"
    },
    {
      "value": "za",
      "text": "South Africa"
    },
    {
      "value": "ss",
      "text": "South Sudan"
    },
    {
      "value": "es",
      "text": "Spain"
    },
    {
      "value": "lk",
      "text": "Sri Lanka"
    },
    {
      "value": "sd",
      "text": "Sudan"
    },
    {
      "value": "sr",
      "text": "Suriname"
    },
    {
      "value": "se",
      "text": "Sweden"
    },
    {
      "value": "ch",
      "text": "Switzerland"
    },
    {
      "value": "sy",
      "text": "Syrian Arab Republic"
    },
    {
      "value": "tj",
      "text": "Tajikistan"
    },
    {
      "value": "tz",
      "text": "Tanzania, United Republic of"
    },
    {
      "value": "th",
      "text": "Thailand"
    },
    {
      "value": "tl",
      "text": "Timor-Leste"
    },
    {
      "value": "tg",
      "text": "Togo"
    },
    {
      "value": "to",
      "text": "Tonga"
    },
    {
      "value": "tt",
      "text": "Trinidad and Tobago"
    },
    {
      "value": "tn",
      "text": "Tunisia"
    },
    {
      "value": "tr",
      "text": "Turkey"
    },
    {
      "value": "tm",
      "text": "Turkmenistan"
    },
    {
      "value": "tv",
      "text": "Tuvalu"
    },
    {
      "value": "ug",
      "text": "Uganda"
    },
    {
      "value": "ua",
      "text": "Ukraine"
    },
    {
      "value": "ae",
      "text": "United Arab Emirates"
    },
    {
      "value": "gb",
      "text": "United Kingdom of Great Britain and Northern Ireland"
    },
    {
      "value": "us",
      "text": "United States of America"
    },
    {
      "value": "uy",
      "text": "Uruguay"
    },
    {
      "value": "uz",
      "text": "Uzbekistan"
    },
    {
      "value": "vu",
      "text": "Vanuatu"
    },
    {
      "value": "ve",
      "text": "Venezuela (Bolivarian Republic of)"
    },
    {
      "value": "vn",
      "text": "Viet Nam"
    },
    {
      "value": "ye",
      "text": "Yemen"
    },
    {
      "value": "zm",
      "text": "Zambia"
    },
    {
      "value": "zw",
      "text": "Zimbabwe"
    }
  ],


  countries_es: [
    {
      "value": "af",
      "text": "Afganistán"
    },
    {
      "value": "al",
      "text": "Albania"
    },
    {
      "value": "de",
      "text": "Alemania"
    },
    {
      "value": "ad",
      "text": "Andorra"
    },
    {
      "value": "ao",
      "text": "Angola"
    },
    {
      "value": "ag",
      "text": "Antigua y Barbuda"
    },
    {
      "value": "sa",
      "text": "Arabia Saudita"
    },
    {
      "value": "dz",
      "text": "Argelia"
    },
    {
      "value": "ar",
      "text": "Argentina"
    },
    {
      "value": "am",
      "text": "Armenia"
    },
    {
      "value": "au",
      "text": "Australia"
    },
    {
      "value": "at",
      "text": "Austria"
    },
    {
      "value": "az",
      "text": "Azerbaiyán"
    },
    {
      "value": "bs",
      "text": "Bahamas"
    },
    {
      "value": "bd",
      "text": "Bangladés"
    },
    {
      "value": "bb",
      "text": "Barbados"
    },
    {
      "value": "bh",
      "text": "Baréin"
    },
    {
      "value": "be",
      "text": "Bélgica"
    },
    {
      "value": "bz",
      "text": "Belice"
    },
    {
      "value": "bj",
      "text": "Benín"
    },
    {
      "value": "by",
      "text": "Bielorrusia"
    },
    {
      "value": "bo",
      "text": "Bolivia"
    },
    {
      "value": "ba",
      "text": "Bosnia y Herzegovina"
    },
    {
      "value": "bw",
      "text": "Botsuana"
    },
    {
      "value": "br",
      "text": "Brasil"
    },
    {
      "value": "bn",
      "text": "Brunéi"
    },
    {
      "value": "bg",
      "text": "Bulgaria"
    },
    {
      "value": "bf",
      "text": "Burkina Faso"
    },
    {
      "value": "bi",
      "text": "Burundi"
    },
    {
      "value": "bt",
      "text": "Bután"
    },
    {
      "value": "cv",
      "text": "Cabo Verde"
    },
    {
      "value": "kh",
      "text": "Camboya"
    },
    {
      "value": "cm",
      "text": "Camerún"
    },
    {
      "value": "ca",
      "text": "Canadá"
    },
    {
      "value": "qa",
      "text": "Catar"
    },
    {
      "value": "td",
      "text": "Chad"
    },
    {
      "value": "cl",
      "text": "Chile"
    },
    {
      "value": "cn",
      "text": "China"
    },
    {
      "value": "cy",
      "text": "Chipre"
    },
    {
      "value": "co",
      "text": "Colombia"
    },
    {
      "value": "km",
      "text": "Comoras"
    },
    {
      "value": "kp",
      "text": "Corea del Norte"
    },
    {
      "value": "kr",
      "text": "Corea del Sur"
    },
    {
      "value": "ci",
      "text": "Costa de Marfil"
    },
    {
      "value": "cr",
      "text": "Costa Rica"
    },
    {
      "value": "hr",
      "text": "Croacia"
    },
    {
      "value": "cu",
      "text": "Cuba"
    },
    {
      "value": "dk",
      "text": "Dinamarca"
    },
    {
      "value": "dm",
      "text": "Dominica"
    },
    {
      "value": "ec",
      "text": "Ecuador"
    },
    {
      "value": "eg",
      "text": "Egipto"
    },
    {
      "value": "sv",
      "text": "El Salvador"
    },
    {
      "value": "ae",
      "text": "Emiratos Árabes Unidos"
    },
    {
      "value": "er",
      "text": "Eritrea"
    },
    {
      "value": "sk",
      "text": "Eslovaquia"
    },
    {
      "value": "si",
      "text": "Eslovenia"
    },
    {
      "value": "es",
      "text": "España"
    },
    {
      "value": "us",
      "text": "Estados Unidos"
    },
    {
      "value": "ee",
      "text": "Estonia"
    },
    {
      "value": "et",
      "text": "Etiopía"
    },
    {
      "value": "ph",
      "text": "Filipinas"
    },
    {
      "value": "fi",
      "text": "Finlandia"
    },
    {
      "value": "fj",
      "text": "Fiyi"
    },
    {
      "value": "fr",
      "text": "Francia"
    },
    {
      "value": "ga",
      "text": "Gabón"
    },
    {
      "value": "gm",
      "text": "Gambia"
    },
    {
      "value": "ge",
      "text": "Georgia"
    },
    {
      "value": "gh",
      "text": "Ghana"
    },
    {
      "value": "gd",
      "text": "Granada"
    },
    {
      "value": "gr",
      "text": "Grecia"
    },
    {
      "value": "gt",
      "text": "Guatemala"
    },
    {
      "value": "gn",
      "text": "Guinea"
    },
    {
      "value": "gw",
      "text": "Guinea-Bisáu"
    },
    {
      "value": "gq",
      "text": "Guinea Ecuatorial"
    },
    {
      "value": "gy",
      "text": "Guyana"
    },
    {
      "value": "ht",
      "text": "Haití"
    },
    {
      "value": "hn",
      "text": "Honduras"
    },
    {
      "value": "hu",
      "text": "Hungría"
    },
    {
      "value": "in",
      "text": "India"
    },
    {
      "value": "id",
      "text": "Indonesia"
    },
    {
      "value": "iq",
      "text": "Irak"
    },
    {
      "value": "ir",
      "text": "Irán"
    },
    {
      "value": "ie",
      "text": "Irlanda"
    },
    {
      "value": "is",
      "text": "Islandia"
    },
    {
      "value": "mh",
      "text": "Islas Marshall"
    },
    {
      "value": "sb",
      "text": "Islas Salomón"
    },
    {
      "value": "il",
      "text": "Israel"
    },
    {
      "value": "it",
      "text": "Italia"
    },
    {
      "value": "jm",
      "text": "Jamaica"
    },
    {
      "value": "jp",
      "text": "Japón"
    },
    {
      "value": "jo",
      "text": "Jordania"
    },
    {
      "value": "kz",
      "text": "Kazajistán"
    },
    {
      "value": "ke",
      "text": "Kenia"
    },
    {
      "value": "kg",
      "text": "Kirguistán"
    },
    {
      "value": "ki",
      "text": "Kiribati"
    },
    {
      "value": "kw",
      "text": "Kuwait"
    },
    {
      "value": "la",
      "text": "Laos"
    },
    {
      "value": "ls",
      "text": "Lesoto"
    },
    {
      "value": "lv",
      "text": "Letonia"
    },
    {
      "value": "lb",
      "text": "Líbano"
    },
    {
      "value": "lr",
      "text": "Liberia"
    },
    {
      "value": "ly",
      "text": "Libia"
    },
    {
      "value": "li",
      "text": "Liechtenstein"
    },
    {
      "value": "lt",
      "text": "Lituania"
    },
    {
      "value": "lu",
      "text": "Luxemburgo"
    },
    {
      "value": "mk",
      "text": "Macedonia del Norte"
    },
    {
      "value": "mg",
      "text": "Madagascar"
    },
    {
      "value": "my",
      "text": "Malasia"
    },
    {
      "value": "mw",
      "text": "Malaui"
    },
    {
      "value": "mv",
      "text": "Maldivas"
    },
    {
      "value": "ml",
      "text": "Malí"
    },
    {
      "value": "mt",
      "text": "Malta"
    },
    {
      "value": "ma",
      "text": "Marruecos"
    },
    {
      "value": "mu",
      "text": "Mauricio"
    },
    {
      "value": "mr",
      "text": "Mauritania"
    },
    {
      "value": "mx",
      "text": "México"
    },
    {
      "value": "fm",
      "text": "Micronesia"
    },
    {
      "value": "md",
      "text": "Moldavia"
    },
    {
      "value": "mc",
      "text": "Mónaco"
    },
    {
      "value": "mn",
      "text": "Mongolia"
    },
    {
      "value": "me",
      "text": "Montenegro"
    },
    {
      "value": "mz",
      "text": "Mozambique"
    },
    {
      "value": "mm",
      "text": "Birmania"
    },
    {
      "value": "na",
      "text": "Namibia"
    },
    {
      "value": "nr",
      "text": "Nauru"
    },
    {
      "value": "np",
      "text": "Nepal"
    },
    {
      "value": "ni",
      "text": "Nicaragua"
    },
    {
      "value": "ne",
      "text": "Níger"
    },
    {
      "value": "ng",
      "text": "Nigeria"
    },
    {
      "value": "no",
      "text": "Noruega"
    },
    {
      "value": "nz",
      "text": "Nueva Zelanda"
    },
    {
      "value": "om",
      "text": "Omán"
    },
    {
      "value": "nl",
      "text": "Países Bajos"
    },
    {
      "value": "pk",
      "text": "Pakistán"
    },
    {
      "value": "pw",
      "text": "Palaos"
    },
    {
      "value": "pa",
      "text": "Panamá"
    },
    {
      "value": "pg",
      "text": "Papúa Nueva Guinea"
    },
    {
      "value": "py",
      "text": "Paraguay"
    },
    {
      "value": "pe",
      "text": "Perú"
    },
    {
      "value": "pl",
      "text": "Polonia"
    },
    {
      "value": "pt",
      "text": "Portugal"
    },
    {
      "value": "gb",
      "text": "Reino Unido"
    },
    {
      "value": "cf",
      "text": "República Centroafricana"
    },
    {
      "value": "cz",
      "text": "República Checa"
    },
    {
      "value": "cg",
      "text": "República del Congo"
    },
    {
      "value": "cd",
      "text": "República Democrática del Congo"
    },
    {
      "value": "do",
      "text": "República Dominicana"
    },
    {
      "value": "rw",
      "text": "Ruanda"
    },
    {
      "value": "ro",
      "text": "Rumania"
    },
    {
      "value": "ru",
      "text": "Rusia"
    },
    {
      "value": "ws",
      "text": "Samoa"
    },
    {
      "value": "kn",
      "text": "San Cristóbal y Nieves"
    },
    {
      "value": "sm",
      "text": "San Marino"
    },
    {
      "value": "vc",
      "text": "San Vicente y las Granadinas"
    },
    {
      "value": "lc",
      "text": "Santa Lucía"
    },
    {
      "value": "st",
      "text": "Santo Tomé y Príncipe"
    },
    {
      "value": "sn",
      "text": "Senegal"
    },
    {
      "value": "rs",
      "text": "Serbia"
    },
    {
      "value": "sc",
      "text": "Seychelles"
    },
    {
      "value": "sl",
      "text": "Sierra Leona"
    },
    {
      "value": "sg",
      "text": "Singapur"
    },
    {
      "value": "sy",
      "text": "Siria"
    },
    {
      "value": "so",
      "text": "Somalia"
    },
    {
      "value": "lk",
      "text": "Sri Lanka"
    },
    {
      "value": "sz",
      "text": "Suazilandia"
    },
    {
      "value": "za",
      "text": "Sudáfrica"
    },
    {
      "value": "sd",
      "text": "Sudán"
    },
    {
      "value": "ss",
      "text": "Sudán del Sur"
    },
    {
      "value": "se",
      "text": "Suecia"
    },
    {
      "value": "ch",
      "text": "Suiza"
    },
    {
      "value": "sr",
      "text": "Surinam"
    },
    {
      "value": "th",
      "text": "Tailandia"
    },
    {
      "value": "tz",
      "text": "Tanzania"
    },
    {
      "value": "tj",
      "text": "Tayikistán"
    },
    {
      "value": "tl",
      "text": "Timor Oriental"
    },
    {
      "value": "tg",
      "text": "Togo"
    },
    {
      "value": "to",
      "text": "Tonga"
    },
    {
      "value": "tt",
      "text": "Trinidad y Tobago"
    },
    {
      "value": "tn",
      "text": "Túnez"
    },
    {
      "value": "tm",
      "text": "Turkmenistán"
    },
    {
      "value": "tr",
      "text": "Turquía"
    },
    {
      "value": "tv",
      "text": "Tuvalu"
    },
    {
      "value": "ua",
      "text": "Ucrania"
    },
    {
      "value": "ug",
      "text": "Uganda"
    },
    {
      "value": "uy",
      "text": "Uruguay"
    },
    {
      "value": "uz",
      "text": "Uzbekistán"
    },
    {
      "value": "vu",
      "text": "Vanuatu"
    },
    {
      "value": "ve",
      "text": "Venezuela"
    },
    {
      "value": "vn",
      "text": "Vietnam"
    },
    {
      "value": "ye",
      "text": "Yemen"
    },
    {
      "value": "dj",
      "text": "Yibuti"
    },
    {
      "value": "zm",
      "text": "Zambia"
    },
    {
      "value": "zw",
      "text": "Zimbabue"
    }
  ]

}

module.exports = { CountryService };

