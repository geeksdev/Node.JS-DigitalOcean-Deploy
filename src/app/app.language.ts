import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable()
export class LanguageService {

    constructor() { }

    //language support

    public engHeader =
        {
            selectLang:"Languages",  languageOptions:[{lang:"Hebrew",checked:false,value:1},
            {lang:"English",checked:false,value:2}],
            language:"Select Languages",
            logo: "assets/images/logo.svg", searchLine: "assets/images/searchLine.svg", whatLookingPlaceHolder: "What are you looking for...", logOrCreateAccount: "Log in or create your account",
            onTitle: "on Bingalo", aboutUs: "About Us", trustNSafe: "Trust & Safety", howWorks: "How It Works", needHelp: "Need Help?", logOut: "Logout",
            login: "Login", sellStuff: "Sell Your Stuff", myProfile: "My Profile", home: "Home", signUp: "Sign Up", backToTitle: "Back to Bingalo",
            logoPng: "assets/images/logo.png", postIn30Secs: "Post your items in as little as 30 seconds", downloadTopRated: "Download our top-rated iOS or Android app to post your item",
            phoneNumber: "Phone Number", emailAddress: "Email Address", enterNumberCountryCode: "Please try entering your full number, including the country code.",
            send: "Send", continueWebsite: "Continue Browsing Website", thankYou: "Thank you", takeFewMinutes: "it may take a few minutes for you to receive it.",
            checkInternetConnection: "Please check your internet connection & try again.", ok: "Ok", sessionTimedOut: "Session Timed Out",
            timeToTitle: "Buy and sell quickly, safely and locally. It’s time to Bingalo!", titleTag: "Bingalo",
        }

    public engHome = {
        titleBuySellSafe: "Bingalo Post, Chat, Buy and Sell.", bringCommunities: "The simpler",
        buySellFun: "way to buy and sell locally", cancel: "Cancel", reset: "Reset", location: "LOCATION",
        categories: "Categories", showMore: "Show More", showLess: "Show Less", distance: "DISTANCE", max: "Max", Miles: "Miles",
        noCategory: "no category", sortBy: "SORT BY", newestFirst: "Newest First", closestFirst: "Closest First", lowToHighPrice: "Price: low to high",
        highToLowPrice: "Price: high to low", postedWithin: "POSTED WITHIN", allListings: "All listings", last24Hours: "The last 24 hours",
        last7Days: "The last 7 days", last30Days: "The last 30 days", filters: "Filters", price: "Price", currency: "Currency", from: "From",
        saveFilters: "Save Filters", mike: "assets/images/mike.svg", miles: "Miles", noOffers: "No offers found", sorryNotFound: "Sorry, we couldn't find what you were looking for",
        downloadApp: "Download the app", startPostingOffers: "to start posting offers now", trustByMillions: "Trusted by Millions", blythe: "Blythe",
        robin: "Robin", chris: "Chris", greg: "Greg", heidi: "Heidi", krystal: "Krystal", readTitleStories: "Read Bingalo Stories", getApp: "Get the App!",
        joinMillions: "Join millions of loyal customers using the Bingalo mobile app, the simpler way to buy and sell locally!", loveJob: "Love your Job!",
        srAndroidEngineer: "Sr. Android Engineer", srIOSEngineer: "Sr. IOS Engineer", srBackendEngineer: "Sr. Backend Engineer",
        seePositions: "See All Positions!", sendAppLink: "Send app link", emailPlaceHolder: "your-email@domain.com",
        provideValidEmail: "Please provide a valid email address...", howPhone: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/howPhone.png",
        enterNumberCountryCode: "Please try entering your full number, including the country code.", recentRequestApp: "You have recently requested the app.",
        minsToReceive: "It may take a few minutes for you to receive it.", wait5Mins: "Please wait about 5 minutes", makeOtherRequest: "to make another request.",
        thankYou: "Thank you",

    }

    public engAbout = {
        aboutUs: "About Us", howWorks: "How It Works", createCommunities: "We Bring People Together",
        comeTogetherSell: "to Discover Value", ourStory: "Our Story", ceo: "Nick Huzar, CEO", cto: "Arean van Veelen, CTO",
        betterBuySell: "A Better Way to Buy and Sell", largeMarket: "Bingalo is the largest mobile marketplace in the U.S.",
        topApp: "Top 3 App", shopCategory: "In Shopping Category", appYear: "App of Year", geekWire: "Geekwire", billion14: "$14 Billion",
        transactionYear: "In Transactions this Year", million23: "23+ Million", downloads: "Downloads", titleNews: "Bingalo In the News",
    }

    public engchangePassword = {
        changePassTitle: "Change Password - Bingalo", changePassword: "Change Password", currentPassword: "Current Password",
        newPasswordAgain: "New Password (again)", newPassword: "New Password", submit: "Submit",
    }

    public engDiscussions = {
        titleBuySellSimple: "Bingalo - Buy. Sell. Simple.", myOffers: "My Offers", keyBoard: "Key board", twoHundred: "200", $: "$",
        Jeffery: "Jeffery", ago: "ago", month: "month", one: "1", hey: "Hey", replyToss: "Reply to ss", send: "Send", report: "Report", sabari: "Sabari",
        whyreport: "Why do you want to report this item?", prohibited: "It's prohibited on Bingalo", offensive: "It's offensive to me",
        notReal: "It's not a real post", duplicate: "It's a duplicate post", wrongCategory: "It's in the wrong category", scam: "It may be a scam",
        stolen: "It may be stolen", other: "Other", additionalNote: "Additional note (optional)", writeNotehere: "Please write your note here...",
        done: "Done",

    }

    public engEmailVerify = {
        verifyEmailTitle: "Verify Email - Bingalo", emailVerify: "Email Verify",
        emailProvide: "Please provide a valid email address...",
        submit: "Submit",


    }

    public engFooter = {
        logoBottom: "assets/images/logo_bottom.svg", buySellSafe: "Post, Chat, Buy and Sell", downloadApp: "Download the app",
        footerFB: "assets/images/fb.svg", footerInsta: "assets/images/insta.svg", footerTwitter: "assets/images/twitter.svg", aboutUs: "About Us", howWorks: "How It Works", terms: "Terms & Conditions",
        privacy: "Privacy", help: "Help", footerPlayStore: "assets/images/playstore.svg", footerAppStore: "assets/images/appstore.svg",

    }

    public engHowItWorks = {
        aboutUs: "About Us", howItWorks: "How It Works", mobileCommerce: "Buying and Selling Made Easy",
        startlessIn30Secs: "Get Started in Less Than 30 Seconds", discoverLocally: "Discover Locally",
        browseMillionListings: "Browse millions of listings to find amazing items nearby", chatInstantly: "Chat Instantly",
        messageUsersAnonymously: "Message users anonymously and securely through the Bingalo app. Our newsfeed allows you to connect with buyers, sellers and other people you know.",
        sellSimpleVideo: "Sell Quickly With Image", easilyPost: "Easily post your items for sale with just a simple snap chat from your smartphone.",
        buildTrustCommunity: "Building a Trusted Community", userProfiles: "User Profiles", knowMoreBuyers: "Know more about buyers and seller before you engage",
        userRatings: "User Ratings", checkBuyer: "Check buyer and seller ratings, and give ratings when you transact", realTimeAlerts: "Real-time Alerts",
        getNotified: "Get notified instantly on your phone when a buyer or seller contacts you",
        titleIs: "Bingalo is", toDownload: "to download", free: "free",
        downloadTopRated: "Download our top-rated iOS or Android app to get started today!", howItWorksPlayStore: "assets/images/playstore.svg",
        howItWorksAppstore: "assets/images/appstore.svg", comingSoon: "Coming Soon!!!", thankYou: "Thank you",
        fewMinsReceive: "it may take a few minutes for you to receive it.",

    }

    public engItem = {
        titleSimpleWayToBuy: "Bingalo is a simpler way to buy and sell locally. Get the free app.", itemAppStore: "assets/images/appstore.svg",
        itemPlayStore: "assets/images/playstore.svg", previous: "Previous", next: "Next", postRemoved: "post is removed", posted: "Posted",
        ago: "ago", report: "Report", description: "Description", comments: "Comments & Reviews", condition: "Condition", viewAll: "view all",
        typeYourMessage: "Type your message", youHave: "You have", one120: "120", characterLeft: "character left.",
        postComment: "Post Comment", myOtherOffers: "My Other Offers", price: "PRICE", $: "$", makeOffer: "Make Offer", follow: "Follow",
        following: "Following", unFollow: "Un-Follow", watch: "Favourite", watching: "Favourite", unWatch: "Un-Favourite", seller: "About the seller",
        approximationProtectPrivacy: "Approximation to protect seller's privacy", followers: "Followers", readyBuyHit: "Ready to buy? Make an offer!",
        offer: "Offer", notSure: "Have a question? ", ask: "Ask ", forMoreInfo: "the Seller a question.", offerSent: "Offer Sent!", orBetterDownloadApp: "Or better yet download the app. It's faster!",
        getApp: "Get the app!",
        itemGooglePlay: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/google-play.svg",
        itemAppStore2: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/app-store.svg", soldBy: "Sold by", whyReport: "Why do you want to report this item?",
        additionalNote: "Additional note (optional)", pleaseWriteNote: "Please write your note here...", done: "Done", reported: "Reported",
        thanksTakingTime: "Thank you for taking time to let us know.", send: "Send", nowFollowing: "You're now following", offers: "Offers",
        follower: "Follower", comingSoon: "Coming Soon!!!", thankYou: "Thank you", fewMinsReceive: "it may take a few minutes for you to receive it",
        enterQuestionPlaceHolder: "Enter your question here...", lengthTextarea120: "120", settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg"
    }

    public engLogin = {
        formBackground: "assets/images/formBackground.png", loginTo: "Login To", loginLogo: "assets/images/logo.svg", userName: "USER NAME",
        passWord: "PASSWORD", byClicking: "By Clicking on “Login” or ”Connect with Facebook” you shall agree to the Bingalo",
        termsService: "Terms of Service", privacyPolicy: "Privacy Policy", login: "Login", notRegistered: "Not registered?",
        signUp: "Sign up", forgotPassword: "Forgot password?", reset: "Reset", and: "and", registerErrMsg: "fdgfdgfdg"
    }

    public engLogout = {
    }

    public engMemberProfile = {
        profile: "Profile:", title: "Bingalo", offers: "Offers", $: "$", seller: "About the seller", followers: "Followers", follow: "Follow",
        following: "Following", unFollow: "Un-Follow", bangaluru: "Bangaluru", follower: "Follower",
    }

    public engneedHelp = {
        support: "Help - Bingalo",
    }

    public engPasswordReset = {
        forgotPasswordTitle: "Forgot Password - Bingalo", newPasswordEnter: "ENTER NEW PASSWORD", newPassword: "New Password",
        newPasswordAgain: "New Password (again)", success: "Success...", submit: "Submit",

    }

    public engPrivacy = {
        privacyPolicyTitle: "Privacy Policy - Bingalo",
    }

    public engRegister = {
        formBackground: "assets/images/formBackground.png", registerLogo: "assets/images/logo.svg", name: "NAME", fullNameMissing: "fullname is missing",
        userName: "USER NAME", email: "EMAIL", phoneNumber: "PHONE NUMBER", password: "PASSWORD",
        connectFBLogin: "By Clicking on “Login” or ”Connect with Facebook” you shall agree to the Bingalo", termsService: "Terms of Service",
        privacyPolicy: "Privacy Policy", and: "and", signUp: "SIGN UP", alreadyRegistered: "Already registered?", logIn: "Log In",
        signUpWith: "Sign Up with",
    }
    public engResetPassword = {
        passwordResetTitle: "Password reset - Bingalo", startBuyCrypto: "start buying and selling safe with crypto!",
        formBackground: "assets/images/formBackground.png", resetPasswordLogo: "assets/images/logo.svg", forgotPassword: "Forgot Password",
        recoverPassword: "Enter your email to recover your password", receiveLink: "You will receive a link to reset your password",
        email: "EMAIL", submit: "SUBMIT", resetPasswordlogoBottom: "assets/images/logo_bottom.svg",

    }

    public engSell = {
        sellTitle: "Bingalo - Buy. Sell. Simple.", browse: "Browse", noCategory: "no category", terms: "Terms", privacy: "Privacy",
        titleCopyRights: "© 2017 Bingalo, Inc.", sellStuff: "Sell your stuff",

    }
    public engSettings = {
        settingsTitle: "Account Settings - Bingalo", verifiedWith: "Verified With", settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg", settingspayOn: "assets/images/paypal_on.svg",
        settingspayOff: "assets/images/paypal_off.svg", posts: "Posts", followers: "Followers", following: "Following", selling: "SELLING",
        sold: "SOLD", favourites: "FAVOURITES", noListYet: "NO LISTINGS (YET!)", $: "$",

    }

    public engTerms = {
    }

    public engTrust = {
        trustTitle: "Trust - Bingalo", trust: "Trust", trustworthiness: "The most valuable currency",
        communityWorld: "in our marketplace is trust", buildLocalMarket: "We’re building a local marketplace where the",
        wellBeing: "well-being of buyers and sellers comes first", obsessingText: "We want Bingalo to be a place where buying and selling can be more rewarding. We'll keep obsessing over every detailof the experience so our buyers and sellers can connect with more confidence. And we'll keep holding ourselvesand our community to high standards",
        trustNeighbours: "Earn trust from each other", careVigilant: "Get to know other users", userProfiles: "User Profiles",
        profileOpportunity: "Your profile is your opportunity to introduce yourself to other members of the community",
        verificationID: "ID Verification", secureIdentity: "We securely validate your identity using your state ID and Facebook profile",
        userRatings: "User Ratings", seeHowMany: "See how many completed transactions users have and check out their average rating",
        appMessaging: "In-App Messaging", securelyCommunicate: "Securely communicate with buyers and sellers without giving away personal information",
        winningGame: "Learn buying and selling best practices", buyingTips: "Buying Tips",
        coverBasics: "Cover the basics of how to successfully inspect and purchase items from sellers on Bingalo",
        sellingTips: "Selling Tips", overBasics: "over the basics of how to successfully engage with buyers on Bingalo",
        letUsKnow: "Let us know if we can help", customerExperts: "Customer Care Experts",
        hereToHelp: "We are here to help solve problems and investigate issues when they arise. Please email for assistance",
        workClosely: "We work closely with our Law Enforcement Partners to ensure incidents requiring further investigation are handledaccordingly",
        assistLaw: "To learn more about how we assist Law Enforcement Officers, please visit ourLaw Enforcement Resource Page",
        haveQuestions: "Still have questions?", visitOur: "Visit our", helpCenter: "Help Center", learnMore: "to learn more",


    }

    public engverifyEmail = {
        verifyEmailTitle: "Verify-email - Bingalo", congratulationsVerified: "Congratulations, your email Id has been verified",

    }


    //for other langauge
    

    //language support

    //Isereli language support

    public engHeader1 =
{
         selectLang:"שפות",  languageOptions:[{lang:"Hebrew",checked:false,value:1},
         {lang:"English",checked:false,value:2}],
         language:"בחר שפות",
         logo: "assets/images/logo.svg", searchLine: "assets/images/searchLine.svg", whatLookingPlaceHolder: "מה אתה מחפש ", logOrCreateAccount: "תיכנס ותיצור את החשבון שלך ", 
         onTitle: "על בינגלו", aboutUs: "עלינו ", trustNSafe: "אמון וביטחון", howWorks: "איך זה עובד", need:"", Help: " צריך עזרה?", logOut: "יציאה מתוכנית", 
          login: "לוגאין", sellStuff: "למכור את הדברים שלך ", myProfile: "הפרופיל שלי", home: "בית", signUp: "להירשם ", backToTitle: 
        ",בחזרה לבינגו", 
        logoPng: "assets/images/logo.png", postIn30Secs: "פרסם את הפרטים שלך פחות מ30 שניות", 
        downloadTopRated: ", הורד את ה איוס או אנדרואיד אפליקציה לפרסם את הפריט שלך",     phoneNumber: ", מספר הטלפון", emailAddress: "אימייל כתובת", enterNumberCountryCode:
        ", בבקשה תנסה לכתוב את שמך המלא וגם את מספר הארץ",          send: "שלח", continueWebsite: "Continue Browsing Website", thankYou: "תודה ",takeFewMinutes: 
        ", זה אולי יקח כמה דקות עד שתקבל את זה",         checkInternetConnection: "בבקשה לבדוק את חיבור האינטרנט ולנסות שוב ",ok: "אוקי ",
        sessionTimedOut: "תם הזמן שהוקצב",timeToTitle: "לקנות ולמכור מהר, בזהירות ואופן מקומי זה הזמן לבינגלו",titleTag: "בינגלו ",
    }

public engHome1 = {
 titleBuySellSafe: "בינגלו פרסם, שוחח, קנה, ומוכר", bringCommunities: "הדרך הפשוטה ",        buySellFun: "לקנות ולמכור במקומי", cancel: ", בטל ", reset: "החזיר ", location: "מקום",     categories: ", קטגוריות",  showMore: "הראה עוד", showLess: "הראה פחות ", distance: ", מרחק", max: "מקסימום", Miles: "מיל",        noCategory: "בלי קטגוריה", sortBy: ", מיין לפי", newestFirst: "חדש ראשון ", closestFirst: "קרוב ראשון", lowToHighPrice: ": נמוך לגבוה",  highToLowPrice: "מכיר גבוה לנמוך ", postedWithin: ", נשלח לתוך", 
allListings: "כל הרשימות", last24Hours: "24 שעות אחרונות ",       
last7Days: " 7 ימים האחרונים", last30Days: "ה30 יום האחרונים", filters: "סינון", price: "מכיר", 
currency: "מטבע", from: "מ",  saveFilters: "שמור סינון", mike: "assets/images/mike.svg", miles: ", מילין ",
 noOffers: "אין מצואין מבצעים", sorryNotFound:
"סליחה, לא יכולנו למצוא את מה שאתה ",
downloader: "הורד אפליקציה", startPostingOffers: "להתחיל לפרסם הצעות עכשיו", trustByMillions: "מובטח על ידי מיליונים", 
blythe: "Blythe",robin: " רובין ", chris: "כריס", greg: "גרג", heidi: "היידי", krystal: "קריסטל",
readTitleStories: "קרא סיפורים על 'בינגלו",getApp: "קבל את האפליקציה",
joinMillions: ", אפליקציית הנייד בינגלו הדרך היותר פשוטה לקנות ולמכור מקומית ", loveJob: "אהוב את העבודה שלך! ", 
srAndroidEngineer: "סר. אנדרואיד מהנדס:", srBackendEngineer: "סר. צד הרשת מהנדס", 
seePositions: " ראה כל המעמדות", sendAppLink: ", שלח קישור לאפליקציה ", emailPlaceHolder: "your-email@domain.com",
provideValidEmail: ", בבקשה ספק כתובת אימייל ", howPhone: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/howPhone.png",
enterNumberCountryCode:"בבקשה תנסה לרשום שם מלאה ו מספר ארץ", recentRequestApp: "לאחרונה בקשתה ",
minsToReceive: "אולי יקח כמה דקות לקבל את זה ", wait5Mins: "5 בבקשה המתן  דקות",  makeOtherRequest: "לעשות עוד בקשה ", 
thankYou: " תודה ", 

    }

    public engAbout1 = {
        aboutUs: "לדעת עלינו", howWorks: "איך זה עובד ", createCommunities: "אנחנו מקבצים אנשים ביחד ", 
        comeTogetherSell: "לגלות שווי", ourStory: "הסיפור שלנו",  ceo:  "ארינה וון וילון מנ''ל ", 
        betterBuySell: "דרך טובה יותר לקנות ולמכור ", largeMarket: ", בינגלו הוא השוק הגדול ביותר בארצות הברית ", 
        topApp: "אפליקציה מספר 3 ", shopCategory: ", בקטגוריות הקניות", appYear: "אפליקצית השנה", geekWire: ",גייקוויר ", billion14: " 14 ביליון $", 
        transactionYear: " בעסקות השנה ", million23: " 23+ מיליון ", downloads: " הורדות", titleNews: "בינגלו בחדשות ", 
    }

    public engchangePassword1 = {
        changePassTitle: ", שנה סיסמה-בינגלו ", changePassword: " שנה סיסמה ", currentPassword: "הסיסמה הנוכחית ", 
        newPasswordAgain: "סיסמה חדשה שוב ", newPassword: "סיסמה חדשה", submit: "הגיש ", 
    }

    public engDiscussions1 = {
        titleBuySellSimple: "בינגלו מכר. קנה. פשוט",  myOffers: " ההצעות שלי",  keyBoard: "מקלדת ", twoHundred: "200", $: "$", 
        Jeffery: "גיפרי ", ago: "פעם", month: " חודש", one: "1",  hey: "היי ",replyToss: "ענה ל סס", send: " שלח ", report: "דיווח", sabari: ", סאבארי ", 
        whyreport: "למה אתה רוצה לדווח על פריט זה ", prohibited: "זה אסור על בינגלו ", offensive: "זה מעליב אותי ", 
        notReal: " זה לא פוסט אמיתי ", duplicate: " זה פוסט מעוטק ", wrongCategory: "זה בקטגוריה הלא נכונה", scam: "זה עשוי להיות הונאה ", 
        stolen: "זה עשוי להיות גנוב", other: "אחר  ", additionalNote: "הערה נוספת בבקשה כתוב כאן ", 
        done: " גמור ", 

    }

    public engEmailVerify1 = {
        verifyEmailTitle: "- בינגלו ", emailVerify: "ודא אימייל ", 
        Provide :"בבקשה ספק אימייל בר תוקף ", 
        submit: "שלח ", 


    }

    public engFooter1 = {
        logoBottom: "assets/images/logo_bottom.svg", buySellSafe: "קנה  פרסם, התכתב, מכר ", downloadApp: "הורדות אפליקציה ", 
        footerFB: "assets/images/fb.svg", footerInsta: "assets/images/insta.svg", footerTwitter: "assets/images/twitter.svg", aboutUs: "עלינו", howWorks: "איך זה עובד", terms: "תנאים והתניות",
        privacy: "פרטיות",  help: "עזרה", footerPlayStore: "assets/images/playstore.svg", footerAppStore: "assets/images/appstore.svg",

    }

    public engHowItWorks1 = {
        aboutUs: "עלינו", howItWorks: "איך זה עובד ", mobileCommerce: "קניה ומכירה בקלות", 
        startlessIn30Secs: "תתחיל לעבוד בעוד פחות משלושים",discoverLocally: "גלה מקומית", 
        browseMillionListings: ", גלוש במיליוני הרשימות למצוא פרטיים נפלאים קרוב אליך", chatInstantly: "התכתב מידית", 
        messageUsersAnonymously: "התכתב אם משתמשים אחרים בפרטיות ובטיחות מלאה דרך אפליקצית בינגלו. ואנשים שאתה מכיר", 
        sellSimpleVideo: "מכר מהר עם תמונות", easilyPost: "פרסם בקלות את הפרטים שלך למכירה דרך תמונה מ מהפלאפון שלך ", 
        buildTrustCommunity: "בנה קהילה מובטחת",  userProfiles: "פרופיל משתמש", knowMoreBuyers: "דע יותר על הקונים ומוכרים לפני שמתחילים", 
        userRatings: "דירוג משתמשים", checkBuyer: "בדוק דירוגים של קונים ומוכרים ותן דירוגים כשאתה מנהל עסק",  realTimeAlerts: ", התרעות בזמן אמת ", 
        getNotified: "קבל דיווח מידית על הפלאפון כשקונה או מוכר יוצר איתך קשר", 
        titleIs: "בינגלו זה", toDownload: "להוריד",   free: "בחינם", 
        download : "הורד את האפליקציה עכשיו 'ותתחיל ברגע זה", howItWorksPlayStore: "assets/images/playstore.svg", 
        howItWorksAppstore: "assets/images/appstore.svg", comingSoon: "מגיע בקרוב", thankYou: "תודה", 
        fewMinsReceive: "יקח קצת זמן לקבל את זה ", 

    }

    public engItem1 = {
        titleSimpleWayToBuy: "בינגלו זה הדרך הפשוטה ביותר לקנות ולמכור מקומית. הורד את האפליקציה בחינם ", itemAppStore: "assets/images/appstore.svg",
        itemPlayStore: "assets/images/playstore.svg", previous: "קודם", next: "הבא", postRemoved: "הופסט הוסר",  posted: "פורסם", 
        ago: "לשעבר", report: "דווח", description: "לאור", comments: "תגובות וביקורות", condition: "מצב", viewAll: "ראה הכל", 
        typeYourMessage: "כתוב הודעות", youHave: ", יש לך ", one120: "120",  characterLeft: " אותיות נותרות", 
        postComment: "פרסם  הערה",  myOtherOffers: "הצעות אחרות שלי", price: "מכיר", $: "$",  makeOffer: "עשה הצעה",follow: " עקוב", 
        following: "עוקב",unFollow: "הפסק עקיבה", watch: " מעודף ",watching: "מעודף", unWatch: " הפסק עדיפות", seller: "על המוכר ", 
       approximation:"קירוב", ProtectPrivacy:"להגן על הפרטיות ש", followers: "עוקבים ", readyBuyHit: "מוכן לקנות? עשה הצעה! ", 
        offer: "הצעה",notSure: "יש לך שאלה",  ask: "שאל", forMoreInfo: "את המוכר שאלה", offerSent: "הצעה נשלחה", orBetterDownloadApp: ", או יותר טוב, הורד את האפליקציה, זה מהיר יותר ", 
        getApp: "הורד את האפליקציה", 
        itemGooglePlay: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/google-play.svg",
        itemAppStore2: "https://d2qb2fbt5wuzik.cloudfront.net/Bingalowebsite/images/app-store.svg", soldBy: "נמכר מ", whyReport: "למה אתה רוצה לדוח על הפריט הזה", 
        additionalNote: "הערה נוספת", pleaseWriteNote: "בבקשה כתוב את דיווחה כאן ",done: " גמור ", reported: " דווח ", 
        thanksTakingTime: "תודה שלקחה זמן לדוח לנו", send: " שלח ", nowFollowing: "אתה לא עוקב", offers: " הצעות ", 
        follower: " עוקבים ", comingSoon: "מגיע בקרוב", thankYou: "תודה",  fewMinsReceive: "אולי יקח כמה דקות עד שתקבל את זה ", 
        enterQuestionPlaceHolder: " כתוב את שאלתך כאן ", lengthTextarea120: "120",  settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg"
    }

//     public engLogin1 = {
//         formBackground: "assets/images/formBackground.png", loginTo: "לוגאין ל", loginLogo: "assets/images/logo.svg", userName: " שם המשתמש ", 
//         passWord: ", סיסמה", byClicking: "על ידי לחיצה על כניסה או להתחבר לפיס בוק אתה מסקים לבינגלו", 
//         termsService: " תנאי השירות ", privacyPolicy: "מדיניות פרטיות", login: " כניסה ", notRegistered: "לא רשום?", 
//         signUp: "הירשם", forgotPassword: "שכחתה את הסיסמה?", reset: "החזיר", and: " ו- registerErrMsg: "fdgfdgfdg"
//     }

//     public engLogout = {
//     }

    public engMemberProfile1 = {
        profile: " פרופיל ", title: "בינגלו ", offers: "הצעות", $: "$",  seller: "על המוכר",followers: "עוקבים", follow: " עקוב", 
        following: " לעקוב", unFollow: "הפסק עקיבה ", bangaluru: "Bangaluru",  follower: "עוקב", 
    }

    public engneedHelp1 = {
        support: "עזרה- בינגלו", 
    }

    public engPasswordReset1 = {
        forgotPasswordTitle: "שכחה סיסמה- בינגלו", newPasswordEnter: "הכנס סיסמה חדשה", newPassword: "סיסמה חדשה ", 
        newPasswordAgain: "סיסמה חדשה שוב", success: "הצלחה", submit: "הגיש", 

    }

    public engPrivacy1 = {
        privacyPolicyTitle: "מדיניות פרטיות בינגלו", 
    }

    public engRegister1 = {
        formBackground: "assets/images/formBackground.png", registerLogo: "assets/images/logo.svg", name:  ", שם", fullNameMissing: "שם מלא חסר", 
        userName: "שם המשתמש", email: "אימייל", phoneNumber: "מספר הטלפון",password: "סיסמה", 
        connectFBLogin: "על ידי לחיצה על כניסה או להתחבר לפיס בוק אתה מסקים לבינגלו", termsService: "תנאי השירות", 
        privacyPolicy: "Privacy Policy", and: "ו", signUp: "הירשם", alreadyRegistered: "כבר רשום?",  logIn: "היכנס", 
        signUpWith: "הירשם עם", 
    }
    public engResetPassword1 = {
        passwordResetTitle: "סיסמה חדשה בינגלו", startBuyCrypto: "התחל לקנות ולמכור בטוח עם כריפטו ", 
        formBackground: "assets/images/formBackground.png", resetPasswordLogo: "assets/images/logo.svg", forgotPassword: " שכחתה סיסמה", 
        recoverPassword: " הכנס אימייל לשחזר סיסמה", receiveLink: "תקבל קישור לאיפוס הסיסמה שלך", 
        email: ", אימייל", submit: "הגיש", resetPasswordlogoBottom: "assets/images/logo_bottom.svg",

    }

    public engSell1 = {
        sellTitle: "בינגלו- קנה. מכר. בקלות ", browse: " גלוש ", noCategory: "אין קטגוריה", terms: "תנאים", privacy: "פרטיות", 
        titleCopyRights: "© 2017 Bingalo, Inc.", sellStuff: "מכר את הדברים שלך", 

    }
    public engSettings1 = {
        settingsTitle: "הגדרות חשבון - בינגלו", verifiedWith: "ודא עם",  settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg", settingspayOn: "assets/images/paypal_on.svg",
        settingspayOff: "assets/images/paypal_off.svg", posts: "פרסם",  followers: " עוקבים ", following: "עוקב ", selling: "מוכר: ", 
        sold: "נמכר",  favourites: ", מועדף", noListYet: "אין רשימות עדיין", $: "$", 

    }

    public engTerms1 = {
    }

    public engTrust1 = {
        trustTitle: " בטוח - בינגלו", trust: "בטח", trustworthiness: "המטבע הכי יקר", 
        communityWorld: "בשוק שלנו זה ביטחון", buildLocalMarket: ", אנחנו בונים שוק מקומי שבו", 
        wellBeing: "המצב של הקונים ומוכרים שלנו מגיע ראשון", obsessingText: "אנחנו רוצים שבינגלו יהיה מקום בו מכירות וקניות יהיו מספקים יותר. אנחנו נמשיך לבדוק כל נקודה בחויה בשביל שלוקחות שלנו יוכלו להתחבר עם יותר ביטחון", 
        trustNeighbours: "הרויח אמון אחד מהשני", careVigilant: ", תתחיל להכיר משתמשים אחרים", userProfiles: "פרופיל משתמש", 
        profileOpportunity: "הפרופיל שלך הוא הזדמנות בשבילך להציג את עצמך למשתמשים אחרים בסביבתך ", 
        verificationID: "תעודת זהות אמות", secureIdentity: "אנו מבטחים את הזהות שלך על ידי בתעודת הזהות והפייס בוק פרופיל.",
        userRatings: "User Ratings", seeHowMany: "תיראה כמה עסקות שלמות יש למשתמשים ובדוק את הממוצע של הנקודות שלהם ", 
        appMessaging: "התכתבות באפליקציה עצמה ", securelyCommunicate: ", תקשר עם מוכרים וקונים בדרך בטוחה בלי לתת מידע פרטי ", 
        winningGame: "תלמד איך למכור ולקנות בדרך הכי טובה", buyingTips: " טיפים לקנות ", 
        coverBasics: "לכסות את היסודות של איך להצליח לבדוק ולרכוש פריטים מן המוכרים בבינגלו", 
        sellingTips: "למכור טיפים", overBasics: " על היסודות של איך לעסוק בהצלחה עם קונים על בינגלו ", 
        letUsKnow: "תן לנו לדעת אם אנחנו יכולים לעזור", customerExperts: ", מומחי טיפול לקוחות ", 
        hereToHelp: "אנחנו כאן כדי לעזור לפתור בעיות ולחקור בעיות כאשר הם נובעים. אנא שלח אימייל לקבלת סיוע ", 
        workClosely: "אנו פועלים בשיתוף פעולה הדוק עם שוטפי אכיפת החוק שלנו כדי להבטיח שתרחישים הדורשים חקירה נוספת יטופלו בהתאם", 
        assistLaw:" ללמוד עוד על איך אנחנו עובדים עם החוקים, בבקשה תבקרו באתר שלנו על זה", 
        haveQuestions: "עדיין יש שאלות?",visitOur: "תבקר את ה", helpCenter: "מרכז עזרה", learnMore: "ללמוד עוד", 


    }

    public engverifyEmail1 = {
        verifyEmailTitle: "ודא אימייל בינגלו", congratulations:"מזל טוב", Verified: "ברכות ואיחולים, האימייל אידי אומת"
}
}
