
import { KanaData } from '../types';

const baseData: Partial<KanaData> = {
  type: 'phonetic',
  keyFeatures: [],
  confusables: [],
  structural_feature: "Standard Hiragana structure.",
  linguistic_meaning: { en: "Phonetic component.", cn: "表音符号。" },
  usage_example: { word: "...", reading: "...", meaning: "..." },
  exampleSentence: { jp: "...", reading: "...", en: "...", level: "N5" }
};

export const KANA_REGISTRY: Record<string, KanaData> = {
  // Vowels
  'a': { ...baseData, id: 'a', char: 'あ', romaji: 'a', confusables: ['o'], exampleSentence: { jp: 'あおいそら。', reading: 'Aoi sora.', en: "The blue sky.", level: 'N5' } } as KanaData,
  'i': { ...baseData, id: 'i', char: 'い', romaji: 'i', confusables: ['ri'], exampleSentence: { jp: 'いいですね。', reading: 'Ii desu ne.', en: "That is good.", level: 'N5' } } as KanaData,
  'u': { ...baseData, id: 'u', char: 'う', romaji: 'u', exampleSentence: { jp: 'うみにいく。', reading: 'Umi ni iku.', en: "Go to the sea.", level: 'N5' } } as KanaData,
  'e': { ...baseData, id: 'e', char: 'え', romaji: 'e', exampleSentence: { jp: 'えきはどこ？', reading: 'Eki wa doko?', en: "Where is the station?", level: 'N5' } } as KanaData,
  'o': { ...baseData, id: 'o', char: 'お', romaji: 'o', confusables: ['a'], exampleSentence: { jp: 'おちゃをのむ。', reading: 'Ocha o nomu.', en: "Drink tea.", level: 'N5' } } as KanaData,
  // K-row
  'ka': { ...baseData, id: 'ka', char: 'か', romaji: 'ka', exampleSentence: { jp: 'かさをかう。', reading: 'Kasa o kau.', en: "Buy an umbrella.", level: 'N5' } } as KanaData,
  'ki': { ...baseData, id: 'ki', char: 'き', romaji: 'ki', confusables: ['sa'], exampleSentence: { jp: 'きをみる。', reading: 'Ki o miru.', en: "Look at the tree.", level: 'N5' } } as KanaData,
  'ku': { ...baseData, id: 'ku', char: 'く', romaji: 'ku', exampleSentence: { jp: 'くるま。', reading: 'Kuruma.', en: "Car.", level: 'N5' } } as KanaData,
  'ke': { ...baseData, id: 'ke', char: 'け', romaji: 'ke', exampleSentence: { jp: 'けいたいでんわ。', reading: 'Keitai denwa.', en: "Cell phone.", level: 'N5' } } as KanaData,
  'ko': { ...baseData, id: 'ko', char: 'こ', romaji: 'ko', exampleSentence: { jp: 'これ。', reading: 'Kore.', en: "This.", level: 'N5' } } as KanaData,
  // S-row
  'sa': { ...baseData, id: 'sa', char: 'さ', romaji: 'sa', confusables: ['ki', 'chi'], exampleSentence: { jp: 'さかな。', reading: 'Sakana.', en: "Fish.", level: 'N5' } } as KanaData,
  'shi': { ...baseData, id: 'shi', char: 'し', romaji: 'shi', confusables: ['tsu'], exampleSentence: { jp: 'しお。', reading: 'Shio.', en: "Salt.", level: 'N5' } } as KanaData,
  'su': { ...baseData, id: 'su', char: 'す', romaji: 'su', exampleSentence: { jp: 'すし。', reading: 'Sushi.', en: "Sushi.", level: 'N5' } } as KanaData,
  'se': { ...baseData, id: 'se', char: 'せ', romaji: 'se', exampleSentence: { jp: 'せんせい。', reading: 'Sensei.', en: "Teacher.", level: 'N5' } } as KanaData,
  'so': { ...baseData, id: 'so', char: 'そ', romaji: 'so', exampleSentence: { jp: 'そこ。', reading: 'Soko.', en: "There.", level: 'N5' } } as KanaData,
  // T-row
  'ta': { ...baseData, id: 'ta', char: 'た', romaji: 'ta', confusables: ['na'], exampleSentence: { jp: 'たべる。', reading: 'Taberu.', en: "Eat.", level: 'N5' } } as KanaData,
  'chi': { ...baseData, id: 'chi', char: 'ち', romaji: 'chi', confusables: ['sa', 'ra'], exampleSentence: { jp: 'ちかい。', reading: 'Chikai.', en: "Near.", level: 'N5' } } as KanaData,
  'tsu': { ...baseData, id: 'tsu', char: 'つ', romaji: 'tsu', confusables: ['shi'], exampleSentence: { jp: 'つよい。', reading: 'Tsuyoi.', en: "Strong.", level: 'N5' } } as KanaData,
  'te': { ...baseData, id: 'te', char: 'て', romaji: 'te', exampleSentence: { jp: 'て。', reading: 'Te.', en: "Hand.", level: 'N5' } } as KanaData,
  'to': { ...baseData, id: 'to', char: 'と', romaji: 'to', exampleSentence: { jp: 'ともだち。', reading: 'Tomodachi.', en: "Friend.", level: 'N5' } } as KanaData,
  // N-row
  'na': { ...baseData, id: 'na', char: 'な', romaji: 'na', exampleSentence: { jp: 'なつ。', reading: 'Natsu.', en: "Summer.", level: 'N5' } } as KanaData,
  'ni': { ...baseData, id: 'ni', char: 'に', romaji: 'ni', exampleSentence: { jp: 'にく。', reading: 'Niku.', en: "Meat.", level: 'N5' } } as KanaData,
  'nu': { ...baseData, id: 'nu', char: 'ぬ', romaji: 'nu', confusables: ['me', 'no'], exampleSentence: { jp: 'いぬ。', reading: 'Inu.', en: "Dog.", level: 'N5' } } as KanaData,
  'ne': { ...baseData, id: 'ne', char: 'ね', romaji: 'ne', confusables: ['re', 'wa'], exampleSentence: { jp: 'ねこ。', reading: 'Neko.', en: "Cat.", level: 'N5' } } as KanaData,
  'no': { ...baseData, id: 'no', char: 'の', romaji: 'no', confusables: ['nu', 'me'], exampleSentence: { jp: 'のむ。', reading: 'Nomu.', en: "Drink.", level: 'N5' } } as KanaData,
  // H-row
  'ha': { ...baseData, id: 'ha', char: 'は', romaji: 'ha', confusables: ['ho', 'ke'], exampleSentence: { jp: 'はな。', reading: 'Hana.', en: "Flower.", level: 'N5' } } as KanaData,
  'hi': { ...baseData, id: 'hi', char: 'ひ', romaji: 'hi', exampleSentence: { jp: 'ひ。', reading: 'Hi.', en: "Fire/Day.", level: 'N5' } } as KanaData,
  'fu': { ...baseData, id: 'fu', char: 'ふ', romaji: 'fu', exampleSentence: { jp: 'ふね。', reading: 'Fune.', en: "Boat.", level: 'N5' } } as KanaData,
  'he': { ...baseData, id: 'he', char: 'へ', romaji: 'he', exampleSentence: { jp: 'へび。', reading: 'Hebi.', en: "Snake.", level: 'N5' } } as KanaData,
  'ho': { ...baseData, id: 'ho', char: 'ほ', romaji: 'ほ', confusables: ['ha'], exampleSentence: { jp: 'ほし。', reading: 'Hoshi.', en: "Star.", level: 'N5' } } as KanaData,
  // M-row
  'ma': { ...baseData, id: 'ma', char: 'ま', romaji: 'ma', confusables: ['ho', 'mo'], exampleSentence: { jp: 'まるい。', reading: 'Marui.', en: "Round.", level: 'N5' } } as KanaData,
  'mi': { ...baseData, id: 'mi', char: 'み', romaji: 'mi', exampleSentence: { jp: 'みず。', reading: 'Mizu.', en: "Water.", level: 'N5' } } as KanaData,
  'mu': { ...baseData, id: 'mu', char: 'む', romaji: 'mu', exampleSentence: { jp: 'むし。', reading: 'Mushi.', en: "Insect.", level: 'N5' } } as KanaData,
  'me': { ...baseData, id: 'me', char: 'め', romaji: 'me', confusables: ['nu', 'no'], exampleSentence: { jp: 'め。', reading: 'Me.', en: "Eye.", level: 'N5' } } as KanaData,
  'mo': { ...baseData, id: 'mo', char: 'も', romaji: 'mo', exampleSentence: { jp: 'もり。', reading: 'Mori.', en: "Forest.", level: 'N5' } } as KanaData,
  // Y-row
  'ya': { ...baseData, id: 'ya', char: 'や', romaji: 'ya', exampleSentence: { jp: 'やま。', reading: 'Yama.', en: "Mountain.", level: 'N5' } } as KanaData,
  'yu': { ...baseData, id: 'yu', char: 'ゆ', romaji: 'yu', exampleSentence: { jp: 'ゆめ。', reading: 'Yume.', en: "Dream.", level: 'N5' } } as KanaData,
  'yo': { ...baseData, id: 'yo', char: 'よ', romaji: 'yo', exampleSentence: { jp: 'よる。', reading: 'Yoru.', en: "Night.", level: 'N5' } } as KanaData,
  // R-row
  'ra': { ...baseData, id: 'ra', char: 'ら', romaji: 'ra', exampleSentence: { jp: 'らいねん。', reading: 'Rainen.', en: "Next year.", level: 'N5' } } as KanaData,
  'ri': { ...baseData, id: 'ri', char: 'り', romaji: 'ri', exampleSentence: { jp: 'りんご。', reading: 'Ringo.', en: "Apple.", level: 'N5' } } as KanaData,
  'ru': { ...baseData, id: 'ru', char: 'る', romaji: 'ru', exampleSentence: { jp: 'くる。', reading: 'Kuru.', en: "To come.", level: 'N5' } } as KanaData,
  're': { ...baseData, id: 're', char: 'れ', romaji: 're', exampleSentence: { jp: 'れんしゅう。', reading: 'Renshuu.', en: "Practice.", level: 'N5' } } as KanaData,
  'ro': { ...baseData, id: 'ro', char: 'ろ', romaji: 'ro', exampleSentence: { jp: 'しろい。', reading: 'Shiroi.', en: "White.", level: 'N5' } } as KanaData,
  // W-row & N
  'wa': { ...baseData, id: 'wa', char: 'わ', romaji: 'wa', exampleSentence: { jp: 'わたし。', reading: 'Watashi.', en: "I/Me.", level: 'N5' } } as KanaData,
  'wo': { ...baseData, id: 'wo', char: 'を', romaji: 'wo', exampleSentence: { jp: 'ほんをよむ。', reading: 'Hon o yomu.', en: "Read a book.", level: 'N5' } } as KanaData,
  'n': { ...baseData, id: 'n', char: 'ん', romaji: 'n', exampleSentence: { jp: 'にほん。', reading: 'Nihon.', en: "Japan.", level: 'N5' } } as KanaData,
};
