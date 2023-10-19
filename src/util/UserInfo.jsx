import api from "../api/apiCalls";

export async function userInfoLoader(id, navigate) {

  try {
    const response = await api.get(`/users/${id}`);
    if (response.data.data.role === "Učenik") {
      return response.data.data
    } else if (response.data.data.role === "Bibliotekar") {
      navigate(`/librarians/${id}`);
    } else if (response.data.data.role === "Administrator") {
      navigate(`/administrators/${id}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
