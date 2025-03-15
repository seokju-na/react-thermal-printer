import type { CharacterSet } from '../CharacterSet';
import { characterCodeTable } from './characterCodeTable';
import { internationalCharacterSet } from './internationalCharacterSet';

const characterSetValues: Record<CharacterSet, number> = {
  // code table
  pc437_usa: 0,
  pc850_multilingual: 2,
  pc860_portuguese: 3,
  pc863_canadian_french: 4,
  pc865_nordic: 5,
  pc851_greek: 11,
  pc853_turkish: 12,
  pc857_turkish: 13,
  pc737_greek: 14,
  iso8859_7_greek: 15,
  wpc1252: 16,
  pc866_cyrillic2: 17,
  pc852_latin2: 18,
  slovenia: 18,
  pc858_euro: 19,
  pc874_thai: 21,
  pc720_arabic: 32,
  wpc775_baltic_rim: 33,
  pc855_cyrillic: 34,
  pc861_icelandic: 35,
  pc862_hebrew: 36,
  pc864_arabic: 37,
  pc869_greek: 38,
  iso8859_2_latin2: 39,
  iso8859_15_latin9: 40,
  pc1098_farsi: 41,
  pc1118_lithuanian: 42,
  pc1119_lithuanian: 43,
  pc1125_ukrainian: 44,
  wpc1250_latin2: 45,
  wpc1251_cyrillic: 46,
  wpc1253_greek: 47,
  wpc1254_turkish: 48,
  wpc1255_hebrew: 49,
  wpc1256_arabic: 50,
  wpc1257_baltic_rim: 51,
  wpc1258_vietnamese: 52,
  kz1048_kazakhstan: 53,
  // international
  japan: 0x08,
  korea: 0x0d,
  china: 0x0f,
  hk_tw: 0x00,
};

export function characterSet(set: CharacterSet) {
  const n = characterSetValues[set];

  if (set === 'japan' || set === 'korea' || set === 'china' || set === 'hk_tw') {
    return internationalCharacterSet(n);
  }
  return characterCodeTable(n);
}
