import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link,  useNavigate  } from "react-router-dom";
import { hospitalSignup } from "../services/Api"; 
import { useDispatch, useSelector } from "react-redux";
import { setHospitalInfo } from "../../slice/hospitalInfo";

const HospitalSignup = () => {
  const hospitalData = useSelector((state) => state.hospitalInfo);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    confirmPassword: "",
    email: "",
    hospitalName: "",
    hospitalAddress: "",
    state: "",
    district: "",
    city: "",
  });
  const [states,setStates] = useState([]);
  const [districts,setDistricts] = useState([]);
  
  const navigate = useNavigate();
  const [hospitalLocation, setHospitalLocation] = useState(null); 
  const [locationError, setLocationError] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    setStates(indianStates);
  }, []);
  useEffect(() => {
    if (formData.state) {
      setDistricts(statesAndDistricts[formData.state] || []);
    }
  }, [formData.state]);
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
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
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
  ];
  const statesAndDistricts = {
    "Andhra Pradesh": [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "West Godavari", "YSR Kadapa"
    ],
    "Arunachal Pradesh": [
      "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Lower Subansiri", "Kurung Kumey", "Kra Daadi", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Changlang", "Tirap", "Longding"
    ],
    "Assam": [
      "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Darrang", "Dhemaji", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Kondagaon", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Surajpur", "Surguja"
    ],
    "Goa": [
      "North Goa", "South Goa"
    ],
    "Gujarat": [
      "Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Suryapur", "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kinnaur", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
      "Bagalkot", "Ballari", "Belagavi", "Bengaluru Urban", "Bengaluru Rural", "Bidar", "Chamarajanagar", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
    ],
    "Kerala": [
      "Alappuzha", "Ernakulam", "Idukki", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
      "Alirajpur", "Anuppur", "Ashok Nagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Navi Mumbai", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
      "East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"
    ],
    "Mizoram": [
      "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"
    ],
    "Nagaland": [
      "Dimapur", "Kiphire", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Bolangir", "Cuttack", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ],
    "Punjab": [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shahr", "Patiala", "Rupnagar", "S.A.S Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib"
    ],
    "Rajasthan": [
      "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"
    ],
    "Sikkim": [
      "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
    ],
    "Tamil Nadu": [
      "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore", "Villupuram", "Virudhunagar"
    ],
    "Telangana": [
      "Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna", "Rangareddy", "Sangareddy", "Sircilla", "Warangal", "Yadadri"
    ],
    "Tripura": [
      "Dhalai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
    ],
    "Uttar Pradesh": [
      "Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mainpuri", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur"
    ]
  };

  useEffect(() => {
    const getHospitalLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setHospitalLocation({ latitude, longitude });
          },
          (error) => {
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };
    getHospitalLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    if (!hospitalLocation) {
      alert("Unable to get your location. Please enable location services and try again.");
      return;
    }
  
    try {
      const response = await hospitalSignup({
        ...formData,
        userType: "hospital", // Set userType to hospital explicitly
        location: {
          type: "Point", // Required by the schema
          coordinates: [hospitalLocation.longitude, hospitalLocation.latitude], // Ensure correct [longitude, latitude] order
        },
      });
  
      dispatch(
        setHospitalInfo({
          email: response.email,
          password: response.password, // Ensure this is securely handled; avoid sending passwords in plain text
          hospitalName: response.hospitalName,
          hospitalAddress: response.hospitalAddress,
          state: response.state,
          district: response.district,
          city: response.city,
          mobile: response.mobile,
          location: {
            type: "Point", // Required by the schema
            coordinates: [hospitalLocation.longitude, hospitalLocation.latitude],
          },
          hospitalObjectId: response._id,
        })
      );
  
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("hospitalId", response._id);
      alert("Signup successful!");
      navigate("/hospitaldashboard");
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 w-[700px] mt-20">
        <div className="text-center mb-6">
          <FaUserPlus size={50} className="text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Hospital Signup</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="block text-gray-600">Hospital/Clinic Name</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-600">Hospital Address</label>
              <input
                type="text"
                name="hospitalAddress"
                value={formData.hospitalAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="block text-gray-600">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-600">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">City, PIN Code</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Signup
          </button>
          <div className="flex justify-center">
            <p className="pr-2">Already have an account?</p>
            <Link to="/hospitallogin" className="text-blue-500" >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalSignup;

