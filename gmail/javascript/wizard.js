var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var countries = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Pondicherry"];
    autocomplete(document.getElementById("state"), countries);
// var txt = '<select onchange="setCity()" style="width:100%;" class="" name="state" id="state"><option value="select state">select state</option>'
// for (x in countries) {
//     txt += "<option value=" + countries[x] + ">" + countries[x] + "</option>"
// }
// txt += "</select>"
// document.getElementById('run').innerHTML = txt

// var txt = '<select style="width:100%;" class="" name="state" id="state"><option value="select state first">select state first</option></select>'
// document.getElementById('city').innerHTML = txt



// function setCity() {
//     var a=document.getElementById('state').value;
//     console.log(cities[a])
//     var txt = '<select style="width:100%;" class="" name="state" id="state"><option value="select city">select city</option>'
//     for (x in cities[a]) {
//         txt += "<option value=" +cities[a][x] + ">" +cities[a][x] + "</option>"
//     }
//     txt += "</select>"
//     document.getElementById('city').innerHTML = txt
// }


const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
const info = document.querySelector(".alert-info");
//#####cities array#############
var cities = {
    'Andhra Pradesh': [
        'Adilabad',
        'Anantapur',
        'Chittoor',
        'Kakinada',
        'Guntur',
        'Hyderabad',
        'Karimnagar',
        'Khammam',
        'Krishna',
        'Kurnool',
        'Mahbubnagar',
        'Medak',
        'Nalgonda',
        'Nizamabad',
        'Ongole',
        'Hyderabad',
        'Srikakulam',
        'Nellore',
        'Visakhapatnam',
        'Vizianagaram',
        'Warangal',
        'Eluru',
        'Kadapa',
    ],
    'Arunachal Pradesh': [
        'Anjaw',
        'Changlang',
        'East Siang',
        'Kurung Kumey',
        'Lohit',
        'Lower Dibang Valley',
        'Lower Subansiri',
        'Papum Pare',
        'Tawang',
        'Tirap',
        'Dibang Valley',
        'Upper Siang',
        'Upper Subansiri',
        'West Kameng',
        'West Siang',
    ],
    'Assam': [
        'Baksa',
        'Barpeta',
        'Bongaigaon',
        'Cachar',
        'Chirang',
        'Darrang',
        'Dhemaji',
        'Dima Hasao',
        'Dhubri',
        'Dibrugarh',
        'Goalpara',
        'Golaghat',
        'Hailakandi',
        'Jorhat',
        'Kamrup',
        'Kamrup Metropolitan',
        'Karbi Anglong',
        'Karimganj',
        'Kokrajhar',
        'Lakhimpur',
        'Marigaon',
        'Nagaon',
        'Nalbari',
        'Sibsagar',
        'Sonitpur',
        'Tinsukia',
        'Udalguri',
    ],
    'Bihar': [
        'Araria',
        'Arwal',
        'Aurangabad',
        'Banka',
        'Begusarai',
        'Bhagalpur',
        'Bhojpur',
        'Buxar',
        'Darbhanga',
        'East Champaran',
        'Gaya',
        'Gopalganj',
        'Jamui',
        'Jehanabad',
        'Kaimur',
        'Katihar',
        'Khagaria',
        'Kishanganj',
        'Lakhisarai',
        'Madhepura',
        'Madhubani',
        'Munger',
        'Muzaffarpur',
        'Nalanda',
        'Nawada',
        'Patna',
        'Purnia',
        'Rohtas',
        'Saharsa',
        'Samastipur',
        'Saran',
        'Sheikhpura',
        'Sheohar',
        'Sitamarhi',
        'Siwan',
        'Supaul',
        'Vaishali',
        'West Champaran',
        'Chandigarh',
    ],
    'Chhattisgarh': [
        'Bastar',
        'Bijapur',
        'Bilaspur',
        'Dantewada',
        'Dhamtari',
        'Durg',
        'Jashpur',
        'Janjgir-Champa',
        'Korba',
        'Koriya',
        'Kanker',
        'Kabirdham (Kawardha)',
        'Mahasamund',
        'Narayanpur',
        'Raigarh',
        'Rajnandgaon',
        'Raipur',
        'Surguja',
    ],
    'Dadra and Nagar Haveli': [
        'Dadra and Nagar Haveli'
    ],
    'Daman and Diu': [
        'Daman',
        'Diu',
    ],
    'Delhi': [
        'Central Delhi',
        'East Delhi',
        'New Delhi',
        'North Delhi',
        'North East Delhi',
        'North West Delhi',
        'South Delhi',
        'South West Delhi',
        'West Delhi',
    ],
    'Goa': [
        'North Goa',
        'South Goa'
    ],
    'Gujarat': [
        'Ahmedabad',
        'Amreli district',
        'Anand',
        'Banaskantha',
        'Bharuch',
        'Bhavnagar',
        'Dahod',
        'The Dangs',
        'Gandhinagar',
        'Jamnagar',
        'Junagadh',
        'Kutch',
        'Kheda',
        'Mehsana',
        'Narmada',
        'Navsari',
        'Patan',
        'Panchmahal',
        'Porbandar',
        'Rajkot',
        'Sabarkantha',
        'Surendranagar',
        'Surat',
        'Vyara',
        'Vadodara',
        'Valsad',
    ],
    'Haryana': [
        'Ambala',
        'Bhiwani',
        'Faridabad',
        'Fatehabad',
        'Gurgaon',
        'Hissar',
        'Jhajjar',
        'Jind',
        'Karnal',
        'Kaithal',
        'Kurukshetra',
        'Mahendragarh',
        'Mewat',
        'Palwal',
        'Panchkula',
        'Panipat',
        'Rewari',
        'Rohtak',
        'Sirsa',
        'Sonipat',
        'Yamuna Nagar',
    ],
    'Himachal Pradesh': [
        'Bilaspur',
        'Chamba',
        'Hamirpur',
        'Kangra',
        'Kinnaur',
        'Kullu',
        'Lahaul and Spiti',
        'Mandi',
        'Shimla',
        'Sirmaur',
        'Solan',
        'Una',
    ],
    'Jammu and Kashmir': [
        'Anantnag',
        'Badgam',
        'Bandipora',
        'Baramulla',
        'Doda',
        'Ganderbal',
        'Jammu',
        'Kargil',
        'Kathua',
        'Kishtwar',
        'Kupwara',
        'Kulgam',
        'Leh',
        'Poonch',
        'Pulwama',
        'Rajauri',
        'Ramban',
        'Reasi',
        'Samba',
        'Shopian',
        'Srinagar',
        'Udhampur',
    ],
    'Jharkhand': [
        'Bokaro',
        'Chatra',
        'Deoghar',
        'Dhanbad',
        'Dumka',
        'East Singhbhum',
        'Garhwa',
        'Giridih',
        'Godda',
        'Gumla',
        'Hazaribag',
        'Jamtara',
        'Khunti',
        'Koderma',
        'Latehar',
        'Lohardaga',
        'Pakur',
        'Palamu',
        'Ramgarh',
        'Ranchi',
        'Sahibganj',
        'Seraikela Kharsawan',
        'Simdega',
        'West Singhbhum',
    ],
    'Karnataka': [
        'Bagalkot',
        'Bangalore Rural',
        'Bangalore Urban',
        'Belgaum',
        'Bellary',
        'Bidar',
        'Bijapur',
        'Chamarajnagar',
        'Chikkamagaluru',
        'Chikkaballapur',
        'Chitradurga',
        'Davanagere',
        'Dharwad',
        'Dakshina Kannada',
        'Gadag',
        'Gulbarga',
        'Hassan',
        'Haveri district',
        'Kodagu',
        'Kolar',
        'Koppal',
        'Mandya',
        'Mysore',
        'Raichur',
        'Shimoga',
        'Tumkur',
        'Udupi',
        'Uttara Kannada',
        'Ramanagara',
        'Yadgir',
    ],
    'Kerala': [
        'Alappuzha',
        'Ernakulam',
        'Idukki',
        'Kannur',
        'Kasaragod',
        'Kollam',
        'Kottayam',
        'Kozhikode',
        'Malappuram',
        'Palakkad',
        'Pathanamthitta',
        'Thrissur',
        'Thiruvananthapuram',
        'Wayanad',
    ],
    'Madhya Pradesh': [
        'Alirajpur',
        'Anuppur',
        'Ashok Nagar',
        'Balaghat',
        'Barwani',
        'Betul',
        'Bhind',
        'Bhopal',
        'Burhanpur',
        'Chhatarpur',
        'Chhindwara',
        'Damoh',
        'Datia',
        'Dewas',
        'Dhar',
        'Dindori',
        'Guna',
        'Gwalior',
        'Harda',
        'Hoshangabad',
        'Indore',
        'Jabalpur',
        'Jhabua',
        'Katni',
        'Khandwa (East Nimar)',
        'Khargone (West Nimar)',
        'Mandla',
        'Mandsaur',
        'Morena',
        'Narsinghpur',
        'Neemuch',
        'Panna',
        'Rewa',
        'Rajgarh',
        'Ratlam',
        'Raisen',
        'Sagar',
        'Satna',
        'Sehore',
        'Seoni',
        'Shahdol',
        'Shajapur',
        'Sheopur',
        'Shivpuri',
        'Sidhi',
        'Singrauli',
        'Tikamgarh',
        'Ujjain',
        'Umaria',
        'Vidisha',
    ],
    'Maharashtra': [
        'Ahmednagar',
        'Akola',
        'Amravati',
        'Aurangabad',
        'Bhandara',
        'Beed',
        'Buldhana',
        'Chandrapur',
        'Dhule',
        'Gadchiroli',
        'Gondia',
        'Hingoli',
        'Jalgaon',
        'Jalna',
        'Kolhapur',
        'Latur',
        'Mumbai City',
        'Mumbai suburban',
        'Nandurbar',
        'Nanded',
        'Nagpur',
        'Nashik',
        'Osmanabad',
        'Parbhani',
        'Pune',
        'Raigad',
        'Ratnagiri',
        'Sindhudurg',
        'Sangli',
        'Solapur',
        'Satara',
        'Thane',
        'Wardha',
        'Washim',
        'Yavatmal',
    ],
    'Manipur': [
        'Bishnupur',
        'Churachandpur',
        'Chandel',
        'Imphal East',
        'Senapati',
        'Tamenglong',
        'Thoubal',
        'Ukhrul',
        'Imphal West',
    ],
    'Meghalaya': [
        'East Garo Hills',
        'East Khasi Hills',
        'Jaintia Hills',
        'Ri Bhoi',
        'South Garo Hills',
        'West Garo Hills',
        'West Khasi Hills',
    ],
    'Mizoram': [
        'Aizawl',
        'Champhai',
        'Kolasib',
        'Lawngtlai',
        'Lunglei',
        'Mamit',
        'Saiha',
        'Serchhip',
    ],
    'Nagaland': [
        'Dimapur',
        'Kohima',
        'Mokokchung',
        'Mon',
        'Phek',
        'Tuensang',
        'Wokha',
        'Zunheboto',
    ],
    'Orissa': [
        'Angul',
        'Boudh (Bauda)',
        'Bhadrak',
        'Balangir',
        'Bargarh (Baragarh)',
        'Balasore',
        'Cuttack',
        'Debagarh (Deogarh)',
        'Dhenkanal',
        'Ganjam',
        'Gajapati',
        'Jharsuguda',
        'Jajpur',
        'Jagatsinghpur',
        'Khordha',
        'Kendujhar (Keonjhar)',
        'Kalahandi',
        'Kandhamal',
        'Koraput',
        'Kendrapara',
        'Malkangiri',
        'Mayurbhanj',
        'Nabarangpur',
        'Nuapada',
        'Nayagarh',
        'Puri',
        'Rayagada',
        'Sambalpur',
        'Subarnapur (Sonepur)',
        'Sundergarh',
    ],
    'Pondicherry': [
        'Karaikal',
        'Mahe',
        'Pondicherry',
        'Yanam',
    ],
    'Punjab': [
        'Amritsar',
        'Barnala',
        'Bathinda',
        'Firozpur',
        'Faridkot',
        'Fatehgarh Sahib',
        'Fazilka',
        'Gurdaspur',
        'Hoshiarpur',
        'Jalandhar',
        'Kapurthala',
        'Ludhiana',
        'Mansa',
        'Moga',
        'Sri Muktsar Sahib',
        'Pathankot',
        'Patiala',
        'Rupnagar',
        'Ajitgarh (Mohali)',
        'Sangrur',
        'Nawanshahr',
        'Tarn Taran',
    ],
    'Rajasthan': [
        'Ajmer',
        'Alwar',
        'Bikaner',
        'Barmer',
        'Banswara',
        'Bharatpur',
        'Baran',
        'Bundi',
        'Bhilwara',
        'Churu',
        'Chittorgarh',
        'Dausa',
        'Dholpur',
        'Dungapur',
        'Ganganagar',
        'Hanumangarh',
        'Jhunjhunu',
        'Jalore',
        'Jodhpur',
        'Jaipur',
        'Jaisalmer',
        'Jhalawar',
        'Karauli',
        'Kota',
        'Nagaur',
        'Pali',
        'Pratapgarh',
        'Rajsamand',
        'Sikar',
        'Sawai Madhopur',
        'Sirohi',
        'Tonk',
        'Udaipur',
    ],
    'Sikkim': [
        'East Sikkim',
        'North Sikkim',
        'South Sikkim',
        'West Sikkim',
    ],
    'Tamil Nadu': [
        'Ariyalur',
        'Chennai',
        'Coimbatore',
        'Cuddalore',
        'Dharmapuri',
        'Dindigul',
        'Erode',
        'Kanchipuram',
        'Kanyakumari',
        'Karur',
        'Madurai',
        'Nagapattinam',
        'Nilgiris',
        'Namakkal',
        'Perambalur',
        'Pudukkottai',
        'Ramanathapuram',
        'Salem',
        'Sivaganga',
        'Tirupur',
        'Tiruchirappalli',
        'Theni',
        'Tirunelveli',
        'Thanjavur',
        'Thoothukudi',
        'Tiruvallur',
        'Tiruvarur',
        'Tiruvannamalai',
        'Vellore',
        'Viluppuram',
        'Virudhunagar',
    ],
    'Tripura': [
        'Dhalai',
        'North Tripura',
        'South Tripura',
        'Khowai',
        'West Tripura',
    ],
    'Uttar Pradesh': [
        'Agra',
        'Allahabad',
        'Aligarh',
        'Ambedkar Nagar',
        'Auraiya',
        'Azamgarh',
        'Barabanki',
        'Budaun',
        'Bagpat',
        'Bahraich',
        'Bijnor',
        'Ballia',
        'Banda',
        'Balrampur',
        'Bareilly',
        'Basti',
        'Bulandshahr',
        'Chandauli',
        'Chhatrapati Shahuji Maharaj Nagar',
        'Chitrakoot',
        'Deoria',
        'Etah',
        'Kanshi Ram Nagar',
        'Etawah',
        'Firozabad',
        'Farrukhabad',
        'Fatehpur',
        'Faizabad',
        'Gautam Buddh Nagar',
        'Gonda',
        'Ghazipur',
        'Gorakhpur',
        'Ghaziabad',
        'Hamirpur',
        'Hardoi',
        'Mahamaya Nagar',
        'Jhansi',
        'Jalaun',
        'Jyotiba Phule Nagar',
        'Jaunpur district',
        'Ramabai Nagar (Kanpur Dehat)',
        'Kannauj',
        'Kanpur',
        'Kaushambi',
        'Kushinagar',
        'Lalitpur',
        'Lakhimpur Kheri',
        'Lucknow',
        'Mau',
        'Meerut',
        'Meerut',
        'Maharajganj',
        'Mahoba',
        'Mirzapur',
        'Moradabad',
        'Mainpuri',
        'Mathura',
        'Muzaffarnagar',
        'Panchsheel Nagar district (Hapur)',
        'Pilibhit',
        'Shamli',
        'Pratapgarh',
        'Rampur',
        'Raebareli',
        'Saharanpur',
        'Sitapur',
        'Shahjahanpur',
        'Sant Kabir Nagar',
        'Siddharthnagar',
        'Sonbhadra',
        'Sant Ravidas Nagar',
        'Sultanpur',
        'Shravasti',
        'Unnao',
        'Varanasi',
    ],
    'Uttarakhand': [
        'Almora',
        'Bageshwar',
        'Chamoli',
        'Champawat',
        'Dehradun',
        'Haridwar',
        'Nainital',
        'Pauri Garhwal',
        'Pithoragarh',
        'Rudraprayag',
        'Tehri Garhwal',
        'Udham Singh Nagar',
        'Uttarkashi',
    ],
    'West Bengal': [
        'Birbhum',
        'Bankura',
        'Bardhaman',
        'Darjeeling',
        'Dakshin Dinajpur',
        'Hooghly',
        'Howrah',
        'Jalpaiguri',
        'Cooch Behar',
        'Kolkata',
        'Maldah',
        'Paschim Medinipur',
        'Purba Medinipur',
        'Murshidabad',
        'Nadia',
        'North 24 Parganas',
        'South 24 Parganas',
        'Purulia',
        'Uttar Dinajpur',
    ],
}
// autocomplete(document.getElementById("state"), countries);

//#####cities array End....................#############
function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    if (n == 2) {
        autocomplete(document.getElementById("city"), cities[document.getElementById("state").value]);
    }
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        showTab(0)
        alert('success')
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    if (currentTab == 0) {

        let fname = document.getElementById('fname').value
        let lname = document.getElementById('lname').value
        if (!fname) {
            showToast("first name should not be empty.")
            document.getElementById('fname').style.borderColor = "red";
            return false;
        }
        if (!alphanumeric(fname)) {
            document.getElementById('fname').style.borderColor = "red";
            showToast('please enter valid first name')
            return false;
        }
        document.getElementById('fname').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '0%') {
            document.getElementById('bar').style.width = "12.5%"
            document.getElementById('pt').innerHTML="12.5%"
        }
        if (!lname) {
            showToast("last name should not be empty.")
            document.getElementById('lname').style.borderColor = "red";
            return false
        }
        if (!alphanumeric(lname)) {
            showToast('please enter valid last name')
            document.getElementById('lname').style.borderColor = "red";
            return false;
        }
        document.getElementById('lname').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '12.5%') {
            document.getElementById('bar').style.width = "25%"
            document.getElementById('pt').innerHTML="25%"
        }

        return true;
    } else if (currentTab == 1) {
        let phone = document.getElementById('phone').value
        if (!isEmail()) {
            showToast("Please enter email")
            document.getElementById('email').style.borderColor = "red";
            return false
        }
        document.getElementById('email').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '25%') {
            document.getElementById('bar').style.width = "37.5%"
            document.getElementById('pt').innerHTML="37.5%"
        }
        if (!isPhone(phone)) {
            showToast("Please enter valid phone number")
            document.getElementById('phone').style.borderColor = "red";
            return false
        }
        document.getElementById('phone').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '37.5%') {
            document.getElementById('bar').style.width = "50%"
            document.getElementById('pt').innerHTML="50%"
        }
        return true
    } else if (currentTab == 2) {
        let address = document.getElementById('address').value
        let city = document.getElementById('city').value
        let state = document.getElementById('state').value
        if (!state) {
            document.getElementById('state').style.borderColor = "red";
            showToast("State name should not be empty.")
            return false
        }
        if (!alphanumeric(state)) {
            showToast('please enter valid state name')
            document.getElementById('state').style.borderColor = "red";
            return false;
        }
        document.getElementById('state').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '50%') {
            document.getElementById('bar').style.width = "58.3%"
            document.getElementById('pt').innerHTML="58.3%"
        }
        if (!city) {
            document.getElementById('city').style.borderColor = "red";
            showToast("City name should not be empty.")
            return false
        }
        if (!alphanumeric(city)) {
            showToast('please enter valid city name')
            document.getElementById('city').style.borderColor = "red";
            return false;
        }
        if (document.getElementById('bar').style.width == '58.3%') {
            document.getElementById('bar').style.width = "66.6%"
            document.getElementById('pt').innerHTML="66.6%"
        }
        document.getElementById('city').style.borderColor = "#ced4da";
        if (!address) {
            document.getElementById('address').style.borderColor = "red";
            showToast("Address should not be empty.")
            return false
        }
        document.getElementById('address').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '66.6%') {
            document.getElementById('bar').style.width = "75%"
            document.getElementById('pt').innerHTML="75%"
        }

        return true;
    } else if (currentTab == 3) {
        let username = document.getElementById('username').value
        let pass = document.getElementById('pass').value
        if (!username) {
            showToast("Please enter username")
            document.getElementById('username').style.borderColor = "red";
            return false
        }
        if (document.getElementById('bar').style.width == '75%') {
            document.getElementById('bar').style.width = "87.5%"
            document.getElementById('pt').innerHTML="87.5%"
        }
        document.getElementById('username').style.borderColor = "#ced4da";
        if (!pass) {
            document.getElementById('pass').style.borderColor = "red";
            showToast("password should not be empty.")
            return false
        }
        document.getElementById('pass').style.borderColor = "#ced4da";
        if (document.getElementById('bar').style.width == '87.5%') {
            document.getElementById('bar').style.width = "100%"
            document.getElementById('pt').innerHTML="100%"
        }
        return true;
    }
    // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}



function alphanumeric(inputtxt) {
    var letters = /^[a-zA-Z ]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        return false;
    }
}

function isPhone(inputtxt) {
    var letters = /^[0-9]+$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        return false;
    }
}


function isEmail() {
    var email = document.getElementById('email').value
    if (!isNaN(email) || !email) {
        return false
    }
    if (email.split('@').length == 2) {
        email = email.split('@');
        if (email[1].split('.').length == 2) {
            return true;
        }
    }
    return false;
}


function showToast(str) {
    var x = document.getElementById("snackbar");
    x.innerHTML = str
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    autocomplete(document.getElementById("city"), cities[document.getElementById('state').value]);
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}




