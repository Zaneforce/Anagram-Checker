## Penjelasan Logic Anagram

Dari pemahaman logic yang saya dapat yang pertama saya lakukan adalah menghitung total huruf dalam kata/kalimat yang ada tanpa menghitung spasi, jadi saya menggunakan for loop untuk menghitung char yang ada dalam string kecuali space.

Lalu kedua saya akan hapus space (jika ada) dalam kata supaya bisa dihitung panjang kata nya.

Kemudian saya akan check panjang kedua kata jika kedua kata memiliki panjang kata berbeda maka sudah pasti bukan anagram.

Jika panjang nya sama maka saya melakukan bubblesort untuk kedua kata. Misal: "muka" dan "kamu", maka sort akan menjadi "akmu" untuk kedua kata.

Lalu saya return dari kata 1 === kata 2 jika tidak sama maka bukan anagram, jika sama maka anagram.

Untuk validasi dari input pertama saya akan check apakah ada simbol dalam inputan dengan melakukan for loop, jika bukan A-Z, a-z dan space maka akan false dan keluar error.

## Algorithm Implementation

Implementasi menggunakan manual for loops tanpa built-in methods:

```javascript
// 1. Menghitung karakter tanpa spasi
const countChars = (str) => {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      count++
    }
  }
  return count
}

// 2. Hapus spasi dan lowercase
const removeSpaces = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      result += str[i].toLowerCase()
    }
  }
  return result
}

// 3. Bubble sort
const sortString = (str) => {
  let chars = []
  for (let i = 0; i < str.length; i++) {
    chars[i] = str[i]
  }
  
  for (let i = 0; i < chars.length - 1; i++) {
    for (let j = 0; j < chars.length - 1 - i; j++) {
      if (chars[j] > chars[j + 1]) {
        let temp = chars[j]
        chars[j] = chars[j + 1]
        chars[j + 1] = temp
      }
    }
  }
  
  let result = ''
  for (let i = 0; i < chars.length; i++) {
    result += chars[i]
  }
  return result
}

// 4. Validasi input 
const isLettersAndSpacesOnly = (str) => {
  for (let i = 0; i < str.length; i++) {
    const charCode = str[i].charCodeAt(0)
    const isUpperCase = charCode >= 65 && charCode <= 90
    const isLowerCase = charCode >= 97 && charCode <= 122
    const isSpace = str[i] === ' '
    
    if (!isUpperCase && !isLowerCase && !isSpace) {
      return false
    }
  }
  return true
}
```