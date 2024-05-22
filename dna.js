// Context: You’re part of a research team that has found a new mysterious organism at the bottom of the ocean near hydrothermal vents. Your team names the organism, Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases. The small DNA samples and frequency at which it mutates due to the hydrothermal vents make P. aequor an interesting specimen to study. However, P. aequor cannot survive above sea level and locating P. aequor in the deep sea is difficult and expensive. Your job is to create objects that simulate the DNA of P. aequor for your research team to study.

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//  factory function
const pAequorFactory = (num, dnaBases) => {
  return {
    specimenNum: num,
    dna: dnaBases,
    mutate() {
      const randNum = Math.floor(Math.random() * 4);
      const randBase = this.dna[randNum];
      let newRandBase = returnRandBase();
      do {
        newRandBase = returnRandBase();
      } while (randBase === newRandBase);

      return (this.dna[randNum] = newRandBase);
    },
    compareDNA(otherObject) {
      let numCommon = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherObject.dna[i]) {
          numCommon++;
        } else {
          continue;
        }
      }

      const percentCommon = Math.round((numCommon / 15) * 100);

      return `Specimen #${this.specimenNum} and Specimen #${otherObject.specimenNum} have ${percentCommon}% DNA in common.`;
    },
    willLikelySurvive() {
      let numCG = 0;
      for (let dna of this.dna) {
        if (dna === "C" || dna === "G") {
          numCG++;
        } else {
          continue;
        }
      }

      const percentCG = Math.round((numCG / 15) * 100);
      if (percentCG >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const createNewInstances = (startingNum, numOfInstances) => {
  let results = [];
  for (let i = 0; i < numOfInstances; i++) {
    let option = pAequorFactory(startingNum + i, mockUpStrand());
    do {
      option = pAequorFactory(startingNum + i, mockUpStrand());
    } while (option.willLikelySurvive() === false)

    results.push(option);
  }
  return results;
}

// testing
// let newP1 = pAequorFactory(1, mockUpStrand());
// let newP2 = pAequorFactory(2, mockUpStrand());
// // console.log(newP1);
// // console.log(newP1.mutate());
// // confirm that mutation occurred
// console.log(newP1.dna);
// console.log(newP2.dna);
// // test new methods
// console.log(newP1.compareDNA(newP2));
// console.log(newP1.willLikelySurvive());

// create 30 instances
let instancesArray = createNewInstances(3, 30);
// console.log(instancesArray);

// confirm they are all likely to survive
for (let instance of instancesArray) {
  console.log(instance.willLikelySurvive());
}
