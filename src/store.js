import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  countries: [
    { value: '1', text: 'Afghanistan' },
    { value: '2', text: 'Åland Islands' },
    { value: '3', text: 'Albania' },
    { value: '4', text: 'Algeria' },
    { value: '5', text: 'American Samoa' },
    { value: '6', text: 'Andorra' },
    { value: '7', text: 'Angola' },
    { value: '8', text: 'Anguilla' },
    { value: '9', text: 'Antarctica' },
    { value: '10', text: 'Antigua and Barbuda' },
    { value: '11', text: 'Argentina' },
    { value: '12', text: 'Armenia' },
    { value: '13', text: 'Aruba' },
    { value: '14', text: 'Australia' },
    { value: '15', text: 'Austria' },
    { value: '16', text: 'Azerbaijan' },
    { value: '17', text: 'Bahamas' },
    { value: '18', text: 'Bahrain' },
    { value: '19', text: 'Bangladesh' },
    { value: '20', text: 'Barbados' },
    { value: '21', text: 'Belarus' },
    { value: '22', text: 'Belgium' },
    { value: '23', text: 'Belize' },
    { value: '24', text: 'Benin' },
    { value: '25', text: 'Bermuda' },
    { value: '26', text: 'Bhutan' },
    { value: '27', text: 'Bolivia (Plurinational State of)' },
    { value: '28', text: 'Bonaire, Sint Eustatius and Saba' },
    { value: '29', text: 'Bosnia and Herzegovina' },
    { value: '30', text: 'Botswana' },
    { value: '31', text: 'Bouvet Island' },
    { value: '32', text: 'Brazil' },
    { value: '33', text: 'British Indian Ocean Territory' },
    { value: '37', text: 'Brunei Darussalam' },
    { value: '38', text: 'Bulgaria' },
    { value: '39', text: 'Burkina Faso' },
    { value: '40', text: 'Burundi' },
    { value: '44', text: 'Cabo Verde' },
    { value: '41', text: 'Cambodia' },
    { value: '42', text: 'Cameroon' },
    { value: '43', text: 'Canada' },
    { value: '45', text: 'Cayman Islands' },
    { value: '46', text: 'Central African Republic' },
    { value: '47', text: 'Chad' },
    { value: '48', text: 'Chile' },
    { value: '49', text: 'China' },
    { value: '50', text: 'Christmas Island' },
    { value: '51', text: 'Cocos (Keeling) Islands' },
    { value: '52', text: 'Colombia' },
    { value: '53', text: 'Comoros' },
    { value: '54', text: 'Congo' },
    { value: '55', text: 'Congo (Democratic Republic of the)' },
    { value: '56', text: 'Cook Islands' },
    { value: '57', text: 'Costa Rica' },
    { value: '58', text: 'Croatia' },
    { value: '59', text: 'Cuba' },
    { value: '60', text: 'Curaçao' },
    { value: '61', text: 'Cyprus' },
    { value: '62', text: 'Czech Republic' },
    { value: '107', text: 'Côte d\'Ivoire' },
    { value: '63', text: 'Denmark' },
    { value: '64', text: 'Djibouti' },
    { value: '65', text: 'Dominica' },
    { value: '66', text: 'Dominican Republic' },
    { value: '67', text: 'Ecuador' },
    { value: '68', text: 'Egypt' },
    { value: '69', text: 'El Salvador' },
    { value: '70', text: 'Equatorial Guinea' },
    { value: '71', text: 'Eritrea' },
    { value: '72', text: 'Estonia' },
    { value: '73', text: 'Ethiopia' },
    { value: '74', text: 'Falkland Islands (Malvinas)' },
    { value: '75', text: 'Faroe Islands' },
    { value: '76', text: 'Fiji' },
    { value: '77', text: 'Finland' },
    { value: '78', text: 'France' },
    { value: '79', text: 'French Guiana' },
    { value: '80', text: 'French Polynesia' },
    { value: '81', text: 'French Southern Territories' },
    { value: '82', text: 'Gabon' },
    { value: '83', text: 'Gambia' },
    { value: '84', text: 'Georgia' },
    { value: '85', text: 'Germany' },
    { value: '86', text: 'Ghana' },
    { value: '87', text: 'Gibraltar' },
    { value: '88', text: 'Greece' },
    { value: '89', text: 'Greenland' },
    { value: '90', text: 'Grenada' },
    { value: '91', text: 'Guadeloupe' },
    { value: '92', text: 'Guam' },
    { value: '93', text: 'Guatemala' },
    { value: '94', text: 'Guernsey' },
    { value: '95', text: 'Guinea' },
    { value: '96', text: 'Guinea-Bissau' },
    { value: '97', text: 'Guyana' },
    { value: '98', text: 'Haiti' },
    { value: '99', text: 'Heard Island and McDonald Islands' },
    { value: '100', text: 'Holy See' },
    { value: '101', text: 'Honduras' },
    { value: '102', text: 'Hong Kong' },
    { value: '103', text: 'Hungary' },
    { value: '104', text: 'Iceland' },
    { value: '105', text: 'India' },
    { value: '106', text: 'Indonesia' },
    { value: '108', text: 'Iran (Islamic Republic of)' },
    { value: '109', text: 'Iraq' },
    { value: '110', text: 'Ireland' },
    { value: '111', text: 'Isle of Man' },
    { value: '112', text: 'Israel' },
    { value: '113', text: 'Italy' },
    { value: '114', text: 'Jamaica' },
    { value: '115', text: 'Japan' },
    { value: '116', text: 'Jersey' },
    { value: '117', text: 'Jordan' },
    { value: '118', text: 'Kazakhstan' },
    { value: '119', text: 'Kenya' },
    { value: '120', text: 'Kiribati' },
    { value: '166', text: 'Korea (Democratic People\'s Republic of)' },
    { value: '211', text: 'Korea (Republic of)' },
    { value: '121', text: 'Kuwait' },
    { value: '122', text: 'Kyrgyzstan' },
    { value: '123', text: 'Lao People\'s Democratic Republic' },
    { value: '124', text: 'Latvia' },
    { value: '125', text: 'Lebanon' },
    { value: '126', text: 'Lesotho' },
    { value: '127', text: 'Liberia' },
    { value: '128', text: 'Libya' },
    { value: '129', text: 'Liechtenstein' },
    { value: '130', text: 'Lithuania' },
    { value: '131', text: 'Luxembourg' },
    { value: '132', text: 'Macao' },
    { value: '133', text: 'Macedonia (the former Yugoslav Republic of)' },
    { value: '134', text: 'Madagascar' },
    { value: '135', text: 'Malawi' },
    { value: '136', text: 'Malaysia' },
    { value: '137', text: 'Maldives' },
    { value: '138', text: 'Mali' },
    { value: '139', text: 'Malta' },
    { value: '140', text: 'Marshall Islands' },
    { value: '141', text: 'Martinique' },
    { value: '142', text: 'Mauritania' },
    { value: '143', text: 'Mauritius' },
    { value: '144', text: 'Mayotte' },
    { value: '145', text: 'Mexico' },
    { value: '146', text: 'Micronesia (Federated States of)' },
    { value: '147', text: 'Moldova (Republic of)' },
    { value: '148', text: 'Monaco' },
    { value: '149', text: 'Mongolia' },
    { value: '150', text: 'Montenegro' },
    { value: '151', text: 'Montserrat' },
    { value: '152', text: 'Morocco' },
    { value: '153', text: 'Mozambique' },
    { value: '154', text: 'Myanmar' },
    { value: '155', text: 'Namibia' },
    { value: '156', text: 'Nauru' },
    { value: '157', text: 'Nepal' },
    { value: '158', text: 'Netherlands' },
    { value: '159', text: 'New Caledonia' },
    { value: '160', text: 'New Zealand' },
    { value: '161', text: 'Nicaragua' },
    { value: '162', text: 'Niger' },
    { value: '163', text: 'Nigeria' },
    { value: '164', text: 'Niue' },
    { value: '165', text: 'Norfolk Island' },
    { value: '167', text: 'Northern Mariana Islands' },
    { value: '168', text: 'Norway' },
    { value: '169', text: 'Oman' },
    { value: '170', text: 'Pakistan' },
    { value: '171', text: 'Palau' },
    { value: '172', text: 'Palestine, State of' },
    { value: '173', text: 'Panama' },
    { value: '174', text: 'Papua New Guinea' },
    { value: '175', text: 'Paraguay' },
    { value: '176', text: 'Peru' },
    { value: '177', text: 'Philippines' },
    { value: '178', text: 'Pitcairn' },
    { value: '179', text: 'Poland' },
    { value: '180', text: 'Portugal' },
    { value: '181', text: 'Puerto Rico' },
    { value: '182', text: 'Qatar' },
    { value: '183', text: 'Republic of Kosovo' },
    { value: '185', text: 'Romania' },
    { value: '186', text: 'Russian Federation' },
    { value: '187', text: 'Rwanda' },
    { value: '184', text: 'Réunion' },
    { value: '188', text: 'Saint Barthélemy' },
    { value: '189', text: 'Saint Helena, Ascension and Tristan da Cunha' },
    { value: '190', text: 'Saint Kitts and Nevis' },
    { value: '191', text: 'Saint Lucia' },
    { value: '192', text: 'Saint Martin (French part)' },
    { value: '193', text: 'Saint Pierre and Miquelon' },
    { value: '194', text: 'Saint Vincent and the Grenadines' },
    { value: '195', text: 'Samoa' },
    { value: '196', text: 'San Marino' },
    { value: '197', text: 'Sao Tome and Principe' },
    { value: '198', text: 'Saudi Arabia' },
    { value: '199', text: 'Senegal' },
    { value: '200', text: 'Serbia' },
    { value: '201', text: 'Seychelles' },
    { value: '202', text: 'Sierra Leone' },
    { value: '203', text: 'Singapore' },
    { value: '204', text: 'Sint Maarten (Dutch part)' },
    { value: '205', text: 'Slovakia' },
    { value: '206', text: 'Slovenia' },
    { value: '207', text: 'Solomon Islands' },
    { value: '208', text: 'Somalia' },
    { value: '209', text: 'South Africa' },
    { value: '210', text: 'South Georgia and the South Sandwich Islands' },
    { value: '212', text: 'South Sudan' },
    { value: '213', text: 'Spain' },
    { value: '214', text: 'Sri Lanka' },
    { value: '215', text: 'Sudan' },
    { value: '216', text: 'Suriname' },
    { value: '217', text: 'Svalbard and Jan Mayen' },
    { value: '218', text: 'Swaziland' },
    { value: '219', text: 'Sweden' },
    { value: '220', text: 'Switzerland' },
    { value: '221', text: 'Syrian Arab Republic' },
    { value: '222', text: 'Taiwan' },
    { value: '223', text: 'Tajikistan' },
    { value: '224', text: 'Tanzania, United Republic of' },
    { value: '225', text: 'Thailand' },
    { value: '226', text: 'Timor-Leste' },
    { value: '227', text: 'Togo' },
    { value: '228', text: 'Tokelau' },
    { value: '229', text: 'Tonga' },
    { value: '230', text: 'Trinidad and Tobago' },
    { value: '231', text: 'Tunisia' },
    { value: '232', text: 'Turkey' },
    { value: '233', text: 'Turkmenistan' },
    { value: '234', text: 'Turks and Caicos Islands' },
    { value: '235', text: 'Tuvalu' },
    { value: '236', text: 'Uganda' },
    { value: '237', text: 'Ukraine' },
    { value: '238', text: 'United Arab Emirates' },
    { value: '239', text: 'United Kingdom of Great Britain and Northern Ireland' },
    { value: '34', text: 'United States Minor Outlying Islands' },
    { value: '240', text: 'United States of America' },
    { value: '241', text: 'Uruguay' },
    { value: '242', text: 'Uzbekistan' },
    { value: '243', text: 'Vanuatu' },
    { value: '244', text: 'Venezuela (Bolivarian Republic of)' },
    { value: '245', text: 'Viet Nam' },
    { value: '35', text: 'Virgin Islands (British)' },
    { value: '36', text: 'Virgin Islands (U.S.)' },
    { value: '246', text: 'Wallis and Futuna' },
    { value: '247', text: 'Western Sahara' },
    { value: '248', text: 'Yemen' },
    { value: '249', text: 'Zambia' },
    { value: '250', text: 'Zimbabwe' },
  ],
}

// getters are functions
const getters = {
  countries: state => { return state.countries }
}

export default new Vuex.Store({
  state,
  getters,
  actions: {},
  mutations: {},
});
