import iconv from 'iconv-lite';
import type { CharacterSet } from './CharacterSet.js';

export function encode(text: string, characterSet: CharacterSet): Uint8Array {
  return iconv.encode(text, encoding[characterSet]) as Uint8Array;
}

export function decode(encoded: Uint8Array, characterSet: CharacterSet): string {
  return iconv.decode(encoded as any, encoding[characterSet]);
}

const encoding: Record<CharacterSet, string> = {
  pc437_usa: 'CP437',
  pc850_multilingual: 'CP850',
  pc860_portuguese: 'CP860',
  pc863_canadian_french: 'CP863',
  pc865_nordic: 'CP865',
  pc851_greek: 'CP860',
  pc853_turkish: 'CP853',
  pc857_turkish: 'CP857',
  pc737_greek: 'CP737',
  iso8859_7_greek: 'ISO-8859-7',
  wpc1252: 'CP1252',
  pc866_cyrillic2: 'CP866',
  pc852_latin2: 'CP852',
  slovenia: 'CP852',
  pc858_euro: 'CP858',
  pc874_thai: 'CP874',
  pc720_arabic: 'CP720',
  wpc775_baltic_rim: 'CP775',
  pc855_cyrillic: 'CP855',
  pc861_icelandic: 'CP861',
  pc862_hebrew: 'CP862',
  pc864_arabic: 'CP864',
  pc869_greek: 'CP869',
  iso8859_2_latin2: 'ISO-8859-2',
  iso8859_15_latin9: 'ISO-8859-15',
  pc1098_farsi: 'CP1098',
  pc1118_lithuanian: 'CP1118',
  pc1119_lithuanian: 'CP1119',
  pc1125_ukrainian: 'CP1125',
  wpc1250_latin2: 'WIN1250',
  wpc1251_cyrillic: 'WIN1251',
  wpc1253_greek: 'WIN1253',
  wpc1254_turkish: 'WIN1254',
  wpc1255_hebrew: 'WIN1255',
  wpc1256_arabic: 'WIN1256',
  wpc1257_baltic_rim: 'WIN1257',
  wpc1258_vietnamese: 'WIN1258',
  kz1048_kazakhstan: 'RK1048',
  japan: 'EUC-JP',
  korea: 'EUC-KR',
  china: 'GB18030',
  hk_tw: 'Big5-HKSCS',
};
