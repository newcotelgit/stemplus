import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight, Mail, X, Calendar as CalendarIcon, Clock, Search, Globe } from "lucide-react";

const INDIGO = "#03045E";
const TEAL = "#02C39A";

// Zoho Bookings portal base URL — prefilled params are appended at runtime.
const ZOHO_BASE_URL = "https://newcoteltradeltd.zohobookings.com/portal-embed#/4944664000000040045";
const ZOHO_EMBED_SCRIPT = "https://bookings.nimbuspop.com/assets/embed.js";

const CONCERNS = [
  "Erectile Dysfunction & Urological Recovery",
  "Neurology & Stroke Rehabilitation",
  "Autism Spectrum Protocols",
  "Autoimmune & Systemic Renewal",
  "Cellular Rejuvenation & Longevity",
  "Diabetes & Metabolic Repair",
  "Orthopedic Spine & Joint Regeneration",
  "Other / Not Listed",
];

const TIMELINES = [
  "As soon as possible (Within 30 days)",
  "Next 2–3 months",
  "Just gathering information for future travel",
];

const DIAGNOSIS = ["Yes", "No", "In Progress"] as const;

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia",
  "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
  "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe",
];

// Full ISO country dial codes (alphabetized by name)
const DIAL_CODES: { code: string; name: string; dial: string; flag: string }[] = [
  { code: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { code: "AS", name: "American Samoa", dial: "+1684", flag: "🇦🇸" },
  { code: "AD", name: "Andorra", dial: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dial: "+244", flag: "🇦🇴" },
  { code: "AI", name: "Anguilla", dial: "+1264", flag: "🇦🇮" },
  { code: "AG", name: "Antigua and Barbuda", dial: "+1268", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dial: "+374", flag: "🇦🇲" },
  { code: "AW", name: "Aruba", dial: "+297", flag: "🇦🇼" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dial: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dial: "+1242", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", dial: "+1246", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", dial: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", dial: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", dial: "+229", flag: "🇧🇯" },
  { code: "BM", name: "Bermuda", dial: "+1441", flag: "🇧🇲" },
  { code: "BT", name: "Bhutan", dial: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", dial: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", dial: "+267", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "IO", name: "British Indian Ocean Territory", dial: "+246", flag: "🇮🇴" },
  { code: "VG", name: "British Virgin Islands", dial: "+1284", flag: "🇻🇬" },
  { code: "BN", name: "Brunei", dial: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", dial: "+359", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dial: "+257", flag: "🇧🇮" },
  { code: "KH", name: "Cambodia", dial: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", dial: "+237", flag: "🇨🇲" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "CV", name: "Cape Verde", dial: "+238", flag: "🇨🇻" },
  { code: "KY", name: "Cayman Islands", dial: "+1345", flag: "🇰🇾" },
  { code: "CF", name: "Central African Republic", dial: "+236", flag: "🇨🇫" },
  { code: "TD", name: "Chad", dial: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "KM", name: "Comoros", dial: "+269", flag: "🇰🇲" },
  { code: "CK", name: "Cook Islands", dial: "+682", flag: "🇨🇰" },
  { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { code: "HR", name: "Croatia", dial: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { code: "CW", name: "Curaçao", dial: "+599", flag: "🇨🇼" },
  { code: "CY", name: "Cyprus", dial: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "CD", name: "Democratic Republic of the Congo", dial: "+243", flag: "🇨🇩" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", dial: "+253", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", dial: "+1767", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dial: "+1809", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dial: "+503", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", dial: "+240", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", dial: "+291", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", dial: "+372", flag: "🇪🇪" },
  { code: "SZ", name: "Eswatini", dial: "+268", flag: "🇸🇿" },
  { code: "ET", name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { code: "FK", name: "Falkland Islands", dial: "+500", flag: "🇫🇰" },
  { code: "FO", name: "Faroe Islands", dial: "+298", flag: "🇫🇴" },
  { code: "FJ", name: "Fiji", dial: "+679", flag: "🇫🇯" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "GF", name: "French Guiana", dial: "+594", flag: "🇬🇫" },
  { code: "PF", name: "French Polynesia", dial: "+689", flag: "🇵🇫" },
  { code: "GA", name: "Gabon", dial: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", dial: "+220", flag: "🇬🇲" },
  { code: "GE", name: "Georgia", dial: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", dial: "+350", flag: "🇬🇮" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "GL", name: "Greenland", dial: "+299", flag: "🇬🇱" },
  { code: "GD", name: "Grenada", dial: "+1473", flag: "🇬🇩" },
  { code: "GP", name: "Guadeloupe", dial: "+590", flag: "🇬🇵" },
  { code: "GU", name: "Guam", dial: "+1671", flag: "🇬🇺" },
  { code: "GT", name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { code: "GG", name: "Guernsey", dial: "+44", flag: "🇬🇬" },
  { code: "GN", name: "Guinea", dial: "+224", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", dial: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dial: "+592", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", dial: "+504", flag: "🇭🇳" },
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", dial: "+354", flag: "🇮🇸" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IM", name: "Isle of Man", dial: "+44", flag: "🇮🇲" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "CI", name: "Ivory Coast", dial: "+225", flag: "🇨🇮" },
  { code: "JM", name: "Jamaica", dial: "+1876", flag: "🇯🇲" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "JE", name: "Jersey", dial: "+44", flag: "🇯🇪" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", dial: "+7", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "KI", name: "Kiribati", dial: "+686", flag: "🇰🇮" },
  { code: "XK", name: "Kosovo", dial: "+383", flag: "🇽🇰" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", dial: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos", dial: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", dial: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", dial: "+266", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", dial: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Libya", dial: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", dial: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", dial: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { code: "MO", name: "Macau", dial: "+853", flag: "🇲🇴" },
  { code: "MG", name: "Madagascar", dial: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", dial: "+265", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", dial: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", dial: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", dial: "+356", flag: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", dial: "+692", flag: "🇲🇭" },
  { code: "MQ", name: "Martinique", dial: "+596", flag: "🇲🇶" },
  { code: "MR", name: "Mauritania", dial: "+222", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", dial: "+230", flag: "🇲🇺" },
  { code: "YT", name: "Mayotte", dial: "+262", flag: "🇾🇹" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "FM", name: "Micronesia", dial: "+691", flag: "🇫🇲" },
  { code: "MD", name: "Moldova", dial: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", dial: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", dial: "+382", flag: "🇲🇪" },
  { code: "MS", name: "Montserrat", dial: "+1664", flag: "🇲🇸" },
  { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", dial: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", dial: "+95", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", dial: "+264", flag: "🇳🇦" },
  { code: "NR", name: "Nauru", dial: "+674", flag: "🇳🇷" },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NC", name: "New Caledonia", dial: "+687", flag: "🇳🇨" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dial: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Niger", dial: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "NU", name: "Niue", dial: "+683", flag: "🇳🇺" },
  { code: "KP", name: "North Korea", dial: "+850", flag: "🇰🇵" },
  { code: "MK", name: "North Macedonia", dial: "+389", flag: "🇲🇰" },
  { code: "MP", name: "Northern Mariana Islands", dial: "+1670", flag: "🇲🇵" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "PW", name: "Palau", dial: "+680", flag: "🇵🇼" },
  { code: "PS", name: "Palestine", dial: "+970", flag: "🇵🇸" },
  { code: "PA", name: "Panama", dial: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", dial: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", dial: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "PR", name: "Puerto Rico", dial: "+1787", flag: "🇵🇷" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "CG", name: "Republic of the Congo", dial: "+242", flag: "🇨🇬" },
  { code: "RE", name: "Réunion", dial: "+262", flag: "🇷🇪" },
  { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dial: "+250", flag: "🇷🇼" },
  { code: "BL", name: "Saint Barthélemy", dial: "+590", flag: "🇧🇱" },
  { code: "SH", name: "Saint Helena", dial: "+290", flag: "🇸🇭" },
  { code: "KN", name: "Saint Kitts and Nevis", dial: "+1869", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", dial: "+1758", flag: "🇱🇨" },
  { code: "MF", name: "Saint Martin", dial: "+590", flag: "🇲🇫" },
  { code: "PM", name: "Saint Pierre and Miquelon", dial: "+508", flag: "🇵🇲" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dial: "+1784", flag: "🇻🇨" },
  { code: "WS", name: "Samoa", dial: "+685", flag: "🇼🇸" },
  { code: "SM", name: "San Marino", dial: "+378", flag: "🇸🇲" },
  { code: "ST", name: "São Tomé and Príncipe", dial: "+239", flag: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", dial: "+248", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", dial: "+232", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "SX", name: "Sint Maarten", dial: "+1721", flag: "🇸🇽" },
  { code: "SK", name: "Slovakia", dial: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", dial: "+386", flag: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", dial: "+677", flag: "🇸🇧" },
  { code: "SO", name: "Somalia", dial: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "SS", name: "South Sudan", dial: "+211", flag: "🇸🇸" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", dial: "+249", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", dial: "+597", flag: "🇸🇷" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dial: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", dial: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", dial: "+670", flag: "🇹🇱" },
  { code: "TG", name: "Togo", dial: "+228", flag: "🇹🇬" },
  { code: "TK", name: "Tokelau", dial: "+690", flag: "🇹🇰" },
  { code: "TO", name: "Tonga", dial: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad and Tobago", dial: "+1868", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", dial: "+993", flag: "🇹🇲" },
  { code: "TC", name: "Turks and Caicos Islands", dial: "+1649", flag: "🇹🇨" },
  { code: "TV", name: "Tuvalu", dial: "+688", flag: "🇹🇻" },
  { code: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dial: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", dial: "+678", flag: "🇻🇺" },
  { code: "VA", name: "Vatican City", dial: "+39", flag: "🇻🇦" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "WF", name: "Wallis and Futuna", dial: "+681", flag: "🇼🇫" },
  { code: "EH", name: "Western Sahara", dial: "+212", flag: "🇪🇭" },
  { code: "YE", name: "Yemen", dial: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dial: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
];

function CountryCodeCombobox({
  value,
  onChange,
  focusRing,
}: {
  value: string;
  onChange: (code: string) => void;
  focusRing: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => DIAL_CODES.find((c) => `${c.code}|${c.dial}` === value),
    [value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
    else setQuery("");
  }, [open]);

  return (
    <div ref={wrapRef} className="relative w-44 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 ${focusRing} transition ${selected ? "text-slate-900" : "text-slate-400"}`}
      >
        <span className="truncate">
          {selected ? (
            <>
              <span className="mr-1">{selected.flag}</span>
              {selected.dial}
            </>
          ) : (
            <>
              <Globe className="inline w-4 h-4 mr-1 -mt-0.5" />
              Select Country Code
            </>
          )}
        </span>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-72 max-w-[80vw] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              className="w-full text-sm outline-none bg-transparent placeholder:text-slate-400"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-400">No matches</li>
            ) : (
              filtered.map((c) => {
                const key = `${c.code}|${c.dial}`;
                const isSel = key === value;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(key);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 ${isSel ? "bg-slate-50" : ""}`}
                    >
                      <span className="text-base leading-none">{c.flag}</span>
                      <span className="flex-1 truncate text-slate-800">{c.name}</span>
                      <span className="text-slate-500 tabular-nums">{c.dial}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const TIMEZONES = [
  "Pacific/Honolulu","America/Anchorage","America/Los_Angeles","America/Denver","America/Chicago","America/New_York",
  "America/Toronto","America/Mexico_City","America/Bogota","America/Sao_Paulo","America/Buenos_Aires",
  "Atlantic/Azores","Europe/London","Europe/Lisbon","Europe/Madrid","Europe/Paris","Europe/Berlin","Europe/Rome",
  "Europe/Amsterdam","Europe/Stockholm","Europe/Warsaw","Europe/Athens","Europe/Istanbul","Europe/Moscow",
  "Asia/Tbilisi","Asia/Dubai","Asia/Tehran","Asia/Karachi","Asia/Kolkata","Asia/Dhaka","Asia/Bangkok",
  "Asia/Singapore","Asia/Hong_Kong","Asia/Shanghai","Asia/Tokyo","Asia/Seoul","Australia/Perth",
  "Australia/Sydney","Pacific/Auckland",
];

const CLINIC_START_HOUR = 9;
const CLINIC_END_HOUR = 18;

function detectTimezone() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tbilisi"; }
  catch { return "Asia/Tbilisi"; }
}
function formatTzLabel(tz: string) {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" });
    const off = dtf.formatToParts(new Date()).find((p) => p.type === "timeZoneName")?.value ?? "";
    return `${tz.replace(/_/g, " ")} (${off})`;
  } catch { return tz; }
}
function tbilisiDateToUTC(y: number, m: number, d: number, h: number, min: number) {
  return new Date(Date.UTC(y, m, d, h - 4, min));
}
function formatInTz(date: Date, tz: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}
function formatDateLong(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

type Step = 1 | 2 | 3 | 4;

export default function BookingSection() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Page 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  // Page 2
  const [concern, setConcern] = useState("");
  const [timeline, setTimeline] = useState("");
  const [diagnosis, setDiagnosis] = useState<typeof DIAGNOSIS[number] | "">("");
  const [notes, setNotes] = useState("");

  // Page 3
  const [userTz, setUserTz] = useState<string>("Asia/Tbilisi");
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => { setUserTz(detectTimezone()); }, []);

  // Load Zoho Bookings embed script and mount the inline widget once Step 3 is reached.
  useEffect(() => {
    if (step !== 3) return;

    const params = new URLSearchParams({
      "Name": fullName,
      "Email": email,
      "Contact Number": `${dialCode} ${phone}`.trim(),
      "Primary Area of Concern": concern,
      "Timeline for Treatment": timeline,
      "Formal Clinical Diagnosis": diagnosis,
      "Brief Case Notes": notes || "",
    });
    const dynamicZohoUrl = `${ZOHO_BASE_URL}?${params.toString()}`;

    let cancelled = false;

    const mountWidget = () => {
      const Bookings = (window as any).Bookings;
      const container = document.getElementById("inline-container");
      if (cancelled || !Bookings || !container) return;
      container.innerHTML = "";
      try {
        Bookings.inlineEmbed({
          parent: container,
          url: dynamicZohoUrl,
          height: "650px",
          width: "100%",
        });
        setCalendarLoaded(true);
      } catch (e) {
        console.error("Zoho Bookings inlineEmbed error:", e);
      }
    };

    const existing = document.querySelector(`script[src="${ZOHO_EMBED_SCRIPT}"]`) as HTMLScriptElement | null;
    if (existing && (window as any).Bookings) {
      mountWidget();
    } else if (existing) {
      existing.addEventListener("load", mountWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = ZOHO_EMBED_SCRIPT;
      script.async = true;
      script.onload = mountWidget;
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      const container = document.getElementById("inline-container");
      if (container) container.innerHTML = "";
    };
  }, [step, fullName, email, dialCode, phone, concern, timeline, diagnosis, notes]);

  const page1Valid = fullName.trim().length > 1 && /.+@.+\..+/.test(email) && dialCode && phone.trim().length >= 4 && country;
  const page2Valid = concern && timeline && diagnosis;

  const goNext = (to: Step) => { setDirection(1); setStep(to); };
  const goBack = (to: Step) => { setDirection(-1); setStep(to); };

  const calendar = useMemo(() => {
    const first = new Date(viewMonth.y, viewMonth.m, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(viewMonth.y, viewMonth.m + 1, 0).getDate();
    const cells: Array<Date | null> = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.y, viewMonth.m, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    const out: Date[] = [];
    for (let h = CLINIC_START_HOUR; h < CLINIC_END_HOUR; h++) {
      for (const m of [0, 30]) {
        out.push(tbilisiDateToUTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), h, m));
      }
    }
    return out.filter((d) => d.getTime() > Date.now());
  }, [selectedDate]);

  const monthLabel = new Date(viewMonth.y, viewMonth.m, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition";
  const inputStyle = { boxShadow: "none" } as const;
  const focusRing = `focus:ring-[${TEAL}] focus:border-[${TEAL}]`;
  const label = "block text-xs font-semibold uppercase tracking-wider mb-2";
  const labelStyle = { color: INDIGO };

  const steps: { n: 1 | 2 | 3; label: string }[] = [
    { n: 1, label: "Information" },
    { n: 2, label: "Medical Briefing" },
    { n: 3, label: "Calendar" },
  ];

  const slideClass = direction === 1 ? "animate-[slideInRight_.35s_ease-out]" : "animate-[slideInLeft_.35s_ease-out]";

  return (
    <section id="admissions" className="py-28 bg-white border-t border-slate-100">
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-24px) } to { opacity: 1; transform: translateX(0) } }
      `}</style>

      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: INDIGO, lineHeight: "1.15" }}>
            Schedule a 30-Minute Medical Consultation
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            Speak directly with our clinical team in Tbilisi. Complete your intake and reserve your preferred time.
          </p>
        </div>

        {/* Step tracker */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {steps.map((s, i) => {
              const isActive = step === s.n;
              const isDone = step > s.n;
              return (
                <div key={s.n} className="flex items-center gap-2 sm:gap-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all shrink-0"
                      style={{
                        background: isDone ? TEAL : isActive ? INDIGO : "#fff",
                        borderColor: isDone ? TEAL : isActive ? INDIGO : "#e2e8f0",
                        color: isDone || isActive ? "#fff" : "#94a3b8",
                      }}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : String(s.n).padStart(2, "0")}
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight min-w-0">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                        {String(s.n).padStart(2, "0")}
                      </span>
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: isActive ? INDIGO : isDone ? INDIGO : "#94a3b8" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px bg-slate-200 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 transition-all duration-500"
                        style={{ width: isDone ? "100%" : "0%", background: TEAL }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10 overflow-hidden">
          {/* STEP 1 */}
          {step === 1 && (
            <div key="s1" className={slideClass}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Contact Information</h3>
              <p className="text-sm text-slate-500 mb-8">Tell us a bit about you so we can match you with the right specialist.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Full Name</label>
                  <input className={`${input} ${focusRing}`} style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Email Address</label>
                  <input type="email" className={`${input} ${focusRing}`} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      className={`rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm ${dialCode ? "text-slate-900" : "text-slate-400"} focus:outline-none focus:ring-2 ${focusRing} transition w-36 shrink-0`}
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                    >
                      <option value="" disabled>🌐 Select Country Code</option>
                      {DIAL_CODES.map((c) => (
                        <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className={`${input} ${focusRing} flex-1`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                      placeholder="555 123 4567"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={label} style={labelStyle}>Country of Residence</label>
                  <select className={`${input} ${focusRing}`} style={inputStyle} value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">Select your country</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  disabled={!page1Valid}
                  onClick={() => goNext(2)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  Continue to Medical Briefing
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div key="s2" className={slideClass}>
              <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Medical Briefing</h3>
              <p className="text-sm text-slate-500 mb-8">Help our clinical team prepare for your consultation.</p>

              <div className="space-y-7">
                {/* Concern */}
                <div>
                  <label className={label} style={labelStyle}>Primary Area of Concern</label>
                  <select className={`${input} ${focusRing}`} style={inputStyle} value={concern} onChange={(e) => setConcern(e.target.value)}>
                    <option value="">Select an area</option>
                    {CONCERNS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className={label} style={labelStyle}>Timeline for Treatment</label>
                  <div className="grid gap-2.5">
                    {TIMELINES.map((t) => {
                      const sel = timeline === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all"
                          style={{
                            borderColor: sel ? TEAL : "#e2e8f0",
                            background: sel ? `${TEAL}0d` : "#fff",
                            color: INDIGO,
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                            style={{ borderColor: sel ? TEAL : "#cbd5e1" }}
                          >
                            {sel && <span className="w-2 h-2 rounded-full" style={{ background: TEAL }} />}
                          </span>
                          <span className="font-medium">{t}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnosis */}
                <div>
                  <label className={label} style={labelStyle}>Have you received a formal clinical diagnosis for this condition?</label>
                  <div className="flex flex-wrap gap-2.5">
                    {DIAGNOSIS.map((d) => {
                      const sel = diagnosis === d;
                      return (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setDiagnosis(d)}
                          className="rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all"
                          style={{
                            borderColor: sel ? TEAL : "#e2e8f0",
                            background: sel ? TEAL : "#fff",
                            color: sel ? "#fff" : INDIGO,
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={label} style={labelStyle}>Brief Case Notes (Optional)</label>
                  <textarea
                    maxLength={300}
                    rows={4}
                    className={`${input} ${focusRing} resize-none`}
                    style={inputStyle}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please share any specific symptoms or goals you wish to address during your consultation..."
                  />
                  <div className="mt-1.5 text-right text-[11px] text-slate-400">{notes.length}/300</div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() => goBack(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  disabled={!page2Valid}
                  onClick={() => goNext(3)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  Proceed to Scheduling
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div key="s3" className={slideClass}>
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: INDIGO }}>Choose Your Date & Time</h3>
                  <p className="text-sm text-slate-500">Pick a 30-minute slot. Availability is synced live with our medical team's calendar.</p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-white">
                {!calendarLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-slate-200 animate-spin"
                      style={{ borderTopColor: "#64748b" }}
                      aria-label="Loading calendar"
                    />
                    <p className="text-sm text-slate-500">Loading availability…</p>
                  </div>
                )}
                <div
                  id="inline-container"
                  className="w-full"
                  style={{ minWidth: "320px", minHeight: "650px" }}
                />
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button onClick={() => goBack(2)} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => goNext(4)}
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-lg"
                  style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}
                >
                  I've Booked My Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — confirmation */}
          {step === 4 && (
            <div key="s4" className={`${slideClass} text-center py-6`}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${TEAL}1f` }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: TEAL, boxShadow: `0 10px 25px -10px ${TEAL}` }}>
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: INDIGO }}>Consultation Request Received</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}. Your clinical intake has been submitted and your scheduled time is locked in our medical team's calendar.
              </p>
              <p className="text-sm text-slate-500 mt-3">A confirmation email with your meeting link has been sent to {email}.</p>


              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => setShowEmail(true)} className="inline-flex items-center gap-2 rounded-xl text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition active:scale-[0.97]" style={{ background: INDIGO }}>
                  <Mail className="w-4 h-4" /> Preview confirmation email
                </button>
                <button
                  onClick={() => {
                    setStep(1); setDirection(1);
                    setFullName(""); setEmail(""); setPhone(""); setCountry("");
                    setConcern(""); setTimeline(""); setDiagnosis(""); setNotes("");
                    setSelectedDate(null); setSelectedSlot(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Book another consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email preview modal */}
      {showEmail && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowEmail(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Mail className="w-4 h-4" style={{ color: TEAL }} /> Email preview
              </div>
              <button onClick={() => setShowEmail(false)} className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-slate-700 leading-relaxed">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <p className="text-xs text-slate-400 mb-1">To: {email}</p>
                <p className="font-semibold" style={{ color: INDIGO }}>Subject: Confirmed: Your 30-Minute StemPlus Consultation</p>
              </div>
              <p className="mb-3">Dear {fullName.split(" ")[0]},</p>
              <p className="mb-3">Thank you for requesting a consultation with StemPlus Clinic in Tbilisi, Georgia. We have successfully received your clinical details and look forward to discussing your personalized regenerative treatment plan.</p>
              <p className="mb-3">Your 30-minute medical consultation is confirmed at the time you selected in our scheduling calendar. You will receive a separate calendar invitation with the exact date, time, and meeting link.</p>

              <p className="mb-3">Please join your clinical consultant at the scheduled time using our secure Google Meets link:<br />
                <a href="https://meet.google.com/stemplus-clinic-consultation" className="font-medium underline break-all" style={{ color: TEAL }}>https://meet.google.com/stemplus-clinic-consultation</a></p>
              <p className="mb-3">In the meantime, if you need to submit any medical records or laboratory diagnostics ahead of our call, please reply directly to this email at <a className="underline" style={{ color: TEAL }} href="mailto:stemplusclinic@gmail.com">stemplusclinic@gmail.com</a>.</p>
              <p className="mb-1">Warm regards,</p>
              <p className="font-semibold" style={{ color: INDIGO }}>The StemPlus Medical Coordination Team</p>
              <p>Tbilisi, Georgia</p>
              <p>+995 595 92 28 92</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
