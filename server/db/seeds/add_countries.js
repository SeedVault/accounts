
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('countries').insert([
        {
          iso_3166_1_alpha2_code: "AF",
          iso_3166_1_alpha3_code: "AFG",
          english_short_name: "Afghanistan",
          country_id: 1
        },
        {
          iso_3166_1_alpha2_code: "AX",
          iso_3166_1_alpha3_code: "ALA",
          english_short_name: "Åland Islands",
          country_id: 2
        },
        {
          iso_3166_1_alpha2_code: "AL",
          iso_3166_1_alpha3_code: "ALB",
          english_short_name: "Albania",
          country_id: 3
        },
        {
          iso_3166_1_alpha2_code: "DZ",
          iso_3166_1_alpha3_code: "DZA",
          english_short_name: "Algeria",
          country_id: 4
        },
        {
          iso_3166_1_alpha2_code: "AS",
          iso_3166_1_alpha3_code: "ASM",
          english_short_name: "American Samoa",
          country_id: 5
        },
        {
          iso_3166_1_alpha2_code: "AD",
          iso_3166_1_alpha3_code: "AND",
          english_short_name: "Andorra",
          country_id: 6
        },
        {
          iso_3166_1_alpha2_code: "AO",
          iso_3166_1_alpha3_code: "AGO",
          english_short_name: "Angola",
          country_id: 7
        },
        {
          iso_3166_1_alpha2_code: "AI",
          iso_3166_1_alpha3_code: "AIA",
          english_short_name: "Anguilla",
          country_id: 8
        },
        {
          iso_3166_1_alpha2_code: "AQ",
          iso_3166_1_alpha3_code: "ATA",
          english_short_name: "Antarctica",
          country_id: 9
        },
        {
          iso_3166_1_alpha2_code: "AG",
          iso_3166_1_alpha3_code: "ATG",
          english_short_name: "Antigua and Barbuda",
          country_id: 10
        },
        {
          iso_3166_1_alpha2_code: "AR",
          iso_3166_1_alpha3_code: "ARG",
          english_short_name: "Argentina",
          country_id: 11
        },
        {
          iso_3166_1_alpha2_code: "AM",
          iso_3166_1_alpha3_code: "ARM",
          english_short_name: "Armenia",
          country_id: 12
        },
        {
          iso_3166_1_alpha2_code: "AW",
          iso_3166_1_alpha3_code: "ABW",
          english_short_name: "Aruba",
          country_id: 13
        },
        {
          iso_3166_1_alpha2_code: "AU",
          iso_3166_1_alpha3_code: "AUS",
          english_short_name: "Australia",
          country_id: 14
        },
        {
          iso_3166_1_alpha2_code: "AT",
          iso_3166_1_alpha3_code: "AUT",
          english_short_name: "Austria",
          country_id: 15
        },
        {
          iso_3166_1_alpha2_code: "AZ",
          iso_3166_1_alpha3_code: "AZE",
          english_short_name: "Azerbaijan",
          country_id: 16
        },
        {
          iso_3166_1_alpha2_code: "BS",
          iso_3166_1_alpha3_code: "BHS",
          english_short_name: "Bahamas",
          country_id: 17
        },
        {
          iso_3166_1_alpha2_code: "BH",
          iso_3166_1_alpha3_code: "BHR",
          english_short_name: "Bahrain",
          country_id: 18
        },
        {
          iso_3166_1_alpha2_code: "BD",
          iso_3166_1_alpha3_code: "BGD",
          english_short_name: "Bangladesh",
          country_id: 19
        },
        {
          iso_3166_1_alpha2_code: "BB",
          iso_3166_1_alpha3_code: "BRB",
          english_short_name: "Barbados",
          country_id: 20
        },
        {
          iso_3166_1_alpha2_code: "BY",
          iso_3166_1_alpha3_code: "BLR",
          english_short_name: "Belarus",
          country_id: 21
        },
        {
          iso_3166_1_alpha2_code: "BE",
          iso_3166_1_alpha3_code: "BEL",
          english_short_name: "Belgium",
          country_id: 22
        },
        {
          iso_3166_1_alpha2_code: "BZ",
          iso_3166_1_alpha3_code: "BLZ",
          english_short_name: "Belize",
          country_id: 23
        },
        {
          iso_3166_1_alpha2_code: "BJ",
          iso_3166_1_alpha3_code: "BEN",
          english_short_name: "Benin",
          country_id: 24
        },
        {
          iso_3166_1_alpha2_code: "BM",
          iso_3166_1_alpha3_code: "BMU",
          english_short_name: "Bermuda",
          country_id: 25
        },
        {
          iso_3166_1_alpha2_code: "BT",
          iso_3166_1_alpha3_code: "BTN",
          english_short_name: "Bhutan",
          country_id: 26
        },
        {
          iso_3166_1_alpha2_code: "BO",
          iso_3166_1_alpha3_code: "BOL",
          english_short_name: "Bolivia (Plurinational State of)",
          country_id: 27
        },
        {
          iso_3166_1_alpha2_code: "BQ",
          iso_3166_1_alpha3_code: "BES",
          english_short_name: "Bonaire, Sint Eustatius and Saba",
          country_id: 28
        },
        {
          iso_3166_1_alpha2_code: "BA",
          iso_3166_1_alpha3_code: "BIH",
          english_short_name: "Bosnia and Herzegovina",
          country_id: 29
        },
        {
          iso_3166_1_alpha2_code: "BW",
          iso_3166_1_alpha3_code: "BWA",
          english_short_name: "Botswana",
          country_id: 30
        },
        {
          iso_3166_1_alpha2_code: "BV",
          iso_3166_1_alpha3_code: "BVT",
          english_short_name: "Bouvet Island",
          country_id: 31
        },
        {
          iso_3166_1_alpha2_code: "BR",
          iso_3166_1_alpha3_code: "BRA",
          english_short_name: "Brazil",
          country_id: 32
        },
        {
          iso_3166_1_alpha2_code: "IO",
          iso_3166_1_alpha3_code: "IOT",
          english_short_name: "British Indian Ocean Territory",
          country_id: 33
        },
        {
          iso_3166_1_alpha2_code: "UM",
          iso_3166_1_alpha3_code: "UMI",
          english_short_name: "United States Minor Outlying Islands",
          country_id: 34
        },
        {
          iso_3166_1_alpha2_code: "VG",
          iso_3166_1_alpha3_code: "VGB",
          english_short_name: "Virgin Islands (British)",
          country_id: 35
        },
        {
          iso_3166_1_alpha2_code: "VI",
          iso_3166_1_alpha3_code: "VIR",
          english_short_name: "Virgin Islands (U.S.)",
          country_id: 36
        },
        {
          iso_3166_1_alpha2_code: "BN",
          iso_3166_1_alpha3_code: "BRN",
          english_short_name: "Brunei Darussalam",
          country_id: 37
        },
        {
          iso_3166_1_alpha2_code: "BG",
          iso_3166_1_alpha3_code: "BGR",
          english_short_name: "Bulgaria",
          country_id: 38
        },
        {
          iso_3166_1_alpha2_code: "BF",
          iso_3166_1_alpha3_code: "BFA",
          english_short_name: "Burkina Faso",
          country_id: 39
        },
        {
          iso_3166_1_alpha2_code: "BI",
          iso_3166_1_alpha3_code: "BDI",
          english_short_name: "Burundi",
          country_id: 40
        },
        {
          iso_3166_1_alpha2_code: "KH",
          iso_3166_1_alpha3_code: "KHM",
          english_short_name: "Cambodia",
          country_id: 41
        },
        {
          iso_3166_1_alpha2_code: "CM",
          iso_3166_1_alpha3_code: "CMR",
          english_short_name: "Cameroon",
          country_id: 42
        },
        {
          iso_3166_1_alpha2_code: "CA",
          iso_3166_1_alpha3_code: "CAN",
          english_short_name: "Canada",
          country_id: 43
        },
        {
          iso_3166_1_alpha2_code: "CV",
          iso_3166_1_alpha3_code: "CPV",
          english_short_name: "Cabo Verde",
          country_id: 44
        },
        {
          iso_3166_1_alpha2_code: "KY",
          iso_3166_1_alpha3_code: "CYM",
          english_short_name: "Cayman Islands",
          country_id: 45
        },
        {
          iso_3166_1_alpha2_code: "CF",
          iso_3166_1_alpha3_code: "CAF",
          english_short_name: "Central African Republic",
          country_id: 46
        },
        {
          iso_3166_1_alpha2_code: "TD",
          iso_3166_1_alpha3_code: "TCD",
          english_short_name: "Chad",
          country_id: 47
        },
        {
          iso_3166_1_alpha2_code: "CL",
          iso_3166_1_alpha3_code: "CHL",
          english_short_name: "Chile",
          country_id: 48
        },
        {
          iso_3166_1_alpha2_code: "CN",
          iso_3166_1_alpha3_code: "CHN",
          english_short_name: "China",
          country_id: 49
        },
        {
          iso_3166_1_alpha2_code: "CX",
          iso_3166_1_alpha3_code: "CXR",
          english_short_name: "Christmas Island",
          country_id: 50
        },
        {
          iso_3166_1_alpha2_code: "CC",
          iso_3166_1_alpha3_code: "CCK",
          english_short_name: "Cocos (Keeling) Islands",
          country_id: 51
        },
        {
          iso_3166_1_alpha2_code: "CO",
          iso_3166_1_alpha3_code: "COL",
          english_short_name: "Colombia",
          country_id: 52
        },
        {
          iso_3166_1_alpha2_code: "KM",
          iso_3166_1_alpha3_code: "COM",
          english_short_name: "Comoros",
          country_id: 53
        },
        {
          iso_3166_1_alpha2_code: "CG",
          iso_3166_1_alpha3_code: "COG",
          english_short_name: "Congo",
          country_id: 54
        },
        {
          iso_3166_1_alpha2_code: "CD",
          iso_3166_1_alpha3_code: "COD",
          english_short_name: "Congo (Democratic Republic of the)",
          country_id: 55
        },
        {
          iso_3166_1_alpha2_code: "CK",
          iso_3166_1_alpha3_code: "COK",
          english_short_name: "Cook Islands",
          country_id: 56
        },
        {
          iso_3166_1_alpha2_code: "CR",
          iso_3166_1_alpha3_code: "CRI",
          english_short_name: "Costa Rica",
          country_id: 57
        },
        {
          iso_3166_1_alpha2_code: "HR",
          iso_3166_1_alpha3_code: "HRV",
          english_short_name: "Croatia",
          country_id: 58
        },
        {
          iso_3166_1_alpha2_code: "CU",
          iso_3166_1_alpha3_code: "CUB",
          english_short_name: "Cuba",
          country_id: 59
        },
        {
          iso_3166_1_alpha2_code: "CW",
          iso_3166_1_alpha3_code: "CUW",
          english_short_name: "Curaçao",
          country_id: 60
        },
        {
          iso_3166_1_alpha2_code: "CY",
          iso_3166_1_alpha3_code: "CYP",
          english_short_name: "Cyprus",
          country_id: 61
        },
        {
          iso_3166_1_alpha2_code: "CZ",
          iso_3166_1_alpha3_code: "CZE",
          english_short_name: "Czech Republic",
          country_id: 62
        },
        {
          iso_3166_1_alpha2_code: "DK",
          iso_3166_1_alpha3_code: "DNK",
          english_short_name: "Denmark",
          country_id: 63
        },
        {
          iso_3166_1_alpha2_code: "DJ",
          iso_3166_1_alpha3_code: "DJI",
          english_short_name: "Djibouti",
          country_id: 64
        },
        {
          iso_3166_1_alpha2_code: "DM",
          iso_3166_1_alpha3_code: "DMA",
          english_short_name: "Dominica",
          country_id: 65
        },
        {
          iso_3166_1_alpha2_code: "DO",
          iso_3166_1_alpha3_code: "DOM",
          english_short_name: "Dominican Republic",
          country_id: 66
        },
        {
          iso_3166_1_alpha2_code: "EC",
          iso_3166_1_alpha3_code: "ECU",
          english_short_name: "Ecuador",
          country_id: 67
        },
        {
          iso_3166_1_alpha2_code: "EG",
          iso_3166_1_alpha3_code: "EGY",
          english_short_name: "Egypt",
          country_id: 68
        },
        {
          iso_3166_1_alpha2_code: "SV",
          iso_3166_1_alpha3_code: "SLV",
          english_short_name: "El Salvador",
          country_id: 69
        },
        {
          iso_3166_1_alpha2_code: "GQ",
          iso_3166_1_alpha3_code: "GNQ",
          english_short_name: "Equatorial Guinea",
          country_id: 70
        },
        {
          iso_3166_1_alpha2_code: "ER",
          iso_3166_1_alpha3_code: "ERI",
          english_short_name: "Eritrea",
          country_id: 71
        },
        {
          iso_3166_1_alpha2_code: "EE",
          iso_3166_1_alpha3_code: "EST",
          english_short_name: "Estonia",
          country_id: 72
        },
        {
          iso_3166_1_alpha2_code: "ET",
          iso_3166_1_alpha3_code: "ETH",
          english_short_name: "Ethiopia",
          country_id: 73
        },
        {
          iso_3166_1_alpha2_code: "FK",
          iso_3166_1_alpha3_code: "FLK",
          english_short_name: "Falkland Islands (Malvinas)",
          country_id: 74
        },
        {
          iso_3166_1_alpha2_code: "FO",
          iso_3166_1_alpha3_code: "FRO",
          english_short_name: "Faroe Islands",
          country_id: 75
        },
        {
          iso_3166_1_alpha2_code: "FJ",
          iso_3166_1_alpha3_code: "FJI",
          english_short_name: "Fiji",
          country_id: 76
        },
        {
          iso_3166_1_alpha2_code: "FI",
          iso_3166_1_alpha3_code: "FIN",
          english_short_name: "Finland",
          country_id: 77
        },
        {
          iso_3166_1_alpha2_code: "FR",
          iso_3166_1_alpha3_code: "FRA",
          english_short_name: "France",
          country_id: 78
        },
        {
          iso_3166_1_alpha2_code: "GF",
          iso_3166_1_alpha3_code: "GUF",
          english_short_name: "French Guiana",
          country_id: 79
        },
        {
          iso_3166_1_alpha2_code: "PF",
          iso_3166_1_alpha3_code: "PYF",
          english_short_name: "French Polynesia",
          country_id: 80
        },
        {
          iso_3166_1_alpha2_code: "TF",
          iso_3166_1_alpha3_code: "ATF",
          english_short_name: "French Southern Territories",
          country_id: 81
        },
        {
          iso_3166_1_alpha2_code: "GA",
          iso_3166_1_alpha3_code: "GAB",
          english_short_name: "Gabon",
          country_id: 82
        },
        {
          iso_3166_1_alpha2_code: "GM",
          iso_3166_1_alpha3_code: "GMB",
          english_short_name: "Gambia",
          country_id: 83
        },
        {
          iso_3166_1_alpha2_code: "GE",
          iso_3166_1_alpha3_code: "GEO",
          english_short_name: "Georgia",
          country_id: 84
        },
        {
          iso_3166_1_alpha2_code: "DE",
          iso_3166_1_alpha3_code: "DEU",
          english_short_name: "Germany",
          country_id: 85
        },
        {
          iso_3166_1_alpha2_code: "GH",
          iso_3166_1_alpha3_code: "GHA",
          english_short_name: "Ghana",
          country_id: 86
        },
        {
          iso_3166_1_alpha2_code: "GI",
          iso_3166_1_alpha3_code: "GIB",
          english_short_name: "Gibraltar",
          country_id: 87
        },
        {
          iso_3166_1_alpha2_code: "GR",
          iso_3166_1_alpha3_code: "GRC",
          english_short_name: "Greece",
          country_id: 88
        },
        {
          iso_3166_1_alpha2_code: "GL",
          iso_3166_1_alpha3_code: "GRL",
          english_short_name: "Greenland",
          country_id: 89
        },
        {
          iso_3166_1_alpha2_code: "GD",
          iso_3166_1_alpha3_code: "GRD",
          english_short_name: "Grenada",
          country_id: 90
        },
        {
          iso_3166_1_alpha2_code: "GP",
          iso_3166_1_alpha3_code: "GLP",
          english_short_name: "Guadeloupe",
          country_id: 91
        },
        {
          iso_3166_1_alpha2_code: "GU",
          iso_3166_1_alpha3_code: "GUM",
          english_short_name: "Guam",
          country_id: 92
        },
        {
          iso_3166_1_alpha2_code: "GT",
          iso_3166_1_alpha3_code: "GTM",
          english_short_name: "Guatemala",
          country_id: 93
        },
        {
          iso_3166_1_alpha2_code: "GG",
          iso_3166_1_alpha3_code: "GGY",
          english_short_name: "Guernsey",
          country_id: 94
        },
        {
          iso_3166_1_alpha2_code: "GN",
          iso_3166_1_alpha3_code: "GIN",
          english_short_name: "Guinea",
          country_id: 95
        },
        {
          iso_3166_1_alpha2_code: "GW",
          iso_3166_1_alpha3_code: "GNB",
          english_short_name: "Guinea-Bissau",
          country_id: 96
        },
        {
          iso_3166_1_alpha2_code: "GY",
          iso_3166_1_alpha3_code: "GUY",
          english_short_name: "Guyana",
          country_id: 97
        },
        {
          iso_3166_1_alpha2_code: "HT",
          iso_3166_1_alpha3_code: "HTI",
          english_short_name: "Haiti",
          country_id: 98
        },
        {
          iso_3166_1_alpha2_code: "HM",
          iso_3166_1_alpha3_code: "HMD",
          english_short_name: "Heard Island and McDonald Islands",
          country_id: 99
        },
        {
          iso_3166_1_alpha2_code: "VA",
          iso_3166_1_alpha3_code: "VAT",
          english_short_name: "Holy See",
          country_id: 100
        },
        {
          iso_3166_1_alpha2_code: "HN",
          iso_3166_1_alpha3_code: "HND",
          english_short_name: "Honduras",
          country_id: 101
        },
        {
          iso_3166_1_alpha2_code: "HK",
          iso_3166_1_alpha3_code: "HKG",
          english_short_name: "Hong Kong",
          country_id: 102
        },
        {
          iso_3166_1_alpha2_code: "HU",
          iso_3166_1_alpha3_code: "HUN",
          english_short_name: "Hungary",
          country_id: 103
        },
        {
          iso_3166_1_alpha2_code: "IS",
          iso_3166_1_alpha3_code: "ISL",
          english_short_name: "Iceland",
          country_id: 104
        },
        {
          iso_3166_1_alpha2_code: "IN",
          iso_3166_1_alpha3_code: "IND",
          english_short_name: "India",
          country_id: 105
        },
        {
          iso_3166_1_alpha2_code: "ID",
          iso_3166_1_alpha3_code: "IDN",
          english_short_name: "Indonesia",
          country_id: 106
        },
        {
          iso_3166_1_alpha2_code: "CI",
          iso_3166_1_alpha3_code: "CIV",
          english_short_name: "Côte d'Ivoire",
          country_id: 107
        },
        {
          iso_3166_1_alpha2_code: "IR",
          iso_3166_1_alpha3_code: "IRN",
          english_short_name: "Iran (Islamic Republic of)",
          country_id: 108
        },
        {
          iso_3166_1_alpha2_code: "IQ",
          iso_3166_1_alpha3_code: "IRQ",
          english_short_name: "Iraq",
          country_id: 109
        },
        {
          iso_3166_1_alpha2_code: "IE",
          iso_3166_1_alpha3_code: "IRL",
          english_short_name: "Ireland",
          country_id: 110
        },
        {
          iso_3166_1_alpha2_code: "IM",
          iso_3166_1_alpha3_code: "IMN",
          english_short_name: "Isle of Man",
          country_id: 111
        },
        {
          iso_3166_1_alpha2_code: "IL",
          iso_3166_1_alpha3_code: "ISR",
          english_short_name: "Israel",
          country_id: 112
        },
        {
          iso_3166_1_alpha2_code: "IT",
          iso_3166_1_alpha3_code: "ITA",
          english_short_name: "Italy",
          country_id: 113
        },
        {
          iso_3166_1_alpha2_code: "JM",
          iso_3166_1_alpha3_code: "JAM",
          english_short_name: "Jamaica",
          country_id: 114
        },
        {
          iso_3166_1_alpha2_code: "JP",
          iso_3166_1_alpha3_code: "JPN",
          english_short_name: "Japan",
          country_id: 115
        },
        {
          iso_3166_1_alpha2_code: "JE",
          iso_3166_1_alpha3_code: "JEY",
          english_short_name: "Jersey",
          country_id: 116
        },
        {
          iso_3166_1_alpha2_code: "JO",
          iso_3166_1_alpha3_code: "JOR",
          english_short_name: "Jordan",
          country_id: 117
        },
        {
          iso_3166_1_alpha2_code: "KZ",
          iso_3166_1_alpha3_code: "KAZ",
          english_short_name: "Kazakhstan",
          country_id: 118
        },
        {
          iso_3166_1_alpha2_code: "KE",
          iso_3166_1_alpha3_code: "KEN",
          english_short_name: "Kenya",
          country_id: 119
        },
        {
          iso_3166_1_alpha2_code: "KI",
          iso_3166_1_alpha3_code: "KIR",
          english_short_name: "Kiribati",
          country_id: 120
        },
        {
          iso_3166_1_alpha2_code: "KW",
          iso_3166_1_alpha3_code: "KWT",
          english_short_name: "Kuwait",
          country_id: 121
        },
        {
          iso_3166_1_alpha2_code: "KG",
          iso_3166_1_alpha3_code: "KGZ",
          english_short_name: "Kyrgyzstan",
          country_id: 122
        },
        {
          iso_3166_1_alpha2_code: "LA",
          iso_3166_1_alpha3_code: "LAO",
          english_short_name: "Lao People's Democratic Republic",
          country_id: 123
        },
        {
          iso_3166_1_alpha2_code: "LV",
          iso_3166_1_alpha3_code: "LVA",
          english_short_name: "Latvia",
          country_id: 124
        },
        {
          iso_3166_1_alpha2_code: "LB",
          iso_3166_1_alpha3_code: "LBN",
          english_short_name: "Lebanon",
          country_id: 125
        },
        {
          iso_3166_1_alpha2_code: "LS",
          iso_3166_1_alpha3_code: "LSO",
          english_short_name: "Lesotho",
          country_id: 126
        },
        {
          iso_3166_1_alpha2_code: "LR",
          iso_3166_1_alpha3_code: "LBR",
          english_short_name: "Liberia",
          country_id: 127
        },
        {
          iso_3166_1_alpha2_code: "LY",
          iso_3166_1_alpha3_code: "LBY",
          english_short_name: "Libya",
          country_id: 128
        },
        {
          iso_3166_1_alpha2_code: "LI",
          iso_3166_1_alpha3_code: "LIE",
          english_short_name: "Liechtenstein",
          country_id: 129
        },
        {
          iso_3166_1_alpha2_code: "LT",
          iso_3166_1_alpha3_code: "LTU",
          english_short_name: "Lithuania",
          country_id: 130
        },
        {
          iso_3166_1_alpha2_code: "LU",
          iso_3166_1_alpha3_code: "LUX",
          english_short_name: "Luxembourg",
          country_id: 131
        },
        {
          iso_3166_1_alpha2_code: "MO",
          iso_3166_1_alpha3_code: "MAC",
          english_short_name: "Macao",
          country_id: 132
        },
        {
          iso_3166_1_alpha2_code: "MK",
          iso_3166_1_alpha3_code: "MKD",
          english_short_name: "Macedonia (the former Yugoslav Republic of)",
          country_id: 133
        },
        {
          iso_3166_1_alpha2_code: "MG",
          iso_3166_1_alpha3_code: "MDG",
          english_short_name: "Madagascar",
          country_id: 134
        },
        {
          iso_3166_1_alpha2_code: "MW",
          iso_3166_1_alpha3_code: "MWI",
          english_short_name: "Malawi",
          country_id: 135
        },
        {
          iso_3166_1_alpha2_code: "MY",
          iso_3166_1_alpha3_code: "MYS",
          english_short_name: "Malaysia",
          country_id: 136
        },
        {
          iso_3166_1_alpha2_code: "MV",
          iso_3166_1_alpha3_code: "MDV",
          english_short_name: "Maldives",
          country_id: 137
        },
        {
          iso_3166_1_alpha2_code: "ML",
          iso_3166_1_alpha3_code: "MLI",
          english_short_name: "Mali",
          country_id: 138
        },
        {
          iso_3166_1_alpha2_code: "MT",
          iso_3166_1_alpha3_code: "MLT",
          english_short_name: "Malta",
          country_id: 139
        },
        {
          iso_3166_1_alpha2_code: "MH",
          iso_3166_1_alpha3_code: "MHL",
          english_short_name: "Marshall Islands",
          country_id: 140
        },
        {
          iso_3166_1_alpha2_code: "MQ",
          iso_3166_1_alpha3_code: "MTQ",
          english_short_name: "Martinique",
          country_id: 141
        },
        {
          iso_3166_1_alpha2_code: "MR",
          iso_3166_1_alpha3_code: "MRT",
          english_short_name: "Mauritania",
          country_id: 142
        },
        {
          iso_3166_1_alpha2_code: "MU",
          iso_3166_1_alpha3_code: "MUS",
          english_short_name: "Mauritius",
          country_id: 143
        },
        {
          iso_3166_1_alpha2_code: "YT",
          iso_3166_1_alpha3_code: "MYT",
          english_short_name: "Mayotte",
          country_id: 144
        },
        {
          iso_3166_1_alpha2_code: "MX",
          iso_3166_1_alpha3_code: "MEX",
          english_short_name: "Mexico",
          country_id: 145
        },
        {
          iso_3166_1_alpha2_code: "FM",
          iso_3166_1_alpha3_code: "FSM",
          english_short_name: "Micronesia (Federated States of)",
          country_id: 146
        },
        {
          iso_3166_1_alpha2_code: "MD",
          iso_3166_1_alpha3_code: "MDA",
          english_short_name: "Moldova (Republic of)",
          country_id: 147
        },
        {
          iso_3166_1_alpha2_code: "MC",
          iso_3166_1_alpha3_code: "MCO",
          english_short_name: "Monaco",
          country_id: 148
        },
        {
          iso_3166_1_alpha2_code: "MN",
          iso_3166_1_alpha3_code: "MNG",
          english_short_name: "Mongolia",
          country_id: 149
        },
        {
          iso_3166_1_alpha2_code: "ME",
          iso_3166_1_alpha3_code: "MNE",
          english_short_name: "Montenegro",
          country_id: 150
        },
        {
          iso_3166_1_alpha2_code: "MS",
          iso_3166_1_alpha3_code: "MSR",
          english_short_name: "Montserrat",
          country_id: 151
        },
        {
          iso_3166_1_alpha2_code: "MA",
          iso_3166_1_alpha3_code: "MAR",
          english_short_name: "Morocco",
          country_id: 152
        },
        {
          iso_3166_1_alpha2_code: "MZ",
          iso_3166_1_alpha3_code: "MOZ",
          english_short_name: "Mozambique",
          country_id: 153
        },
        {
          iso_3166_1_alpha2_code: "MM",
          iso_3166_1_alpha3_code: "MMR",
          english_short_name: "Myanmar",
          country_id: 154
        },
        {
          iso_3166_1_alpha2_code: "NA",
          iso_3166_1_alpha3_code: "NAM",
          english_short_name: "Namibia",
          country_id: 155
        },
        {
          iso_3166_1_alpha2_code: "NR",
          iso_3166_1_alpha3_code: "NRU",
          english_short_name: "Nauru",
          country_id: 156
        },
        {
          iso_3166_1_alpha2_code: "NP",
          iso_3166_1_alpha3_code: "NPL",
          english_short_name: "Nepal",
          country_id: 157
        },
        {
          iso_3166_1_alpha2_code: "NL",
          iso_3166_1_alpha3_code: "NLD",
          english_short_name: "Netherlands",
          country_id: 158
        },
        {
          iso_3166_1_alpha2_code: "NC",
          iso_3166_1_alpha3_code: "NCL",
          english_short_name: "New Caledonia",
          country_id: 159
        },
        {
          iso_3166_1_alpha2_code: "NZ",
          iso_3166_1_alpha3_code: "NZL",
          english_short_name: "New Zealand",
          country_id: 160
        },
        {
          iso_3166_1_alpha2_code: "NI",
          iso_3166_1_alpha3_code: "NIC",
          english_short_name: "Nicaragua",
          country_id: 161
        },
        {
          iso_3166_1_alpha2_code: "NE",
          iso_3166_1_alpha3_code: "NER",
          english_short_name: "Niger",
          country_id: 162
        },
        {
          iso_3166_1_alpha2_code: "NG",
          iso_3166_1_alpha3_code: "NGA",
          english_short_name: "Nigeria",
          country_id: 163
        },
        {
          iso_3166_1_alpha2_code: "NU",
          iso_3166_1_alpha3_code: "NIU",
          english_short_name: "Niue",
          country_id: 164
        },
        {
          iso_3166_1_alpha2_code: "NF",
          iso_3166_1_alpha3_code: "NFK",
          english_short_name: "Norfolk Island",
          country_id: 165
        },
        {
          iso_3166_1_alpha2_code: "KP",
          iso_3166_1_alpha3_code: "PRK",
          english_short_name: "Korea (Democratic People's Republic of)",
          country_id: 166
        },
        {
          iso_3166_1_alpha2_code: "MP",
          iso_3166_1_alpha3_code: "MNP",
          english_short_name: "Northern Mariana Islands",
          country_id: 167
        },
        {
          iso_3166_1_alpha2_code: "NO",
          iso_3166_1_alpha3_code: "NOR",
          english_short_name: "Norway",
          country_id: 168
        },
        {
          iso_3166_1_alpha2_code: "OM",
          iso_3166_1_alpha3_code: "OMN",
          english_short_name: "Oman",
          country_id: 169
        },
        {
          iso_3166_1_alpha2_code: "PK",
          iso_3166_1_alpha3_code: "PAK",
          english_short_name: "Pakistan",
          country_id: 170
        },
        {
          iso_3166_1_alpha2_code: "PW",
          iso_3166_1_alpha3_code: "PLW",
          english_short_name: "Palau",
          country_id: 171
        },
        {
          iso_3166_1_alpha2_code: "PS",
          iso_3166_1_alpha3_code: "PSE",
          english_short_name: "Palestine, State of",
          country_id: 172
        },
        {
          iso_3166_1_alpha2_code: "PA",
          iso_3166_1_alpha3_code: "PAN",
          english_short_name: "Panama",
          country_id: 173
        },
        {
          iso_3166_1_alpha2_code: "PG",
          iso_3166_1_alpha3_code: "PNG",
          english_short_name: "Papua New Guinea",
          country_id: 174
        },
        {
          iso_3166_1_alpha2_code: "PY",
          iso_3166_1_alpha3_code: "PRY",
          english_short_name: "Paraguay",
          country_id: 175
        },
        {
          iso_3166_1_alpha2_code: "PE",
          iso_3166_1_alpha3_code: "PER",
          english_short_name: "Peru",
          country_id: 176
        },
        {
          iso_3166_1_alpha2_code: "PH",
          iso_3166_1_alpha3_code: "PHL",
          english_short_name: "Philippines",
          country_id: 177
        },
        {
          iso_3166_1_alpha2_code: "PN",
          iso_3166_1_alpha3_code: "PCN",
          english_short_name: "Pitcairn",
          country_id: 178
        },
        {
          iso_3166_1_alpha2_code: "PL",
          iso_3166_1_alpha3_code: "POL",
          english_short_name: "Poland",
          country_id: 179
        },
        {
          iso_3166_1_alpha2_code: "PT",
          iso_3166_1_alpha3_code: "PRT",
          english_short_name: "Portugal",
          country_id: 180
        },
        {
          iso_3166_1_alpha2_code: "PR",
          iso_3166_1_alpha3_code: "PRI",
          english_short_name: "Puerto Rico",
          country_id: 181
        },
        {
          iso_3166_1_alpha2_code: "QA",
          iso_3166_1_alpha3_code: "QAT",
          english_short_name: "Qatar",
          country_id: 182
        },
        {
          iso_3166_1_alpha2_code: "XK",
          iso_3166_1_alpha3_code: "KOS",
          english_short_name: "Republic of Kosovo",
          country_id: 183
        },
        {
          iso_3166_1_alpha2_code: "RE",
          iso_3166_1_alpha3_code: "REU",
          english_short_name: "Réunion",
          country_id: 184
        },
        {
          iso_3166_1_alpha2_code: "RO",
          iso_3166_1_alpha3_code: "ROU",
          english_short_name: "Romania",
          country_id: 185
        },
        {
          iso_3166_1_alpha2_code: "RU",
          iso_3166_1_alpha3_code: "RUS",
          english_short_name: "Russian Federation",
          country_id: 186
        },
        {
          iso_3166_1_alpha2_code: "RW",
          iso_3166_1_alpha3_code: "RWA",
          english_short_name: "Rwanda",
          country_id: 187
        },
        {
          iso_3166_1_alpha2_code: "BL",
          iso_3166_1_alpha3_code: "BLM",
          english_short_name: "Saint Barthélemy",
          country_id: 188
        },
        {
          iso_3166_1_alpha2_code: "SH",
          iso_3166_1_alpha3_code: "SHN",
          english_short_name: "Saint Helena, Ascension and Tristan da Cunha",
          country_id: 189
        },
        {
          iso_3166_1_alpha2_code: "KN",
          iso_3166_1_alpha3_code: "KNA",
          english_short_name: "Saint Kitts and Nevis",
          country_id: 190
        },
        {
          iso_3166_1_alpha2_code: "LC",
          iso_3166_1_alpha3_code: "LCA",
          english_short_name: "Saint Lucia",
          country_id: 191
        },
        {
          iso_3166_1_alpha2_code: "MF",
          iso_3166_1_alpha3_code: "MAF",
          english_short_name: "Saint Martin (French part)",
          country_id: 192
        },
        {
          iso_3166_1_alpha2_code: "PM",
          iso_3166_1_alpha3_code: "SPM",
          english_short_name: "Saint Pierre and Miquelon",
          country_id: 193
        },
        {
          iso_3166_1_alpha2_code: "VC",
          iso_3166_1_alpha3_code: "VCT",
          english_short_name: "Saint Vincent and the Grenadines",
          country_id: 194
        },
        {
          iso_3166_1_alpha2_code: "WS",
          iso_3166_1_alpha3_code: "WSM",
          english_short_name: "Samoa",
          country_id: 195
        },
        {
          iso_3166_1_alpha2_code: "SM",
          iso_3166_1_alpha3_code: "SMR",
          english_short_name: "San Marino",
          country_id: 196
        },
        {
          iso_3166_1_alpha2_code: "ST",
          iso_3166_1_alpha3_code: "STP",
          english_short_name: "Sao Tome and Principe",
          country_id: 197
        },
        {
          iso_3166_1_alpha2_code: "SA",
          iso_3166_1_alpha3_code: "SAU",
          english_short_name: "Saudi Arabia",
          country_id: 198
        },
        {
          iso_3166_1_alpha2_code: "SN",
          iso_3166_1_alpha3_code: "SEN",
          english_short_name: "Senegal",
          country_id: 199
        },
        {
          iso_3166_1_alpha2_code: "RS",
          iso_3166_1_alpha3_code: "SRB",
          english_short_name: "Serbia",
          country_id: 200
        },
        {
          iso_3166_1_alpha2_code: "SC",
          iso_3166_1_alpha3_code: "SYC",
          english_short_name: "Seychelles",
          country_id: 201
        },
        {
          iso_3166_1_alpha2_code: "SL",
          iso_3166_1_alpha3_code: "SLE",
          english_short_name: "Sierra Leone",
          country_id: 202
        },
        {
          iso_3166_1_alpha2_code: "SG",
          iso_3166_1_alpha3_code: "SGP",
          english_short_name: "Singapore",
          country_id: 203
        },
        {
          iso_3166_1_alpha2_code: "SX",
          iso_3166_1_alpha3_code: "SXM",
          english_short_name: "Sint Maarten (Dutch part)",
          country_id: 204
        },
        {
          iso_3166_1_alpha2_code: "SK",
          iso_3166_1_alpha3_code: "SVK",
          english_short_name: "Slovakia",
          country_id: 205
        },
        {
          iso_3166_1_alpha2_code: "SI",
          iso_3166_1_alpha3_code: "SVN",
          english_short_name: "Slovenia",
          country_id: 206
        },
        {
          iso_3166_1_alpha2_code: "SB",
          iso_3166_1_alpha3_code: "SLB",
          english_short_name: "Solomon Islands",
          country_id: 207
        },
        {
          iso_3166_1_alpha2_code: "SO",
          iso_3166_1_alpha3_code: "SOM",
          english_short_name: "Somalia",
          country_id: 208
        },
        {
          iso_3166_1_alpha2_code: "ZA",
          iso_3166_1_alpha3_code: "ZAF",
          english_short_name: "South Africa",
          country_id: 209
        },
        {
          iso_3166_1_alpha2_code: "GS",
          iso_3166_1_alpha3_code: "SGS",
          english_short_name: "South Georgia and the South Sandwich Islands",
          country_id: 210
        },
        {
          iso_3166_1_alpha2_code: "KR",
          iso_3166_1_alpha3_code: "KOR",
          english_short_name: "Korea (Republic of)",
          country_id: 211
        },
        {
          iso_3166_1_alpha2_code: "SS",
          iso_3166_1_alpha3_code: "SSD",
          english_short_name: "South Sudan",
          country_id: 212
        },
        {
          iso_3166_1_alpha2_code: "ES",
          iso_3166_1_alpha3_code: "ESP",
          english_short_name: "Spain",
          country_id: 213
        },
        {
          iso_3166_1_alpha2_code: "LK",
          iso_3166_1_alpha3_code: "LKA",
          english_short_name: "Sri Lanka",
          country_id: 214
        },
        {
          iso_3166_1_alpha2_code: "SD",
          iso_3166_1_alpha3_code: "SDN",
          english_short_name: "Sudan",
          country_id: 215
        },
        {
          iso_3166_1_alpha2_code: "SR",
          iso_3166_1_alpha3_code: "SUR",
          english_short_name: "Suriname",
          country_id: 216
        },
        {
          iso_3166_1_alpha2_code: "SJ",
          iso_3166_1_alpha3_code: "SJM",
          english_short_name: "Svalbard and Jan Mayen",
          country_id: 217
        },
        {
          iso_3166_1_alpha2_code: "SZ",
          iso_3166_1_alpha3_code: "SWZ",
          english_short_name: "Swaziland",
          country_id: 218
        },
        {
          iso_3166_1_alpha2_code: "SE",
          iso_3166_1_alpha3_code: "SWE",
          english_short_name: "Sweden",
          country_id: 219
        },
        {
          iso_3166_1_alpha2_code: "CH",
          iso_3166_1_alpha3_code: "CHE",
          english_short_name: "Switzerland",
          country_id: 220
        },
        {
          iso_3166_1_alpha2_code: "SY",
          iso_3166_1_alpha3_code: "SYR",
          english_short_name: "Syrian Arab Republic",
          country_id: 221
        },
        {
          iso_3166_1_alpha2_code: "TW",
          iso_3166_1_alpha3_code: "TWN",
          english_short_name: "Taiwan",
          country_id: 222
        },
        {
          iso_3166_1_alpha2_code: "TJ",
          iso_3166_1_alpha3_code: "TJK",
          english_short_name: "Tajikistan",
          country_id: 223
        },
        {
          iso_3166_1_alpha2_code: "TZ",
          iso_3166_1_alpha3_code: "TZA",
          english_short_name: "Tanzania, United Republic of",
          country_id: 224
        },
        {
          iso_3166_1_alpha2_code: "TH",
          iso_3166_1_alpha3_code: "THA",
          english_short_name: "Thailand",
          country_id: 225
        },
        {
          iso_3166_1_alpha2_code: "TL",
          iso_3166_1_alpha3_code: "TLS",
          english_short_name: "Timor-Leste",
          country_id: 226
        },
        {
          iso_3166_1_alpha2_code: "TG",
          iso_3166_1_alpha3_code: "TGO",
          english_short_name: "Togo",
          country_id: 227
        },
        {
          iso_3166_1_alpha2_code: "TK",
          iso_3166_1_alpha3_code: "TKL",
          english_short_name: "Tokelau",
          country_id: 228
        },
        {
          iso_3166_1_alpha2_code: "TO",
          iso_3166_1_alpha3_code: "TON",
          english_short_name: "Tonga",
          country_id: 229
        },
        {
          iso_3166_1_alpha2_code: "TT",
          iso_3166_1_alpha3_code: "TTO",
          english_short_name: "Trinidad and Tobago",
          country_id: 230
        },
        {
          iso_3166_1_alpha2_code: "TN",
          iso_3166_1_alpha3_code: "TUN",
          english_short_name: "Tunisia",
          country_id: 231
        },
        {
          iso_3166_1_alpha2_code: "TR",
          iso_3166_1_alpha3_code: "TUR",
          english_short_name: "Turkey",
          country_id: 232
        },
        {
          iso_3166_1_alpha2_code: "TM",
          iso_3166_1_alpha3_code: "TKM",
          english_short_name: "Turkmenistan",
          country_id: 233
        },
        {
          iso_3166_1_alpha2_code: "TC",
          iso_3166_1_alpha3_code: "TCA",
          english_short_name: "Turks and Caicos Islands",
          country_id: 234
        },
        {
          iso_3166_1_alpha2_code: "TV",
          iso_3166_1_alpha3_code: "TUV",
          english_short_name: "Tuvalu",
          country_id: 235
        },
        {
          iso_3166_1_alpha2_code: "UG",
          iso_3166_1_alpha3_code: "UGA",
          english_short_name: "Uganda",
          country_id: 236
        },
        {
          iso_3166_1_alpha2_code: "UA",
          iso_3166_1_alpha3_code: "UKR",
          english_short_name: "Ukraine",
          country_id: 237
        },
        {
          iso_3166_1_alpha2_code: "AE",
          iso_3166_1_alpha3_code: "ARE",
          english_short_name: "United Arab Emirates",
          country_id: 238
        },
        {
          iso_3166_1_alpha2_code: "GB",
          iso_3166_1_alpha3_code: "GBR",
          english_short_name: "United Kingdom of Great Britain and Northern Ireland",
          country_id: 239
        },
        {
          iso_3166_1_alpha2_code: "US",
          iso_3166_1_alpha3_code: "USA",
          english_short_name: "United States of America",
          country_id: 240
        },
        {
          iso_3166_1_alpha2_code: "UY",
          iso_3166_1_alpha3_code: "URY",
          english_short_name: "Uruguay",
          country_id: 241
        },
        {
          iso_3166_1_alpha2_code: "UZ",
          iso_3166_1_alpha3_code: "UZB",
          english_short_name: "Uzbekistan",
          country_id: 242
        },
        {
          iso_3166_1_alpha2_code: "VU",
          iso_3166_1_alpha3_code: "VUT",
          english_short_name: "Vanuatu",
          country_id: 243
        },
        {
          iso_3166_1_alpha2_code: "VE",
          iso_3166_1_alpha3_code: "VEN",
          english_short_name: "Venezuela (Bolivarian Republic of)",
          country_id: 244
        },
        {
          iso_3166_1_alpha2_code: "VN",
          iso_3166_1_alpha3_code: "VNM",
          english_short_name: "Viet Nam",
          country_id: 245
        },
        {
          iso_3166_1_alpha2_code: "WF",
          iso_3166_1_alpha3_code: "WLF",
          english_short_name: "Wallis and Futuna",
          country_id: 246
        },
        {
          iso_3166_1_alpha2_code: "EH",
          iso_3166_1_alpha3_code: "ESH",
          english_short_name: "Western Sahara",
          country_id: 247
        },
        {
          iso_3166_1_alpha2_code: "YE",
          iso_3166_1_alpha3_code: "YEM",
          english_short_name: "Yemen",
          country_id: 248
        },
        {
          iso_3166_1_alpha2_code: "ZM",
          iso_3166_1_alpha3_code: "ZMB",
          english_short_name: "Zambia",
          country_id: 249
        },
        {
          iso_3166_1_alpha2_code: "ZW",
          iso_3166_1_alpha3_code: "ZWE",
          english_short_name: "Zimbabwe",
          country_id: 250
        }
      ]);
    });
};
