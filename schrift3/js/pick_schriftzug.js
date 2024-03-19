class SeededRNG {
    constructor(seed) {
      this.modulus = all_inscriptions.length - 1;
      this.multiplier = 48271;
      this.increment = 0;
      this.seed = seed;
    }
  
    next() {
      this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
      return this.seed / this.modulus;
    }
  }
  

function getRandomElement(arr, seed) {
    const rng = new SeededRNG(seed);
    const index = Math.floor(rng.next() * arr.length);
    return arr[index];
  }
  


const seed = data.tokenMintTimestamp;
const textInput = "FREE WEB3 FROM GRAVITY"; //all_inscriptions[seed % all_inscriptions.length]
console.log(seed); 
  