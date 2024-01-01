function cekObjekDiArray(objekDicari, array, kedalaman = 0) {
  for (let i = 0; i < array.length; i++) {
    const elemen = array[i];

    if (elemen === objekDicari) {
      return kedalaman;
    }

    if (Array.isArray(elemen)) {
      const kedalamanDalam = cekObjekDiArray(objekDicari, elemen, kedalaman + 1);
      if (kedalamanDalam !== -1) {
        return kedalamanDalam;
      }
    }
  }

  return -1;
}

const arrayContoh = [1, [2, 3, [4, 5]], 6, [7, 8]];

const objekDicari = 7;
const kedalaman = cekObjekDiArray(objekDicari, arrayContoh);

if (kedalaman !== -1) {
  console.log(`Objek ditemukan di kedalaman ${kedalaman}`);
} else {
  console.log(`Objek tidak ditemukan dalam array`);
}
