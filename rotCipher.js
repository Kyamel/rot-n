// Função de cifra ROT
function rotCipher(text, rotation) {
  let result = "";
  for (const char of text) {
    if (char >= 'a' && char <= 'z') {
      const base = 'a'.charCodeAt(0);
      const newChar = (char.charCodeAt(0) - base + rotation) % 26 + base;
      result += String.fromCharCode(newChar);
    } else if (char >= 'A' && char <= 'Z') {
      const base = 'A'.charCodeAt(0);
      const newChar = (char.charCodeAt(0) - base + rotation) % 26 + base;
      result += String.fromCharCode(newChar);
    } else if (char >= '0' && char <= '9') {
      const base = '0'.charCodeAt(0);
      const newChar = (char.charCodeAt(0) - base + rotation) % 10 + base;
      result += String.fromCharCode(newChar);
    } else {
      result += char;
    }
  }
  return result;
}