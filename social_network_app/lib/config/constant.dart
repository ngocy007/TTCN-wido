// APi
const baseURL = "http://192.168.1.21:8000/api/";

// User
const loginURL = baseURL + "user/login";
const updateURL = baseURL + "user/update";
const regisTerURL = baseURL + "user/register";
const logoutURL = baseURL + "user/logout";
const userURL = baseURL + "user/info/";
const sendOTP1 = baseURL + "user/sendOTP/Create";
const sendOTP2 = baseURL + "user/sendOTP/ForgotPW";
const veOTP = baseURL + "user/isOTP";
const followURL = baseURL + "user/";
const followersURL = baseURL + "user/listfollower/";
const followeesURL = baseURL + "user/listfollowing/";
const searchURL = baseURL + "user/search?q=";
const forgotPassURL = baseURL + "user/forgotPassword";


// Post
const getDetailPost = baseURL + "post/";
const getPostsURL = baseURL + "post/home";
const likeURl = baseURL + "like/post/";
const createPostURL = baseURL + "post/create";
const createCMTURL = baseURL +  "comment/create";
const deleteCMTURL = baseURL + "comment/";

// Chat
const getRoomURL = baseURL + "chat";
const getMessURL = baseURL + "mess/";
const sendMessURL = baseURL + "mess/send";

// Lỗi
const serverError = "Lỗi server";
const unauthorized =  "Chưa đăng nhập";
const wrong =  "Có gì đó không đúng, vui lòng thử lại";