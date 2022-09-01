// ESC/POS commands

import { CharacterSet } from './CharacterSet';

export const LF = 0x0a;
export const ESC = 0x1b;
export const GS = 0x1d;

/**
 * Initialize printer
 * | Format   | Value   |
 * |---------|------- --|
 * | ASCII   | ESC @   |
 * | Hex     | 1B 40   |
 * | Decimal | 27 64   |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=192
 */
export function initialize() {
  return [ESC, 0x40];
}

/**
 * Select character code table
 * | Format   | Value     |
 * |---------|-----------|
 * | ASCII   | ESC t n   |
 * | Hex     | 1B 74 n   |
 * | Decimal | 27 116 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=32
 */
export function characterCodeTable(n: number) {
  return [ESC, 0x74, n];
}

/**
 * Select an international character set
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC R n  |
 * | Hex     | 1B 52 n  |
 * | Decimal | 27 82 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=29
 */
export function internationalCharacterSet(n: number) {
  return [ESC, 0x52, n];
}

const characterSetValues: Record<CharacterSet, number> = {
  // code table
  pc437_usa: 0,
  pc850_multilingual: 2,
  pc860_portuguese: 3,
  pc863_canadian_french: 4,
  pc865_nordic: 5,
  pc851_greek: 11,
  pc857_turkish: 12,
  pc737_greek: 14,
  iso8859_7_greek: 15,
  wpc1252: 16,
  pc866_cyrillic2: 17,
  pc852_latin2: 18,
  slovenia: 18,
  pc858_euro: 19,
  wpc775_baltic_rim: 33,
  pc855_cyrillic: 34,
  pc861_icelandic: 35,
  pc862_hebrew: 36,
  pc864_arabic: 37,
  pc869_greek: 38,
  iso8859_2_latin2: 39,
  iso8859_15_latin9: 40,
  pc1125_ukranian: 44,
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

/**
 * Select justification
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC a n  |
 * | Hex     | 1B 61 n  |
 * | Decimal | 27 97 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=58
 */
export function alignment(n: number) {
  return [ESC, 0x61, n];
}

/**
 * Turn emphasized mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC E n  |
 * | Hex     | 1B 45 n  |
 * | Decimal | 27 69 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=25
 */
export function textBold(n: number) {
  return [ESC, 0x45, n];
}

/**
 * Turn underline mode on/off
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC - n  |
 * | Hex     | 1B 2D n  |
 * | Decimal | 27 45 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=24
 */
export function textUnderline(n: number) {
  return [ESC, 0x2d, n];
}

/**
 * Select character font
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | ESC M n  |
 * | Hex     | 1B 4D n  |
 * | Decimal | 27 7 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=27
 */
export function textFont(n: number) {
  return [ESC, 0x4d, n];
}

/**
 * Select character size
 * | Format   | Value    |
 * |---------|----------|
 * | ASCII   | GS ! n  |
 * | Hex     | 1D 21 n  |
 * | Decimal | 29 33 n  |
 *
 * @see https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=34
 */
export function textSize(n: number) {
  return [GS, 0x21, n];
}
