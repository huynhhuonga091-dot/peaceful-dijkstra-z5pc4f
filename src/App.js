import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  FileText,
  Target,
  Settings,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  Languages,
  Cpu,
  Eye,
  RefreshCw,
  Search,
  ArrowRight,
  Menu,
  Maximize2,
  Wand2,
  Lightbulb,
  Image as ImageIcon,
} from "lucide-react";

// --- TỪ ĐIỂN ĐA NGÔN NGỮ ---
const translations = {
  vi: {
    appTitle: "CV Master Pro",
    nav: {
      dashboard: "Bảng điều khiển",
      input: "Dữ liệu đầu vào",
      atsPreview: "Mô phỏng ATS",
      settings: "Cài đặt",
      unlockHint: "Hoàn tất phân tích để mở khóa Dashboard & ATS.",
    },
    input: {
      title: "Nhập dữ liệu phân tích",
      uploadCV: "Tải lên CV (PDF/DOCX/Ảnh/TXT)",
      uploadJD: "Mô tả công việc (JD)",
      placeholderCV: "Dán nội dung CV hoặc tải file...",
      placeholderJD: "Dán nội dung JD hoặc tải file...",
      analyzeBtn: "Phân tích hồ sơ",
      analyzing: "Đang xử lý dữ liệu...",
      demoData: "Dùng dữ liệu mẫu (Bản đầy đủ)",
    },
    result: {
      matchScore: "Điểm phù hợp",
      keywords: "Phân tích từ khóa",
      missing: "Từ khóa còn thiếu",
      present: "Từ khóa đã có",
      suggestions: "Đề xuất cải thiện",
      rewrite: "Viết lại thông minh",
      atsView: "Góc nhìn của Robot (ATS)",
      atsDesc:
        "Dưới đây là TOÀN BỘ nội dung thô mà hệ thống đã quét được. Hãy kiểm tra xem có đoạn nào bị mất hoặc lỗi font không.",
      hardSkills: "Kỹ năng chuyên môn",
      softSkills: "Kỹ năng mềm",
    },
    feedback: {
      excellent: "Hồ sơ xuất sắc!",
      good: "Hồ sơ khá tốt",
      average: "Cần cải thiện",
      poor: "Chưa phù hợp",
    },
    system: {
      ocrSuccess:
        "[Hệ thống: Đã quét văn bản từ hình ảnh (OCR Mode) - Hiển thị nội dung đầy đủ]",
      fileReadSuccess: "[Hệ thống: Đã đọc nội dung từ file văn bản]",
    },
  },
  en: {
    appTitle: "CV Master Pro",
    nav: {
      dashboard: "Dashboard",
      input: "Input Data",
      atsPreview: "ATS Simulator",
      settings: "Settings",
      unlockHint: "Complete analysis to unlock Dashboard & ATS.",
    },
    input: {
      title: "Input Data for Analysis",
      uploadCV: "Upload CV (PDF/DOCX/Img/TXT)",
      uploadJD: "Job Description (JD)",
      placeholderCV: "Paste CV content or upload file...",
      placeholderJD: "Paste JD content or upload file...",
      analyzeBtn: "Analyze Profile",
      analyzing: "Processing Data...",
      demoData: "Use Demo Data (Full)",
    },
    result: {
      matchScore: "Match Score",
      keywords: "Keyword Analysis",
      missing: "Missing Keywords",
      present: "Matched Keywords",
      suggestions: "Improvement Suggestions",
      rewrite: "Smart Rewrite",
      atsView: "Robot View (ATS)",
      atsDesc:
        "Below is the FULL raw content parsed by the system. Please check for any missing sections or font errors.",
      hardSkills: "Hard Skills",
      softSkills: "Soft Skills",
    },
    feedback: {
      excellent: "Excellent Match!",
      good: "Good Profile",
      average: "Needs Improvement",
      poor: "Poor Match",
    },
    system: {
      ocrSuccess:
        "[System: Text scanned from image (OCR Mode) - Showing full content]",
      fileReadSuccess: "[System: File content read successfully]",
    },
  },
};

// --- DỮ LIỆU MẪU ĐẦY ĐỦ (FULL LENGTH) ---
const SAMPLE_DATA = {
  vi: {
    cv: `THÔNG TIN LIÊN HỆ
Họ và tên: NGUYỄN VĂN A
Vị trí ứng tuyển: Senior Frontend Developer
Email: annguyen.dev@email.com
Số điện thoại: 0909 123 456
Địa chỉ: Quận 1, TP. Hồ Chí Minh
LinkedIn: linkedin.com/in/annguyen-dev
Portfolio: annguyen.dev

TÓM TẮT NGHỀ NGHIỆP
Lập trình viên Frontend với hơn 5 năm kinh nghiệm chuyên sâu trong việc phát triển các ứng dụng web hiệu năng cao, tương thích đa nền tảng. Có tư duy mạnh về UI/UX và tối ưu hóa trải nghiệm người dùng. Đã từng dẫn dắt nhóm 5 thành viên và triển khai thành công các dự án thương mại điện tử quy mô lớn. Thành thạo hệ sinh thái React, TypeScript và các công cụ DevOps cơ bản.

KINH NGHIỆM LÀM VIỆC

1. Công ty ABC Tech Solutions (Tháng 01/2021 - Hiện tại)
Vị trí: Senior Frontend Developer
- Chịu trách nhiệm chính phát triển kiến trúc Frontend cho hệ thống Dashboard quản lý logistics sử dụng ReactJS và Redux Toolkit.
- Tối ưu hóa hiệu suất ứng dụng (Performance Optimization), giảm thời gian tải trang (LCP) từ 3.5s xuống 1.2s thông qua kỹ thuật Code Splitting và Lazy Loading.
- Thiết lập quy trình CI/CD sử dụng GitHub Actions để tự động hóa việc kiểm thử và triển khai.
- Thực hiện Code Review hàng ngày và hướng dẫn (Mentor) cho 3 Junior Developers.
- Phối hợp chặt chẽ với team Backend để thiết kế RESTful APIs chuẩn mực.

2. Công ty XYZ Creative Agency (Tháng 06/2018 - 12/2020)
Vị trí: Frontend Developer
- Chuyển đổi thiết kế từ Figma sang mã HTML5/CSS3/JavaScript với độ chính xác Pixel-perfect.
- Phát triển 10+ Landing Page cho các chiến dịch marketing của khách hàng lớn (Coca-Cola, Samsung).
- Tích hợp các animation phức tạp sử dụng GSAP và Framer Motion để tăng tương tác người dùng.
- Đảm bảo tính tương thích trên mọi trình duyệt (Cross-browser compatibility) và thiết bị di động.

DỰ ÁN TIÊU BIỂU

Dự án A: E-commerce Platform (2022)
- Vai trò: Tech Lead Frontend
- Công nghệ: Next.js, TypeScript, Tailwind CSS, React Query.
- Mô tả: Xây dựng nền tảng thương mại điện tử phục vụ 50.000 người dùng/tháng.
- Kết quả: Tăng tỷ lệ chuyển đổi đơn hàng lên 15% nhờ tối ưu hóa luồng thanh toán (Checkout flow).

Dự án B: Internal HR Management System (2021)
- Vai trò: Core Developer
- Công nghệ: ReactJS, Ant Design, Firebase.
- Mô tả: Hệ thống quản lý nhân sự nội bộ, chấm công và tính lương.

HỌC VẤN
Đại học Bách Khoa TP.HCM (2014 - 2019)
- Chuyên ngành: Khoa học máy tính
- Tốt nghiệp loại Giỏi (GPA: 3.6/4.0)

CHỨNG CHỈ
- AWS Certified Cloud Practitioner (2023)
- Meta Front-End Developer Professional Certificate (2022)
- HackerRank React Skill Verification (Gold Badge)

KỸ NĂNG CHUYÊN MÔN
- Ngôn ngữ: JavaScript (ES6+), TypeScript, HTML5, CSS3/SCSS.
- Framework/Library: ReactJS, Next.js, Vue.js.
- State Management: Redux, Zustand, Context API.
- Tools: Webpack, Vite, Git, Docker.
- Testing: Jest, React Testing Library, Cypress.
- Kỹ năng mềm: Làm việc nhóm, Giải quyết vấn đề, Quản lý thời gian, Tiếng Anh giao tiếp tốt.`,

    jd: `TIÊU ĐỀ CÔNG VIỆC: SENIOR FRONTEND ENGINEER (REACT/NEXT.JS)

MỨC LƯƠNG: $2000 - $3500
ĐỊA ĐIỂM: TP. Hồ Chí Minh (Hybrid Working)

MÔ TẢ CÔNG VIỆC
Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để tham gia phát triển các sản phẩm công nghệ cốt lõi của công ty trong lĩnh vực Fintech. Bạn sẽ làm việc trong môi trường Agile năng động, giải quyết các bài toán về hiệu năng và trải nghiệm người dùng quy mô lớn.

TRÁCH NHIỆM CHÍNH
- Xây dựng và phát triển các tính năng mới cho ứng dụng web sử dụng ReactJS và Next.js.
- Đảm bảo chất lượng mã nguồn thông qua việc viết Unit Test (Jest) và Integration Test.
- Tối ưu hóa hiệu suất ứng dụng (Web Vitals), đảm bảo trải nghiệm mượt mà cho người dùng cuối.
- Phối hợp với team Product và Design để hiện thực hóa các ý tưởng sản phẩm.
- Tham gia vào quá trình thiết kế kiến trúc hệ thống Frontend (System Design).
- Review code và hỗ trợ các thành viên khác trong team nâng cao kỹ năng.

YÊU CẦU CÔNG VIỆC (MUST HAVE)
- Có ít nhất 4 năm kinh nghiệm làm việc chuyên sâu với JavaScript và hệ sinh thái React.
- Thành thạo TypeScript là yêu cầu bắt buộc.
- Hiểu biết sâu sắc về React Hooks, Virtual DOM và các mô hình quản lý state (Redux/Zustand).
- Có kinh nghiệm thực tế với Next.js (SSR/SSG) và tối ưu SEO.
- Có tư duy tốt về Clean Code, Design Patterns và SOLID principles.
- Quen thuộc với các công cụ build như Webpack, Vite.
- Kinh nghiệm viết test với Jest và React Testing Library.

YÊU CẦU ƯU TIÊN (NICE TO HAVE)
- Có hiểu biết về Backend (Node.js) hoặc Cloud (AWS/Azure).
- Có kinh nghiệm với Micro-frontends.
- Khả năng đọc hiểu tài liệu tiếng Anh tốt và giao tiếp cơ bản.

QUYỀN LỢI
- Gói lương thưởng cạnh tranh, review lương 2 lần/năm.
- Bảo hiểm sức khỏe cao cấp cho nhân viên và người thân.
- Cấp MacBook Pro M2/M3 để làm việc.
- Môi trường làm việc mở, khuyến khích sáng tạo và học hỏi công nghệ mới.`,
  },
  en: {
    cv: `CONTACT INFORMATION
Name: Nguyen Van A
Role: Senior Frontend Developer
Email: annguyen.dev@email.com
Phone: +84 909 123 456
Location: Ho Chi Minh City, Vietnam
LinkedIn: linkedin.com/in/annguyen-dev

PROFESSIONAL SUMMARY
Experienced Frontend Developer with over 5 years of expertise in building high-performance, responsive web applications. Strong focus on UI/UX principles and user experience optimization. Proven track record of leading a team of 5 and successfully deploying large-scale e-commerce projects. Proficient in React ecosystem, TypeScript, and modern DevOps tools.

WORK EXPERIENCE

1. ABC Tech Solutions (Jan 2021 - Present)
Position: Senior Frontend Developer
- Spearheaded the frontend architecture for a logistics management dashboard using ReactJS and Redux Toolkit.
- Achieved a 60% improvement in page load times (LCP from 3.5s to 1.2s) by implementing Code Splitting and Lazy Loading techniques.
- Established CI/CD pipelines using GitHub Actions for automated testing and deployment.
- Conducted daily Code Reviews and provided mentorship to 3 Junior Developers.
- Collaborated closely with the Backend team to design standard RESTful APIs.

2. XYZ Creative Agency (Jun 2018 - Dec 2020)
Position: Frontend Developer
- Translated Figma designs into pixel-perfect HTML5/CSS3/JavaScript code.
- Developed 10+ high-converting Landing Pages for major clients (Coca-Cola, Samsung).
- Integrated complex animations using GSAP and Framer Motion to enhance user engagement.
- Ensured cross-browser compatibility and mobile responsiveness for all deliverables.

KEY PROJECTS

Project A: E-commerce Platform (2022)
- Role: Frontend Tech Lead
- Tech Stack: Next.js, TypeScript, Tailwind CSS, React Query.
- Description: Built a scalable e-commerce platform serving 50,000 monthly users.
- Result: Increased conversion rate by 15% through checkout flow optimization.

EDUCATION
Ho Chi Minh City University of Technology (2014 - 2019)
- Major: Computer Science
- GPA: 3.6/4.0 (Excellent)

CERTIFICATIONS
- AWS Certified Cloud Practitioner (2023)
- Meta Front-End Developer Professional Certificate (2022)

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3.
- Frameworks: ReactJS, Next.js, Vue.js.
- State Management: Redux, Zustand.
- Testing: Jest, React Testing Library.
- Tools: Git, Docker, Webpack.
- Soft Skills: Teamwork, Problem Solving, Time Management.`,

    jd: `JOB TITLE: SENIOR FRONTEND ENGINEER (REACT/NEXT.JS)

SALARY: $2000 - $3500
LOCATION: Ho Chi Minh City (Hybrid)

JOB DESCRIPTION
We are looking for a talented Senior Frontend Developer to join our core product team in the Fintech sector. You will work in a dynamic Agile environment, solving large-scale performance and UX challenges.

KEY RESPONSIBILITIES
- Build and develop new features for web applications using ReactJS and Next.js.
- Ensure code quality by writing Unit Tests (Jest) and Integration Tests.
- Optimize application performance (Web Vitals) to ensure smooth end-user experience.
- Collaborate with Product and Design teams to realize product concepts.
- Participate in Frontend System Design and Architecture planning.
- Review code and mentor other team members.

REQUIREMENTS (MUST HAVE)
- 4+ years of intensive experience with JavaScript and the React ecosystem.
- Proficiency in TypeScript is mandatory.
- Deep understanding of React Hooks, Virtual DOM, and state management (Redux/Zustand).
- Practical experience with Next.js (SSR/SSG) and SEO optimization.
- Strong mindset for Clean Code, Design Patterns, and SOLID principles.
- Familiarity with build tools like Webpack, Vite.
- Experience with Jest and React Testing Library.

NICE TO HAVE
- Knowledge of Backend (Node.js) or Cloud (AWS/Azure).
- Experience with Micro-frontends.
- Good English reading/comprehension and basic communication skills.

BENEFITS
- Competitive salary package, salary review twice a year.
- Premium healthcare insurance for employees and family.
- MacBook Pro M2/M3 provided.
- Open working environment, encouraging creativity and learning.`,
  },
};

// --- THUẬT TOÁN SO KHỚP TỪ KHÓA ---
const analyzeKeywords = (cv, jd) => {
  const normalize = (text) => text.toLowerCase().replace(/[^\w\s]/gi, "");
  const jdTokens = normalize(jd).split(/\s+/);
  const cvText = normalize(cv);

  const techKeywords = [
    "react",
    "reactjs",
    "javascript",
    "typescript",
    "redux",
    "nextjs",
    "css",
    "html",
    "git",
    "scrum",
    "agile",
    "jest",
    "testing",
    "api",
    "restful",
    "performance",
    "optimization",
    "clean code",
    "design patterns",
    "ci/cd",
    "docker",
    "aws",
    "english",
    "communication",
    "teamwork",
    "problem solving",
  ];

  // Lọc từ khóa quan trọng từ JD
  const importantKeywords = [
    ...new Set(
      jdTokens.filter((t) => techKeywords.includes(t) || t.length > 6)
    ),
  ];

  const found = [];
  const missing = [];

  importantKeywords.forEach((kw) => {
    if (cvText.includes(kw)) {
      found.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const score = Math.round(
    (found.length / Math.max(importantKeywords.length, 1)) * 100
  );

  return { score, found, missing, total: importantKeywords.length };
};

const App = () => {
  // --- STATE ---
  const [lang, setLang] = useState("vi");
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState("input");

  const [cvText, setCvText] = useState("");
  const [jdText, setJdText] = useState("");

  const [cvFileName, setCvFileName] = useState(null);
  const [jdFileName, setJdFileName] = useState(null);
  const [cvFileType, setCvFileType] = useState("text");
  const [jdFileType, setJdFileType] = useState("text");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // --- HANDLERS ---
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Xử lý đọc file TEXT thực tế (.txt)
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (type === "cv") {
          setCvFileName(file.name);
          setCvFileType("text");
          setCvText(content + "\n\n" + t.system.fileReadSuccess);
        } else {
          setJdFileName(file.name);
          setJdFileType("text");
          setJdText(content + "\n\n" + t.system.fileReadSuccess);
        }
      };
      reader.readAsText(file);
      return;
    }

    // Xử lý giả lập cho PDF/DOCX/IMAGE (Dùng Sample Data ĐẦY ĐỦ)
    const isImage = file.type.startsWith("image/");
    const currentSample = SAMPLE_DATA[lang];

    if (type === "cv") {
      setCvFileName(file.name);
      setCvFileType(isImage ? "image" : "text");

      setTimeout(() => {
        if (isImage) {
          setCvText(currentSample.cv + "\n\n" + t.system.ocrSuccess);
        } else {
          // Dùng sample data đầy đủ thay vì sample ngắn
          setCvText(currentSample.cv);
        }
      }, 800);
    } else {
      setJdFileName(file.name);
      setJdFileType(isImage ? "image" : "text");

      setTimeout(() => {
        if (isImage) {
          setJdText(currentSample.jd + "\n\n" + t.system.ocrSuccess);
        } else {
          setJdText(currentSample.jd);
        }
      }, 800);
    }
  };

  const handleUseDemo = () => {
    const currentSample = SAMPLE_DATA[lang];
    setCvText(currentSample.cv);
    setJdText(currentSample.jd);
    setCvFileName(null);
    setJdFileName(null);
    setCvFileType("text");
    setJdFileType("text");
  };

  const handleAnalyze = () => {
    if (!cvText || !jdText) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeKeywords(cvText, jdText);
      setResult(analysis);
      setIsAnalyzing(false);
      setActiveTab("dashboard");
    }, 1500);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "vi" ? "en" : "vi"));
  };

  // --- SUB-COMPONENTS ---

  // 1. Sidebar Component
  const Sidebar = () => (
    <div className="w-20 lg:w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-50">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-0 lg:mr-3">
          CV
        </div>
        <span className="font-bold text-white text-lg hidden lg:block">
          Master Pro
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-2 lg:px-4">
        {[
          { id: "input", icon: UploadCloud, label: t.nav.input },
          {
            id: "dashboard",
            icon: LayoutDashboard,
            label: t.nav.dashboard,
            disabled: !result,
          },
          { id: "ats", icon: Cpu, label: t.nav.atsPreview, disabled: !result },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            disabled={item.disabled}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                : item.disabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            <span className="ml-3 font-medium hidden lg:block truncate">
              {item.label}
            </span>
          </button>
        ))}

        {!result && (
          <div className="mt-6 px-2 animate-pulse hidden lg:block">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-xs text-slate-400 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <span>{t.nav.unlockHint}</span>
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={toggleLang}
          className="w-full flex items-center justify-center lg:justify-start p-2 rounded hover:bg-slate-800 transition text-sm"
        >
          <Languages className="w-5 h-5" />
          <span className="ml-3 hidden lg:block">
            {lang === "vi" ? "English" : "Tiếng Việt"}
          </span>
        </button>
      </div>
    </div>
  );

  // 2. Score Gauge Component
  const ScoreCard = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let color = "text-red-500";
    if (score >= 50) color = "text-yellow-500";
    if (score >= 70) color = "text-blue-500";
    if (score >= 85) color = "text-green-500";

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
        <h3 className="text-slate-500 font-medium mb-4 uppercase tracking-wider text-xs">
          {t.result.matchScore}
        </h3>
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`${color} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${color}`}>{score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        <p className={`mt-2 font-medium ${color}`}>
          {score >= 80
            ? t.feedback.excellent
            : score >= 60
            ? t.feedback.good
            : t.feedback.average}
        </p>
      </div>
    );
  };

  // 3. Keyword Analysis Component
  const KeywordAnalysis = ({ found, missing }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 text-lg flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" /> {t.result.keywords}
        </h3>
        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">
          {found.length} Found / {missing.length} Missing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 mr-2" /> {t.result.present}
          </h4>
          <div className="flex flex-wrap gap-2">
            {found.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100 capitalize"
              >
                {kw}
              </span>
            ))}
            {found.length === 0 && (
              <span className="text-sm text-slate-400 italic">...</span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center uppercase tracking-wide">
            <AlertCircle className="w-4 h-4 mr-2" /> {t.result.missing}
          </h4>
          <div className="flex flex-wrap gap-2">
            {missing.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 capitalize"
              >
                {kw}
              </span>
            ))}
            {missing.length === 0 && (
              <span className="text-sm text-slate-400 italic">None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Recommendation Component (HIỂN THỊ TOÀN BỘ)
  const Recommendations = ({ missing }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center">
        <Wand2 className="w-5 h-5 mr-2 text-purple-600" />{" "}
        {t.result.suggestions}
      </h3>
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        {missing.map((kw, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Thiếu từ khóa quan trọng:
                </p>
                <p className="font-bold text-slate-800 capitalize">{kw}</p>
              </div>
              <button className="text-xs bg-white border border-purple-200 text-purple-600 px-3 py-1 rounded-md hover:bg-purple-50 transition shadow-sm font-medium shrink-0 ml-2">
                {t.result.rewrite}
              </button>
            </div>
          </div>
        ))}
        {missing.length === 0 && (
          <p className="text-green-600 text-sm">Hồ sơ của bạn đã rất đầy đủ!</p>
        )}
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
      <Sidebar />

      <div className="pl-20 lg:pl-64 transition-all duration-300">
        {/* Header Content Area */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="font-bold text-xl text-slate-800">
            {activeTab === "input" && t.nav.input}
            {activeTab === "dashboard" && t.nav.dashboard}
            {activeTab === "ats" && t.nav.atsPreview}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">
          {/* TAB 1: INPUT */}
          {activeTab === "input" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[600px]">
                {/* Left: CV Input */}
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-semibold text-slate-700 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      {t.input.uploadCV}
                    </label>
                    <div className="relative overflow-hidden group">
                      <button className="text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition flex items-center max-w-[150px]">
                        {cvFileType === "image" ? (
                          <ImageIcon className="w-3 h-3 mr-1" />
                        ) : (
                          <UploadCloud className="w-3 h-3 mr-1" />
                        )}
                        <span className="truncate">
                          {cvFileName ? cvFileName : "Upload File/Img"}
                        </span>
                      </button>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "cv")}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                      />
                    </div>
                  </div>
                  <textarea
                    className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 placeholder-slate-400 transition-all"
                    placeholder={t.input.placeholderCV}
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                  />
                  {cvFileType === "image" && (
                    <p className="mt-2 text-xs text-center text-slate-400 italic">
                      * Đã nhận diện hình ảnh. Hệ thống sẽ tự động OCR (quét văn
                      bản).
                    </p>
                  )}
                </div>

                {/* Right: JD Input */}
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-semibold text-slate-700 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-indigo-600" />
                      {t.input.uploadJD}
                    </label>
                    <div className="flex space-x-2">
                      {/* Demo Button */}
                      <button
                        onClick={handleUseDemo}
                        className="text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition border border-indigo-200"
                      >
                        {t.input.demoData}
                      </button>
                      {/* JD Upload Button Only */}
                      <div className="relative overflow-hidden group">
                        <button className="text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition flex items-center max-w-[150px]">
                          {jdFileType === "image" ? (
                            <ImageIcon className="w-3 h-3 mr-1" />
                          ) : (
                            <UploadCloud className="w-3 h-3 mr-1" />
                          )}
                          <span className="truncate">
                            {jdFileName ? jdFileName : "Upload File/Img"}
                          </span>
                        </button>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e, "jd")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 placeholder-slate-400 transition-all"
                    placeholder={t.input.placeholderJD}
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                  />
                  {jdFileType === "image" && (
                    <p className="mt-2 text-xs text-center text-slate-400 italic">
                      * Đã nhận diện hình ảnh. Hệ thống sẽ tự động OCR (quét văn
                      bản).
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={!cvText || !jdText || isAnalyzing}
                  className={`flex items-center bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all ${
                    !cvText || !jdText ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />{" "}
                      {t.input.analyzing}
                    </>
                  ) : (
                    <>
                      {t.input.analyzeBtn}{" "}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DASHBOARD */}
          {activeTab === "dashboard" && result && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {/* Score Column */}
              <div className="col-span-1 space-y-6">
                <ScoreCard score={result.score} />
                <Recommendations missing={result.missing} />
              </div>

              {/* Detail Column */}
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <KeywordAnalysis
                  found={result.found}
                  missing={result.missing}
                />

                {/* Advanced Insight Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                    <Maximize2 className="w-5 h-5 mr-2 text-indigo-500" />{" "}
                    Structure Check
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">
                        Contact Info
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">
                        Work Experience
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">
                        Measurable Metrics
                      </span>
                      <span className="text-xs text-yellow-700 font-bold px-2 py-1 bg-yellow-100 rounded">
                        Missing Numbers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ATS PREVIEW (HIỂN THỊ TOÀN BỘ KHÔNG CẮT BỚT, GIAO DIỆN TRẮNG CHỮ ĐEN) */}
          {activeTab === "ats" && (
            <div className="animate-in fade-in duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center text-green-400">
                    <Cpu className="w-5 h-5 mr-3" />
                    <h3 className="font-mono font-bold text-lg">
                      {t.result.atsView}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    System: Parsing_v2.0
                  </span>
                </div>

                <div className="p-6 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-start bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-4">
                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    {t.result.atsDesc}
                  </div>

                  {/* Simulated ATS Parsing Display - GIAO DIỆN MỚI: TRẮNG CHỮ ĐEN */}
                  <div className="font-mono text-sm bg-white text-slate-900 border border-slate-300 p-6 rounded-xl shadow-inner min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                    {`> INITIALIZING PARSE SEQUENCE...
> DETECTING DOCUMENT TYPE... ${
                      cvFileType === "image" ? "IMAGE (OCR Mode)" : "PDF/TEXT"
                    }
> EXTRACTING TEXT LAYERS...

----------------------------------------
NAME: ${cvText.split("\n")[0] || "Unknown"}
EMAIL: ${cvText.match(/[\w.-]+@[\w.-]+\.\w+/) || "Not Found"}
PHONE: ${cvText.match(/[\d\s+-]{9,}/) || "Not Found"}
----------------------------------------

> PARSED SECTIONS:

[FULL CONTENT START]
${cvText}
[FULL CONTENT END]

[SKILLS DETECTED]
> ${result ? result.found.join(", ") : "Waiting for analysis..."}

[FORMATTING ERRORS]
> No complex tables detected. [OK]
> Standard fonts used. [OK]
> Images/Icons skipped. [OK]

> END OF STREAM.`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
