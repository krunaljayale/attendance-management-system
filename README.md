🎓 Student Attendance & Management System
A comprehensive web application designed for educational institutions to manage student records, track daily attendance with strict validation logic, manage academic holidays, and handle administrative profiles.

🚀 Key Features
👨‍🎓 Student Management
Registration: Register new students with personal, academic, and guardian details.

Image Upload: Integrated Cloudinary support for uploading and storing student profile pictures.

Profile Editing: Full control to update student details including course information and contact details.

Search & Filter: Filter students by enrollment status, course, or search by name/roll ID.

📅 Smart Attendance System
Role-Based Access:

Teachers: Can only mark attendance for Today. Past and future dates are locked.

Super Admins: Can edit Today and Past records (for corrections). Future dates remain locked.

Timezone Precision: Implements strict Indian Standard Time (IST) logic to prevent timezone discrepancies when comparing "Today" vs "Yesterday".

Status Tracking: Mark students as Present, Absent, or On Leave.

🗓️ Holiday & Calendar Management
Dynamic Calendar: Visual representation of holidays and Sundays on the attendance dashboard.

Holiday Manager: Admins can add, view, and delete academic holidays.

Safety Checks: Backend validation prevents the deletion of holidays that have already passed.

🛡️ Admin & Security
Profile Management: Admins can update their personal details (Phone, City, Department).

Security: Password change functionality protected by JWT authentication.

Dashboard: Quick overview of total students and specific cohorts.

🛠️ Tech Stack
Frontend:

Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS

State/Network: React Hooks & Axios

Icons: Lucide React / Heroicons

Backend:

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Tokens)

Storage: Cloudinary (for images)

⚙️ Environment Variables
To run this project, you will need to add the following environment variables to your .env files.

Frontend (.env.local)
Bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
Backend (.env)
Bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
📥 Installation & Setup
Clone the repository

Bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Setup Backend

Bash
cd backend
npm install
npm start
Setup Frontend

Bash
cd ../frontend # or root if next.js is in root
npm install
npm run dev
Access the App Open http://localhost:3000 to view it in the browser.

📂 Project Structure
Plaintext
├── components/
│ ├── cards/ # Student & Info Cards
│ ├── forms/ # Edit/Register Forms
│ ├── modals/ # Attendance & Password Modals
│ ├── profile/ # Profile specific components
│ └── admin/ # Holiday Manager
├── constants/
│ ├── API/ # API Endpoints config
│ └── Types.ts # TypeScript Interfaces
├── app/ # Next.js App Router pages
└── utils/ # Helper functions
🧠 Key Logic Highlights
Attendance Timezone Fix
The application uses a custom helper to strip time and force Asia/Kolkata timezone comparison to ensure that a teacher logging in late at night or from a different server location cannot manipulate attendance records incorrectly.

Form Data Handling
Complex nested objects (like personalInfo and guardianDetails) are handled dynamically in React forms to ensure seamless editing without data loss.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License.
