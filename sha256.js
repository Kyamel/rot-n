// SHA-256 Implementation
function sha256(message) {
  // Converte string para bytes UTF-8
  const msgBytes = new TextEncoder().encode(message);

  // Constantes K (primeiros 32 bits das raízes cúbicas dos primeiros 64 primos)
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  // Funções auxiliares (operações bit a bit)
  const ROTR = (x, n) => (x >>> n) | (x << (32 - n));
  const Σ0 = x => ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22);
  const Σ1 = x => ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25);
  const σ0 = x => ROTR(x, 7) ^ ROTR(x, 18) ^ (x >>> 3);
  const σ1 = x => ROTR(x, 17) ^ ROTR(x, 19) ^ (x >>> 10);
  const Ch = (x, y, z) => (x & y) ^ (~x & z);
  const Maj = (x, y, z) => (x & y) ^ (x & z) ^ (y & z);

  // PASSO 1: Padding da mensagem
  const bitLen = msgBytes.length * 8;
  const withOne = new Uint8Array([...msgBytes, 0x80]);
  const paddingLen = (64 - ((withOne.length + 8) % 64)) % 64;
  const padded = new Uint8Array([...withOne, ...new Uint8Array(paddingLen)]);

  const lengthBytes = new DataView(new ArrayBuffer(8));
  lengthBytes.setUint32(4, bitLen, false);

  const finalMsg = new Uint8Array([...padded, ...new Uint8Array(lengthBytes.buffer)]);

  // PASSO 2: Inicializar valores hash (primeiros 32 bits das raízes quadradas dos primeiros 8 primos)
  let H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  // PASSO 3: Processar blocos de 512 bits
  for (let i = 0; i < finalMsg.length; i += 64) {
    const W = new Uint32Array(64);

    // Criar message schedule (W[0] até W[15] são palavras da mensagem)
    for (let j = 0; j < 16; j++) {
      W[j] =
        (finalMsg[i + j * 4] << 24) |
        (finalMsg[i + j * 4 + 1] << 16) |
        (finalMsg[i + j * 4 + 2] << 8) |
        (finalMsg[i + j * 4 + 3]);
    }

    // Estender as primeiras 16 palavras para 64 palavras
    for (let j = 16; j < 64; j++) {
      W[j] = (σ1(W[j - 2]) + W[j - 7] + σ0(W[j - 15]) + W[j - 16]) >>> 0;
    }

    // Inicializar variáveis de trabalho
    let [a, b, c, d, e, f, g, h] = H;

    // PASSO 4: 64 rodadas de compressão
    for (let j = 0; j < 64; j++) {
      const T1 = (h + Σ1(e) + Ch(e, f, g) + K[j] + W[j]) >>> 0;
      const T2 = (Σ0(a) + Maj(a, b, c)) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + T1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (T1 + T2) >>> 0;
    }

    // Adicionar o hash comprimido ao hash atual
    H = H.map((v, idx) => (v + [a, b, c, d, e, f, g, h][idx]) >>> 0);
  }

  // PASSO 5: Produzir o hash final (concatenar H0 até H7)
  return H.map(x => x.toString(16).padStart(8, "0")).join("");
}