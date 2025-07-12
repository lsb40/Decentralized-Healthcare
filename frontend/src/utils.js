export function generateAlias(role) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const prefix = role === "client" ? "Client" : "Consultant";
    return `${prefix}_${randomNum}`;
  }
  