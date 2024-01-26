import {describe, expect, it} from '@jest/globals';

import {ocrExtractPokemonInfo} from '@/utils/ocr/extract/pokemon';

/* eslint-disable max-len */
const ocrResultEn = `
-~ €re 505 S A ) - Lv.5 Eevee — ®Lv.30 @ Ly.60 - , :‘ [,-'”‘}} "r'q; B S o G @ T o Every 1 hr 1 min 10 secs e 12 | Main skill & Sub skills Ingredient Magnet S Lv.1 Gets you 6 ingredients chosen at random. [ O Lv.25 Berry Finding S Helping Bonus (o .. co SRR o ;S Helping Speed M Inventory Up M Ingredient Finder M I Additional Stats o Main skill chance A A Sassy EXP gains VV - (=] ‘ i G LAMERS
7
`;
const ocrResultJp = `
失 來 SP ⑤⑧① @ し .③o [ Ly:⑥0
ぁ 志 。 v ⑮ リ ザ ー ド Y ② グ )
に デ に ン \`
x② x x メ ⑦
④⑧ 分 ③⑥ 秘 ご と
②① 個
| | メ イ ン ス キ ル ・ サ プ ブ ス キ ル
食 材 ゲ ッ ト S Lv.①
ラ ン ダ ム で 食 材 を ⑥ 個 ゲ ッ ト す る
e czs 】
最 大 所 持 数 ア ッ プ S ス キ ル 確 率 ア ッ プ S
【 a ぃ so 】 し a z 】
ス キ ル レ ベ ル ア ッ プ S お て つ だ い ス ピ ー ド S
き の み の 数 S
[| W 綱 ス テ ー タ ス
EXP 獲 得 星 A
よ う き
食 材 お て つ だ い 確率 マ マ
`;
/* eslint-enable max-len */


describe('OCR / Extract Pokemon Info', () => {
  it('extracts correctly for EN', () => {
    const extracted = ocrExtractPokemonInfo({
      ocrLocale: 'en',
      text: ocrResultEn,
      translations: {
        name: {
          Even: 6,
          Pikachu: 23,
          Eevee: 5,
        },
        subSkill: {
          'Berry Finding S': 7,
          'Helping Bonus': 8,
          'Helping Speed M': 9,
          'Inventory Up M': 10,
          'Ingredient Finder M': 11,
        },
        nature: {
          Sassy: 3,
        },
      },
    });

    expect(extracted.pokemonId).toBe(5);
    expect(extracted.subSkills[0].id).toBe(7);
    expect(extracted.subSkills[0].level).toBe(10);
    expect(extracted.subSkills[1].id).toBe(8);
    expect(extracted.subSkills[1].level).toBe(25);
    expect(extracted.subSkills[2].id).toBe(9);
    expect(extracted.subSkills[2].level).toBe(50);
    expect(extracted.subSkills[3].id).toBe(10);
    expect(extracted.subSkills[3].level).toBe(75);
    expect(extracted.subSkills[4].id).toBe(11);
    expect(extracted.subSkills[4].level).toBe(100);
    expect(extracted.nature).toBe(3);
  });

  it('extracts correctly for JP', () => {
    // noinspection JSNonASCIINames
    const extracted = ocrExtractPokemonInfo({
      ocrLocale: 'ja',
      text: ocrResultJp,
      translations: {
        name: {
          リザード: 5,
        },
        subSkill: {
          最大所持数アップS: 7,
          スキル確率アップS: 8,
          スキルレベルアップS: 9,
          おてつだいスピードS: 10,
          きのみの数S: 11,
        },
        nature: {
          ようき: 3,
        },
      },
    });

    expect(extracted.pokemonId).toBe(5);
    expect(extracted.subSkills[0].id).toBe(7);
    expect(extracted.subSkills[0].level).toBe(10);
    expect(extracted.subSkills[1].id).toBe(8);
    expect(extracted.subSkills[1].level).toBe(25);
    expect(extracted.subSkills[2].id).toBe(9);
    expect(extracted.subSkills[2].level).toBe(50);
    expect(extracted.subSkills[3].id).toBe(10);
    expect(extracted.subSkills[3].level).toBe(75);
    expect(extracted.subSkills[4].id).toBe(11);
    expect(extracted.subSkills[4].level).toBe(100);
    expect(extracted.nature).toBe(3);
  });
});
