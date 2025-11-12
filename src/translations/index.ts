export type Language = 'en' | 'ml' | 'ta' | 'kn';

export const translations = {
  en: {
    // Landing Page
    appTitle: 'BroCare',
    appTagline: 'Student Complaint & Grievance Management',
    appDescription: 'A safe, accessible, and transparent platform for Brototype students to raise concerns and track resolutions.',
    getStarted: 'Get Started',
    viewDashboard: 'View Dashboard',
    features: 'Features',
    secureAnonymous: 'Secure & Anonymous',
    secureAnonymousDesc: 'Submit complaints with complete anonymity and privacy protection',
    trackProgress: 'Track Progress',
    trackProgressDesc: 'Monitor your complaint status in real-time with transparent updates',
    transparentSystem: 'Transparent System',
    transparentSystemDesc: 'Full visibility into complaint handling and resolution process',
    instantNotifications: 'Instant Notifications',
    instantNotificationsDesc: 'Get notified via email, SMS, and WhatsApp for status updates',
    readyToStart: 'Ready to make your voice heard?',
    readyToStartDesc: 'Submit your first complaint and track its resolution journey',
    submitComplaint: 'Submit Complaint',
    
    // Auth Page
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    studentId: 'Student ID',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Dashboard
    dashboard: 'Dashboard',
    myComplaints: 'My Complaints',
    adminPanel: 'Admin Panel',
    signOut: 'Sign Out',
    newComplaint: 'New Complaint',
    totalComplaints: 'Total Complaints',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    noComplaints: 'No complaints yet',
    noComplaintsDesc: 'Submit your first complaint to get started',
    viewDetails: 'View Details',
    
    // Admin Dashboard
    complaintManagement: 'Complaint Management',
    allComplaints: 'All Complaints',
    pending: 'Pending',
    submitted: 'Submitted',
    inReview: 'In Review',
    backToDashboard: 'Back to Dashboard',
    category: 'Category',
    priority: 'Priority',
    status: 'Status',
    submittedBy: 'Submitted By',
    submittedOn: 'Submitted On',
    actions: 'Actions',
    anonymous: 'Anonymous',
    updateStatus: 'Update Status',
    
    // Submit Complaint
    submitNewComplaint: 'Submit New Complaint',
    complaintTitle: 'Complaint Title',
    description: 'Description',
    location: 'Location',
    incidentDate: 'Incident Date',
    submitAnonymously: 'Submit Anonymously',
    submitAnonymouslyDesc: 'Your identity will be hidden from staff',
    submit: 'Submit',
    submitting: 'Submitting...',
    
    // Categories
    academic: 'Academic',
    hostel: 'Hostel',
    canteen: 'Canteen',
    harassment: 'Harassment',
    infrastructure: 'Infrastructure',
    other: 'Other',
    
    // Priority
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Status
    submitted_status: 'Submitted',
    inReview_status: 'In Review',
    resolved_status: 'Resolved',
    
    // Common
    loading: 'Loading...',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
  },
  ml: {
    // Landing Page
    appTitle: 'ബ്രോകെയർ',
    appTagline: 'വിദ്യാർത്ഥി പരാതി & ക്ലേശം പരിഹാര സംവിധാനം',
    appDescription: 'ബ്രോടോടൈപ്പ് വിദ്യാർത്ഥികൾക്ക് ആശങ്കകൾ ഉന്നയിക്കാനും പരിഹാരങ്ങൾ ട്രാക്ക് ചെയ്യാനും സുരക്ഷിതവും പ്രവേശനക്ഷമവുമായ ഒരു പ്ലാറ്റ്ഫോം.',
    getStarted: 'ആരംഭിക്കുക',
    viewDashboard: 'ഡാഷ്ബോർഡ് കാണുക',
    features: 'സവിശേഷതകൾ',
    secureAnonymous: 'സുരക്ഷിതവും അജ്ഞാതവും',
    secureAnonymousDesc: 'പൂർണ്ണ അജ്ഞാതത്വത്തോടും സ്വകാര്യത സംരക്ഷണത്തോടും കൂടി പരാതികൾ സമർപ്പിക്കുക',
    trackProgress: 'പുരോഗതി ട്രാക്ക് ചെയ്യുക',
    trackProgressDesc: 'തത്സമയ അപ്ഡേറ്റുകളോടെ നിങ്ങളുടെ പരാതി സ്ഥിതി നിരീക്ഷിക്കുക',
    transparentSystem: 'സുതാര്യമായ സംവിധാനം',
    transparentSystemDesc: 'പരാതി കൈകാര്യം ചെയ്യലിനും പരിഹാര പ്രക്രിയയിലും പൂർണ്ണ ദൃശ്യത',
    instantNotifications: 'തൽക്ഷണ അറിയിപ്പുകൾ',
    instantNotificationsDesc: 'സ്റ്റാറ്റസ് അപ്ഡേറ്റുകൾക്കായി ഇമെയിൽ, SMS, WhatsApp വഴി അറിയിപ്പ് നേടുക',
    readyToStart: 'നിങ്ങളുടെ ശബ്ദം കേൾക്കാൻ തയ്യാറാണോ?',
    readyToStartDesc: 'നിങ്ങളുടെ ആദ്യ പരാതി സമർപ്പിച്ച് അതിന്റെ പരിഹാര യാത്ര ട്രാക്ക് ചെയ്യുക',
    submitComplaint: 'പരാതി സമർപ്പിക്കുക',
    
    // Auth Page
    signIn: 'സൈൻ ഇൻ',
    signUp: 'സൈൻ അപ്പ്',
    email: 'ഇമെയിൽ',
    password: 'പാസ്‌വേഡ്',
    fullName: 'മുഴുവൻ പേര്',
    studentId: 'വിദ്യാർത്ഥി ഐഡി',
    dontHaveAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
    alreadyHaveAccount: 'അക്കൗണ്ട് ഉണ്ടോ?',
    
    // Dashboard
    dashboard: 'ഡാഷ്ബോർഡ്',
    myComplaints: 'എന്റെ പരാതികൾ',
    adminPanel: 'അഡ്മിൻ പാനൽ',
    signOut: 'സൈൻ ഔട്ട്',
    newComplaint: 'പുതിയ പരാതി',
    totalComplaints: 'മൊത്തം പരാതികൾ',
    inProgress: 'പുരോഗമിക്കുന്നു',
    resolved: 'പരിഹരിച്ചു',
    noComplaints: 'ഇതുവരെ പരാതികളില്ല',
    noComplaintsDesc: 'ആരംഭിക്കാൻ നിങ്ങളുടെ ആദ്യ പരാതി സമർപ്പിക്കുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    
    // Admin Dashboard
    complaintManagement: 'പരാതി മാനേജ്മെന്റ്',
    allComplaints: 'എല്ലാ പരാതികളും',
    pending: 'തീർപ്പാക്കാത്തത്',
    submitted: 'സമർപ്പിച്ചു',
    inReview: 'അവലോകനത്തിൽ',
    backToDashboard: 'ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക',
    category: 'വിഭാഗം',
    priority: 'മുൻഗണന',
    status: 'സ്ഥിതി',
    submittedBy: 'സമർപ്പിച്ചത്',
    submittedOn: 'സമർപ്പിച്ച തീയതി',
    actions: 'പ്രവർത്തനങ്ങൾ',
    anonymous: 'അജ്ഞാതം',
    updateStatus: 'സ്റ്റാറ്റസ് അപ്ഡേറ്റ് ചെയ്യുക',
    
    // Submit Complaint
    submitNewComplaint: 'പുതിയ പരാതി സമർപ്പിക്കുക',
    complaintTitle: 'പരാതി ശീർഷകം',
    description: 'വിവരണം',
    location: 'സ്ഥലം',
    incidentDate: 'സംഭവ തീയതി',
    submitAnonymously: 'അജ്ഞാതമായി സമർപ്പിക്കുക',
    submitAnonymouslyDesc: 'നിങ്ങളുടെ ഐഡന്റിറ്റി സ്റ്റാഫിൽ നിന്ന് മറയ്ക്കപ്പെടും',
    submit: 'സമർപ്പിക്കുക',
    submitting: 'സമർപ്പിക്കുന്നു...',
    
    // Categories
    academic: 'അക്കാദമിക്',
    hostel: 'ഹോസ്റ്റൽ',
    canteen: 'കാന്റീൻ',
    harassment: 'ഉപദ്രവം',
    infrastructure: 'അടിസ്ഥാന സൗകര്യം',
    other: 'മറ്റുള്ളവ',
    
    // Priority
    low: 'കുറഞ്ഞ',
    medium: 'ഇടത്തരം',
    high: 'ഉയർന്ന',
    
    // Status
    submitted_status: 'സമർപ്പിച്ചു',
    inReview_status: 'അവലോകനത്തിൽ',
    resolved_status: 'പരിഹരിച്ചു',
    
    // Common
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    cancel: 'റദ്ദാക്കുക',
    save: 'സംരക്ഷിക്കുക',
    delete: 'ഇല്ലാതാക്കുക',
    edit: 'എഡിറ്റ് ചെയ്യുക',
  },
  ta: {
    // Landing Page
    appTitle: 'ப்ரோகேர்',
    appTagline: 'மாணவர் புகார் & குறைதீர்ப்பு மேலாண்மை',
    appDescription: 'ப்ரோடோடைப் மாணவர்கள் கவலைகளை எழுப்பவும் தீர்வுகளைக் கண்காணிக்கவும் பாதுகாப்பான, அணுகக்கூடிய தளம்.',
    getStarted: 'தொடங்குக',
    viewDashboard: 'டாஷ்போர்டைக் காண்க',
    features: 'அம்சங்கள்',
    secureAnonymous: 'பாதுகாப்பான & அநாமதேய',
    secureAnonymousDesc: 'முழு அநாமதேயம் மற்றும் தனியுரிமை பாதுகாப்புடன் புகார்களைச் சமர்ப்பிக்கவும்',
    trackProgress: 'முன்னேற்றத்தைக் கண்காணிக்கவும்',
    trackProgressDesc: 'வெளிப்படையான புதுப்பிப்புகளுடன் உங்கள் புகார் நிலையை நிகழ்நேரத்தில் கண்காணிக்கவும்',
    transparentSystem: 'வெளிப்படையான அமைப்பு',
    transparentSystemDesc: 'புகார் கையாளுதல் மற்றும் தீர்வு செயல்முறையில் முழு பார்வை',
    instantNotifications: 'உடனடி அறிவிப்புகள்',
    instantNotificationsDesc: 'நிலை புதுப்பிப்புகளுக்கு மின்னஞ்சல், SMS, WhatsApp வழியாக அறிவிப்பைப் பெறுங்கள்',
    readyToStart: 'உங்கள் குரலைக் கேட்க தயாரா?',
    readyToStartDesc: 'உங்கள் முதல் புகாரைச் சமர்ப்பித்து அதன் தீர்வு பயணத்தைக் கண்காணிக்கவும்',
    submitComplaint: 'புகாரைச் சமர்ப்பிக்கவும்',
    
    // Auth Page
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    studentId: 'மாணவர் அடையாளம்',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    
    // Dashboard
    dashboard: 'டாஷ்போர்டு',
    myComplaints: 'எனது புகார்கள்',
    adminPanel: 'நிர்வாகப் பலகம்',
    signOut: 'வெளியேறு',
    newComplaint: 'புதிய புகார்',
    totalComplaints: 'மொத்த புகார்கள்',
    inProgress: 'நடைபெறுகிறது',
    resolved: 'தீர்க்கப்பட்டது',
    noComplaints: 'இன்னும் புகார்கள் இல்லை',
    noComplaintsDesc: 'தொடங்க உங்கள் முதல் புகாரைச் சமர்ப்பிக்கவும்',
    viewDetails: 'விவரங்களைக் காண்க',
    
    // Admin Dashboard
    complaintManagement: 'புகார் மேலாண்மை',
    allComplaints: 'அனைத்து புகார்களும்',
    pending: 'நிலுவையில்',
    submitted: 'சமர்ப்பிக்கப்பட்டது',
    inReview: 'மதிப்பாய்வில்',
    backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
    category: 'வகை',
    priority: 'முன்னுரிமை',
    status: 'நிலை',
    submittedBy: 'சமர்ப்பித்தவர்',
    submittedOn: 'சமர்ப்பித்த தேதி',
    actions: 'செயல்கள்',
    anonymous: 'அநாமதேய',
    updateStatus: 'நிலையைப் புதுப்பிக்கவும்',
    
    // Submit Complaint
    submitNewComplaint: 'புதிய புகாரைச் சமர்ப்பிக்கவும்',
    complaintTitle: 'புகார் தலைப்பு',
    description: 'விளக்கம்',
    location: 'இடம்',
    incidentDate: 'சம்பவ தேதி',
    submitAnonymously: 'அநாமதேயமாக சமர்ப்பிக்கவும்',
    submitAnonymouslyDesc: 'உங்கள் அடையாளம் ஊழியர்களிடமிருந்து மறைக்கப்படும்',
    submit: 'சமர்ப்பிக்கவும்',
    submitting: 'சமர்ப்பிக்கிறது...',
    
    // Categories
    academic: 'கல்வி',
    hostel: 'விடுதி',
    canteen: 'உணவகம்',
    harassment: 'துன்புறுத்தல்',
    infrastructure: 'உள்கட்டமைப்பு',
    other: 'மற்றவை',
    
    // Priority
    low: 'குறைவு',
    medium: 'நடுத்தர',
    high: 'அதிக',
    
    // Status
    submitted_status: 'சமர்ப்பிக்கப்பட்டது',
    inReview_status: 'மதிப்பாய்வில்',
    resolved_status: 'தீர்க்கப்பட்டது',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    cancel: 'ரத்துசெய்',
    save: 'சேமி',
    delete: 'நீக்கு',
    edit: 'திருத்து',
  },
  kn: {
    // Landing Page
    appTitle: 'ಬ್ರೋಕೇರ್',
    appTagline: 'ವಿದ್ಯಾರ್ಥಿ ದೂರು & ಕುಂದುಕೊರತೆ ನಿರ್ವಹಣೆ',
    appDescription: 'ಬ್ರೋಟೋಟೈಪ್ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಾಳಜಿಗಳನ್ನು ಎತ್ತಲು ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಸುರಕ್ಷಿತ, ಪ್ರವೇಶಿಸಬಹುದಾದ ವೇದಿಕೆ.',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    viewDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ',
    features: 'ವೈಶಿಷ್ಟ್ಯಗಳು',
    secureAnonymous: 'ಸುರಕ್ಷಿತ & ಅನಾಮಧೇಯ',
    secureAnonymousDesc: 'ಸಂಪೂರ್ಣ ಅನಾಮಧೇಯತೆ ಮತ್ತು ಗೌಪ್ಯತೆ ರಕ್ಷಣೆಯೊಂದಿಗೆ ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸಿ',
    trackProgress: 'ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    trackProgressDesc: 'ಪಾರದರ್ಶಕ ನವೀಕರಣಗಳೊಂದಿಗೆ ನಿಮ್ಮ ದೂರು ಸ್ಥಿತಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
    transparentSystem: 'ಪಾರದರ್ಶಕ ವ್ಯವಸ್ಥೆ',
    transparentSystemDesc: 'ದೂರು ನಿರ್ವಹಣೆ ಮತ್ತು ಪರಿಹಾರ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಸಂಪೂರ್ಣ ಗೋಚರತೆ',
    instantNotifications: 'ತ್ವರಿತ ಅಧಿಸೂಚನೆಗಳು',
    instantNotificationsDesc: 'ಸ್ಥಿತಿ ನವೀಕರಣಗಳಿಗಾಗಿ ಇಮೇಲ್, SMS, WhatsApp ಮೂಲಕ ಅಧಿಸೂಚನೆಯನ್ನು ಪಡೆಯಿರಿ',
    readyToStart: 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಕೇಳಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    readyToStartDesc: 'ನಿಮ್ಮ ಮೊದಲ ದೂರನ್ನು ಸಲ್ಲಿಸಿ ಮತ್ತು ಅದರ ಪರಿಹಾರ ಪ್ರಯಾಣವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    submitComplaint: 'ದೂರನ್ನು ಸಲ್ಲಿಸಿ',
    
    // Auth Page
    signIn: 'ಸೈನ್ ಇನ್',
    signUp: 'ಸೈನ್ ಅಪ್',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    studentId: 'ವಿದ್ಯಾರ್ಥಿ ID',
    dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
    
    // Dashboard
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    myComplaints: 'ನನ್ನ ದೂರುಗಳು',
    adminPanel: 'ನಿರ್ವಾಹಕ ಫಲಕ',
    signOut: 'ಸೈನ್ ಔಟ್',
    newComplaint: 'ಹೊಸ ದೂರು',
    totalComplaints: 'ಒಟ್ಟು ದೂರುಗಳು',
    inProgress: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    resolved: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    noComplaints: 'ಇನ್ನೂ ದೂರುಗಳಿಲ್ಲ',
    noComplaintsDesc: 'ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಮೊದಲ ದೂರನ್ನು ಸಲ್ಲಿಸಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    
    // Admin Dashboard
    complaintManagement: 'ದೂರು ನಿರ್ವಹಣೆ',
    allComplaints: 'ಎಲ್ಲಾ ದೂರುಗಳು',
    pending: 'ಬಾಕಿ ಉಳಿದಿದೆ',
    submitted: 'ಸಲ್ಲಿಸಲಾಗಿದೆ',
    inReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    backToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    category: 'ವರ್ಗ',
    priority: 'ಆದ್ಯತೆ',
    status: 'ಸ್ಥಿತಿ',
    submittedBy: 'ಸಲ್ಲಿಸಿದವರು',
    submittedOn: 'ಸಲ್ಲಿಸಿದ ದಿನಾಂಕ',
    actions: 'ಕ್ರಿಯೆಗಳು',
    anonymous: 'ಅನಾಮಧೇಯ',
    updateStatus: 'ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಿ',
    
    // Submit Complaint
    submitNewComplaint: 'ಹೊಸ ದೂರನ್ನು ಸಲ್ಲಿಸಿ',
    complaintTitle: 'ದೂರು ಶೀರ್ಷಿಕೆ',
    description: 'ವಿವರಣೆ',
    location: 'ಸ್ಥಳ',
    incidentDate: 'ಘಟನೆ ದಿನಾಂಕ',
    submitAnonymously: 'ಅನಾಮಧೇಯವಾಗಿ ಸಲ್ಲಿಸಿ',
    submitAnonymouslyDesc: 'ನಿಮ್ಮ ಗುರುತನ್ನು ಸಿಬ್ಬಂದಿಯಿಂದ ಮರೆಮಾಡಲಾಗುತ್ತದೆ',
    submit: 'ಸಲ್ಲಿಸಿ',
    submitting: 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...',
    
    // Categories
    academic: 'ಶೈಕ್ಷಣಿಕ',
    hostel: 'ಹಾಸ್ಟೆಲ್',
    canteen: 'ಕ್ಯಾಂಟೀನ್',
    harassment: 'ಕಿರುಕುಳ',
    infrastructure: 'ಮೂಲಸೌಕರ್ಯ',
    other: 'ಇತರೆ',
    
    // Priority
    low: 'ಕಡಿಮೆ',
    medium: 'ಮಧ್ಯಮ',
    high: 'ಹೆಚ್ಚು',
    
    // Status
    submitted_status: 'ಸಲ್ಲಿಸಲಾಗಿದೆ',
    inReview_status: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    resolved_status: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    
    // Common
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    cancel: 'ರದ್ದುಗೊಳಿಸಿ',
    save: 'ಉಳಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    edit: 'ಸಂಪಾದಿಸಿ',
  },
};
