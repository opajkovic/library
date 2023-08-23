const url = "http://petardev.live/api/books";

const list = async () => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "Set-Cookie": "third_party_var=value; SameSite=None; Secure",
      },
    });
    if (!res.ok) {
      const error = new Error("Error Message: Someting went wrong...");
      return error;
    }
    const data = await res.json();
    return console.log(data);
  } catch (error) {
    return error;
  }
};

export { list };
