import { encode as _encode } from 'iconv-lite';
import { CharacterSet } from './CharacterSet';

export function encode(text: string, characterSet: CharacterSet): Uint8Array {
  return _encode(text, encoding[characterSet]);
}

const encoding: Record<CharacterSet, string> = {
  pc437_usa: 'CP437',
  pc850_multilingual: 'CP850',
  pc860_portuguese: 'CP860',
  pc863_canadian_french: 'CP863',
  pc865_nordic: 'CP865',
  pc851_greek: 'CP860',
  pc857_turkish: 'CP857',
  pc737_greek: 'CP737',
  iso8859_7_greek: 'ISO-8859-7',
  wpc1252: 'CP1252',
  pc866_cyrillic2: 'CP866',
  pc852_latin2: 'CP852',
  slovenia: 'CP852',
  pc858_euro: 'CP858',
  wpc775_baltic_rim: 'CP775',
  pc855_cyrillic: 'CP855',
  pc861_icelandic: 'CP861',
  pc862_hebrew: 'CP862',
  pc864_arabic: 'CP864',
  pc869_greek: 'CP869',
  iso8859_2_latin2: 'ISO-8859-2',
  iso8859_15_latin9: 'ISO-8859-15',
  pc1125_ukranian: 'CP1125',
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
  china: 'EUC-CN',
  hk_tw: 'Big5-HKSCS',
};
