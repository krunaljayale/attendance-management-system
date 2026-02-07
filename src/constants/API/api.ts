export const BASE_URL = "http://192.168.1.102:8080";

export const API = {
  LOGIN: `${BASE_URL}/admin/login`,
  GET_PROFILE: `${BASE_URL}/admin/get-profile`,
  EDIT_PROFILE: `${BASE_URL}/admin/edit-profile`,
  ADD_NEW_TEACHER: `${BASE_URL}/admin/add-new-teacher`,
  GET_ALL_ADMINS: `${BASE_URL}/admin/get-all-admins`,
  TOGGLE_STATUS: `${BASE_URL}/admin/toggle-active-status`,
  DELETE_ADMIN: `${BASE_URL}/admin/delete-admin`,

  GET_STATS: `${BASE_URL}/admin/get-stats`,
  GET_ATTENDANCE_STATS: `${BASE_URL}/admin/get-attendance-stats`,
  GET_GENDER_STATS: `${BASE_URL}/admin/get-gender-stats`,
  GET_TOP_ATTENDANTS: `${BASE_URL}/admin/get-top-attendants`,
  GET_WEEKLY_ATTENDANCE: `${BASE_URL}/admin/get-weekly-attendance`,
  GET_ALL_STUDENTS: `${BASE_URL}/admin/get-all-students`,
  GET_STUDENT_DETAILS: `${BASE_URL}/admin/get-student`,
  EDIT_STUDENT_DETAILS: `${BASE_URL}/admin/edit-student-details`,
  REGISTER_NEW_STUDENT: `${BASE_URL}/admin/register-new-student`,
  DELETE_STUDENT: `${BASE_URL}/admin/delete-student`,
};
