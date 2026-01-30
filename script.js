let currentRotation = 13;
let currentLanguage = 'en';
let currentTheme = 'dark';

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

// Atualizar rotação
function updateRotation() {
  currentRotation = parseInt(document.getElementById("rotation").value);
  document.getElementById("rotationValue").textContent = currentRotation;
  document.getElementById("rotationDisplay").textContent = currentRotation;
  document.getElementById("rotationDisplayNum").textContent = currentRotation;
  document.getElementById("numRotation").textContent = currentRotation % 10;
  
  updateVisualization();
  updateExample();
  processText();
}

// Atualizar visualização
function updateVisualization() {
  const alphaOriginal = document.getElementById("alphabetOriginal");
  alphaOriginal.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const div = document.createElement("div");
    div.className = "char-box";
    div.textContent = String.fromCharCode(65 + i);
    alphaOriginal.appendChild(div);
  }
  
  const alphaTransformed = document.getElementById("alphabetTransformed");
  alphaTransformed.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const div = document.createElement("div");
    div.className = "char-box highlight";
    const newPos = (i + currentRotation) % 26;
    div.textContent = String.fromCharCode(65 + newPos);
    alphaTransformed.appendChild(div);
  }
  
  const numOriginal = document.getElementById("numbersOriginal");
  numOriginal.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.className = "char-box";
    div.textContent = i;
    numOriginal.appendChild(div);
  }
  
  const numTransformed = document.getElementById("numbersTransformed");
  numTransformed.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.className = "char-box highlight";
    const newNum = (i + currentRotation) % 10;
    div.textContent = newNum;
    numTransformed.appendChild(div);
  }
}

// Atualizar exemplo
function updateExample() {
  const examples = [];
  const indices = [0, 1, 2, 13, 14];

  for (const i of indices) {
    const original = String.fromCharCode(65 + i);
    const transformed = rotCipher(original, currentRotation);
    examples.push(`${original} → ${transformed}`);
  }
  document.getElementById("exampleText").textContent = examples.join(", ") + "...";
}

// Processar texto
function processText() {
  const input = document.getElementById("input").value;
  const output = rotCipher(input, currentRotation);
  document.getElementById("output").value = output;
}

// Alternar idioma via switch
function toggleLanguage() {
  const toggle = document.getElementById('languageToggle');
  currentLanguage = toggle.checked ? 'pt-BR' : 'en';
  
  // Atualizar o handle do switch
  const handle = document.querySelector('.language-toggle-handle');
  handle.textContent = toggle.checked ? 'PT' : 'EN';
  
  // Atualizar textos
  updateTexts();
  updateExample();
  
  // Salvar preferência
  localStorage.setItem('rotCipherLanguage', currentLanguage);
}

// Alternar tema
function toggleTheme() {
  const toggle = document.getElementById('themeToggle');
  currentTheme = toggle.checked ? 'light' : 'dark';
  document.body.className = currentTheme;
  
  // Atualizar label do tema
  updateThemeLabel();
  
  // Salvar preferência
  localStorage.setItem('rotCipherTheme', currentTheme);
}

// Função separada para atualizar apenas o label do tema
function updateThemeLabel() {
  const t = translations[currentLanguage];
  document.getElementById('themeLabel').textContent = 
    currentTheme === 'dark' ? t.darkLabel : t.lightLabel;
}

// Função separada para atualizar apenas o label do idioma
function updateLanguageLabel() {
  const t = translations[currentLanguage];
  document.getElementById('languageLabel').textContent = 
    currentLanguage === 'en' ? t.englishLabel : t.portugueseLabel;
}

// Atualizar textos
function updateTexts() {
  const t = translations[currentLanguage];
  
  // Elementos principais
  document.getElementById("title").textContent = t.title;
  document.getElementById("whatIsRot").textContent = t.whatIsRot;
  document.getElementById("rotDescription").textContent = t.rotDescription;
  document.getElementById("rotationLabel").textContent = t.rotationLabel;
  document.getElementById("processButton").textContent = t.processButton;
  document.getElementById("exampleLabel").textContent = t.exampleLabel;
  document.getElementById("visualizationTitle").textContent = t.visualizationTitle;
  document.getElementById("algorithmDescription").textContent = t.algorithmDescription;
  document.getElementById("originalAlphabet").textContent = t.originalAlphabet;
  document.getElementById("rotationArrow").textContent = t.rotationArrow;
  document.getElementById("positions").textContent = t.positions;
  document.getElementById("transformedAlphabet").textContent = t.transformedAlphabet;
  document.getElementById("originalNumbers").textContent = t.originalNumbers;
  document.getElementById("rotationArrowNum").textContent = t.rotationArrowNum;
  document.getElementById("transformedNumbers").textContent = t.transformedNumbers;
  document.getElementById("formulaTitle").innerHTML = `<strong>${t.formulaTitle}</strong>`;
  document.getElementById("lettersFormula").textContent = t.lettersFormula;
  document.getElementById("numbersFormula").textContent = t.numbersFormula;
  document.getElementById("moduloExplanation").textContent = t.moduloExplanation;
  
  // Placeholders
  document.getElementById("input").placeholder = t.inputPlaceholder;
  document.getElementById("output").placeholder = t.outputPlaceholder;
  
  // Labels dos switches (usar as funções separadas)
  updateThemeLabel();
  updateLanguageLabel();
}

// Inicialização
function init() {
  // Carregar tema salvo
  const savedTheme = localStorage.getItem('rotCipherTheme');
  if (savedTheme) {
    currentTheme = savedTheme;
    const toggle = document.getElementById('themeToggle');
    toggle.checked = currentTheme === 'light';
    document.body.className = currentTheme;
  }
  
  // Carregar idioma salvo
  const savedLang = localStorage.getItem('rotCipherLanguage');
  if (savedLang) {
    currentLanguage = savedLang;
    
    // Atualizar o switch de idioma
    const langToggle = document.getElementById('languageToggle');
    langToggle.checked = currentLanguage === 'pt-BR';
    
    // Atualizar o handle do switch
    const handle = document.querySelector('.language-toggle-handle');
    handle.textContent = currentLanguage === 'en' ? 'EN' : 'PT';
  }
  
  // Atualizar interface
  updateTexts();
  updateVisualization();
  updateExample();
  
  // Processar texto se houver algo no input
  processText();
}

// Inicializar quando a página carregar
window.addEventListener('DOMContentLoaded', init);