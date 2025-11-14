export async function handler(event, context) {
  try {
    const MAX_WHATSAPP = 2;

    const encodedLinks = [
      "aHR0cHM6Ly93YS5tZS85MTgwMDY4NTU5MzE=",
      "aHR0cHM6Ly93YS5tZS85MTkwNDc0OTk1OTI=",
      "aHR0cHM6Ly93YS5tZS85MTc5ODMzMjQ3MTQ=",
      "aHR0cHM6Ly93YS5tZS85MTg5ODQ2OTYxNTE=",
      "aHR0cHM6Ly93YS5tZS85MTk5ODY3Mjg3NDA=",
      "aHR0cHM6Ly93YS5tZS85MTkwMjQ3OTg3NzA=",
      "aHR0cHM6Ly93YS5tZS85MTc1ODQwMTk3NDg=",
      "aHR0cHM6Ly93YS5tZS85MTgzMDA4OTI2NTk=",
      "aHR0cHM6Ly93YS5tZS85MTk5NzM3MjkwNzk=",
      "aHR0cHM6Ly93YS5tZS85MTcwODU2NzE1NzA=",
      "aHR0cHM6Ly93YS5tZS85MTk3OTE1OTY1ODg=",
      "aHR0cHM6Ly93YS5tZS85MTk0NzUxNDI3NDY=",
      "aHR0cHM6Ly93YS5tZS85MTg0NDE5MDkzMzg=",
      "aHR0cHM6Ly93YS5tZS85MTk5MDc3MDU2MTA=",
      "aHR0cHM6Ly93YS5tZS85MTgzMzUwNDg4Mjc=",
      "aHR0cHM6Ly93YS5tZS85MTkwNDc0OTk1OTI=",
      "aHR0cHM6Ly93YS5tZS85MTk5NTU1Nzk4ODE=",
      "aHR0cHM6Ly93YS5tZS85MTcyNjMwNzQ5NTA=",
      "aHR0cHM6Ly93YS5tZS85MTkzNjY1NTg0NjE=",
      "aHR0cHM6Ly93YS5tZS85MTkxNTkxODkxMjg=",
      "aHR0cHM6Ly93YS5tZS85MTkzMTY5NzE5Nzc=",
      "aHR0cHM6Ly93YS5tZS85MTk0OTE5MTI3NDg=",
      "aHR0cHM6Ly93YS5tZS85MTk1NzY1NTc2NDQ=",
      "aHR0cHM6Ly93YS5tZS85MTk3ODYwMzc1MDU=",
      "aHR0cHM6Ly93YS5tZS85MTg0MzQzOTYzMDM=",
      "aHR0cHM6Ly93YS5tZS85MTcwMTE0NzY3OTE=",
      "aHR0cHM6Ly93YS5tZS85MTcwNjc2OTc1NTQ=",
      "aHR0cHM6Ly93YS5tZS85MTcwNjEyNzA2MjQ=",
      "aHR0cHM6Ly90Lm1lLytob29TVHFzem5UWmxZek0x"
    ];

    const decoded = encodedLinks.map(l => Buffer.from(l, "base64").toString("utf8").trim());
    const telegram = decoded.find(l => l.includes("t.me"));
    const whatsapps = decoded.filter(l => l.includes("wa.me"));

    const cookie = event.headers.cookie || "";
    let count = 0;
    const match = cookie.match(/shown=(\d+)/);
    if (match) count = parseInt(match[1]);

    if (count >= MAX_WHATSAPP) {
      return {
        statusCode: 302,
        headers: {
          Location: telegram,
          "Set-Cookie": "shown=0; Path=/;"
        }
      };
    }

    const randomWA = whatsapps[Math.floor(Math.random() * whatsapps.length)];

    return {
      statusCode: 302,
      headers: {
        Location: randomWA,
        "Set-Cookie": `shown=${count + 1}; Path=/;`
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error"
    };
  }
}
