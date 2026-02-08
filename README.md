# 🎓 Student Attendance & Management System

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

A comprehensive web application designed for educational institutions to manage student records, track daily attendance with strict validation logic, manage academic holidays, and handle administrative profiles.

---

## 🚀 Key Features

### 👨‍🎓 Student Management
* **Registration:** Register new students with comprehensive personal, academic, and guardian details.
* **Image Upload:** Integrated **Cloudinary** support for uploading and storing student profile pictures seamlessly.
* **Profile Editing:** Full control to update student details, including nested data like course info and contact details.
* **Search & Filter:** Advanced filtering by enrollment status and course, plus instant search by name or roll ID.

### 📅 Smart Attendance System
* **Role-Based Access Control (RBAC):**
    * **Teachers:** Can only mark attendance for **Today**. Past and future dates are strictly locked.
    * **Super Admins:** Have privileges to edit **Today** and **Past** records (for corrections). Future dates remain locked.
* **Timezone Precision:** Implements strict **Indian Standard Time (IST)** logic to prevent timezone discrepancies (e.g., preventing "tomorrow's" attendance from being marked late at night).
* **Status Tracking:** Mark students as **Present**, **Absent**, or **On Leave**.

### 🗓️ Holiday & Calendar Management
* **Dynamic Calendar:** Visual representation of holidays and Sundays directly on the attendance dashboard.
* **Holiday Manager:** Admin interface to add, view, and delete academic holidays.
* **Safety Checks:** Backend validation prevents the accidental deletion of holidays that have already passed.

### 🛡️ Admin & Security
* **Profile Management:** Admins can update their personal details (Phone, City, Department).
* **Security:** Password change functionality protected by JWT authentication.
* **Dashboard:** Quick analytics overview of total students and specific cohorts.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Auth** | JWT (JSON Web Tokens) |
| **Storage** | Cloudinary (Image Hosting) |

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset