export type CatId =
  | "animals"
  | "food"
  | "nature"
  | "home"
  | "body"
  | "weather";

export interface DictEntry {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  meaning: string;
  example: string;
  exampleFa: string;
  cat: CatId;
}

export const CATS: { id: CatId; label: string; dot: string }[] = [
  { id: "animals", label: "حیوانات", dot: "#FFC94D" },
  { id: "food", label: "غذا", dot: "#FF8A75" },
  { id: "nature", label: "طبیعت", dot: "#5FD6B4" },
  { id: "home", label: "خانه", dot: "#8FB8DE" },
  { id: "body", label: "بدن", dot: "#F291A6" },
  { id: "weather", label: "سفر و هوا", dot: "#6FC3DF" },
];

export const CAT_LABEL: Record<CatId, string> = Object.fromEntries(
  CATS.map((c) => [c.id, c.label]),
) as Record<CatId, string>;

export const DICT: DictEntry[] = [
  // ---------------- حیوانات ----------------
  { id: "cat", word: "cat", ipa: "/kæt/", pos: "اسم", meaning: "گربه", example: "The cat is sleeping on the sofa.", exampleFa: "گربه روی مبل خوابیده است.", cat: "animals" },
  { id: "dog", word: "dog", ipa: "/dɒɡ/", pos: "اسم", meaning: "سگ", example: "My dog loves to play in the park.", exampleFa: "سگ من عاشق بازی در پارک است.", cat: "animals" },
  { id: "bird", word: "bird", ipa: "/bɜːd/", pos: "اسم", meaning: "پرنده", example: "A small bird is singing in the tree.", exampleFa: "پرندهٔ کوچکی روی درخت آواز می‌خواند.", cat: "animals" },
  { id: "fish", word: "fish", ipa: "/fɪʃ/", pos: "اسم", meaning: "ماهی", example: "We saw colorful fish in the sea.", exampleFa: "ما ماهی‌های رنگارنگی در دریا دیدیم.", cat: "animals" },
  { id: "horse", word: "horse", ipa: "/hɔːs/", pos: "اسم", meaning: "اسب", example: "The horse runs very fast.", exampleFa: "اسب خیلی تند می‌دود.", cat: "animals" },
  { id: "butterfly", word: "butterfly", ipa: "/ˈbʌt.ə.flaɪ/", pos: "اسم", meaning: "پروانه", example: "A butterfly landed on the flower.", exampleFa: "پروانه‌ای روی گل نشست.", cat: "animals" },

  // ---------------- غذا ----------------
  { id: "apple", word: "apple", ipa: "/ˈæp.əl/", pos: "اسم", meaning: "سیب", example: "I eat an apple every morning.", exampleFa: "من هر صبح یک سیب می‌خورم.", cat: "food" },
  { id: "bread", word: "bread", ipa: "/bred/", pos: "اسم", meaning: "نان", example: "She bought fresh bread from the bakery.", exampleFa: "او نان تازه از نانوایی خرید.", cat: "food" },
  { id: "cheese", word: "cheese", ipa: "/tʃiːz/", pos: "اسم", meaning: "پنیر", example: "This cheese tastes wonderful.", exampleFa: "این پنیر مزهٔ فوق‌العاده‌ای دارد.", cat: "food" },
  { id: "egg", word: "egg", ipa: "/eɡ/", pos: "اسم", meaning: "تخم‌مرغ", example: "He cooks an egg for breakfast.", exampleFa: "او برای صبحانه تخم‌مرغ می‌پزد.", cat: "food" },
  { id: "milk", word: "milk", ipa: "/mɪlk/", pos: "اسم", meaning: "شیر", example: "Children drink milk every day.", exampleFa: "کودکان هر روز شیر می‌خورند.", cat: "food" },
  { id: "tomato", word: "tomato", ipa: "/təˈmɑː.təʊ/", pos: "اسم", meaning: "گوجه‌فرنگی", example: "We need tomatoes for the salad.", exampleFa: "برای سالاد به گوجه‌فرنگی نیاز داریم.", cat: "food" },

  // ---------------- طبیعت ----------------
  { id: "sun", word: "sun", ipa: "/sʌn/", pos: "اسم", meaning: "خورشید", example: "The sun rises in the east.", exampleFa: "خورشید از مشرق طلوع می‌کند.", cat: "nature" },
  { id: "moon", word: "moon", ipa: "/muːn/", pos: "اسم", meaning: "ماه", example: "The moon is bright tonight.", exampleFa: "ماه امشب روشن است.", cat: "nature" },
  { id: "star", word: "star", ipa: "/stɑːr/", pos: "اسم", meaning: "ستاره", example: "We counted the stars in the sky.", exampleFa: "ما ستاره‌های آسمان را شمردیم.", cat: "nature" },
  { id: "tree", word: "tree", ipa: "/triː/", pos: "اسم", meaning: "درخت", example: "This tree is over a hundred years old.", exampleFa: "این درخت بیش از صد سال سن دارد.", cat: "nature" },
  { id: "flower", word: "flower", ipa: "/ˈflaʊ.ər/", pos: "اسم", meaning: "گل", example: "The garden is full of beautiful flowers.", exampleFa: "باغ پر از گل‌های زیباست.", cat: "nature" },
  { id: "mountain", word: "mountain", ipa: "/ˈmaʊn.tɪn/", pos: "اسم", meaning: "کوه", example: "They climbed the mountain last summer.", exampleFa: "آن‌ها تابستان گذشته از کوه بالا رفتند.", cat: "nature" },

  // ---------------- خانه ----------------
  { id: "house", word: "house", ipa: "/haʊs/", pos: "اسم", meaning: "خانه", example: "Our house has a small garden.", exampleFa: "خانهٔ ما باغچهٔ کوچکی دارد.", cat: "home" },
  { id: "key", word: "key", ipa: "/kiː/", pos: "اسم", meaning: "کلید", example: "I lost my key yesterday.", exampleFa: "دیروز کلیدم را گم کردم.", cat: "home" },
  { id: "clock", word: "clock", ipa: "/klɒk/", pos: "اسم", meaning: "ساعت دیواری", example: "The clock on the wall shows noon.", exampleFa: "ساعت دیواری، ظهر را نشان می‌دهد.", cat: "home" },
  { id: "lamp", word: "lamp", ipa: "/læmp/", pos: "اسم", meaning: "چراغ", example: "Turn on the lamp, please.", exampleFa: "لطفاً چراغ را روشن کن.", cat: "home" },
  { id: "chair", word: "chair", ipa: "/tʃeər/", pos: "اسم", meaning: "صندلی", example: "Sit on this chair and rest.", exampleFa: "روی این صندلی بنشین و استراحت کن.", cat: "home" },
  { id: "window", word: "window", ipa: "/ˈwɪn.dəʊ/", pos: "اسم", meaning: "پنجره", example: "Open the window to let in fresh air.", exampleFa: "پنجره را باز کن تا هوای تازه بیاید.", cat: "home" },

  // ---------------- بدن ----------------
  { id: "eye", word: "eye", ipa: "/aɪ/", pos: "اسم", meaning: "چشم", example: "She has beautiful green eyes.", exampleFa: "او چشم‌های سبز زیبایی دارد.", cat: "body" },
  { id: "hand", word: "hand", ipa: "/hænd/", pos: "اسم", meaning: "دست", example: "Wash your hands before lunch.", exampleFa: "قبل از ناهار دست‌هایت را بشوی.", cat: "body" },
  { id: "heart", word: "heart", ipa: "/hɑːt/", pos: "اسم", meaning: "قلب", example: "My heart beats fast when I run.", exampleFa: "هنگام دویدن، قلبم تند می‌تپد.", cat: "body" },
  { id: "ear", word: "ear", ipa: "/ɪər/", pos: "اسم", meaning: "گوش", example: "Rabbits have long ears.", exampleFa: "خرگوش‌ها گوش‌های بلندی دارند.", cat: "body" },
  { id: "tooth", word: "tooth", ipa: "/tuːθ/", pos: "اسم", meaning: "دندان", example: "Brush your teeth twice a day.", exampleFa: "روزی دو بار دندان‌هایت را مسواک بزن.", cat: "body" },
  { id: "nose", word: "nose", ipa: "/nəʊz/", pos: "اسم", meaning: "بینی", example: "The clown has a red nose.", exampleFa: "دلقک بینی قرمزی دارد.", cat: "body" },

  // ---------------- سفر و هوا ----------------
  { id: "car", word: "car", ipa: "/kɑːr/", pos: "اسم", meaning: "ماشین", example: "We travelled to Shiraz by car.", exampleFa: "ما با ماشین به شیراز سفر کردیم.", cat: "weather" },
  { id: "boat", word: "boat", ipa: "/bəʊt/", pos: "اسم", meaning: "قایق", example: "The boat sails across the lake.", exampleFa: "قایق در عرض دریاچه حرکت می‌کند.", cat: "weather" },
  { id: "train", word: "train", ipa: "/treɪn/", pos: "اسم", meaning: "قطار", example: "The train leaves the station at nine.", exampleFa: "قطار ساعت نُه ایستگاه را ترک می‌کند.", cat: "weather" },
  { id: "umbrella", word: "umbrella", ipa: "/ʌmˈbrel.ə/", pos: "اسم", meaning: "چتر", example: "Take an umbrella; it is raining.", exampleFa: "چتر ببر؛ دارد باران می‌بارد.", cat: "weather" },
  { id: "cloud", word: "cloud", ipa: "/klaʊd/", pos: "اسم", meaning: "ابر", example: "A dark cloud covers the sky.", exampleFa: "ابری تیره آسمان را پوشانده است.", cat: "weather" },
  { id: "rainbow", word: "rainbow", ipa: "/ˈreɪn.bəʊ/", pos: "اسم", meaning: "رنگین‌کمان", example: "A rainbow appeared after the rain.", exampleFa: "بعد از باران، رنگین‌کمانی پدیدار شد.", cat: "weather" },
];

export const ENTRY_MAP: Record<string, DictEntry> = Object.fromEntries(
  DICT.map((e) => [e.id, e]),
);

export const STARTER_WORDS = [
  "apple",
  "cat",
  "sun",
  "house",
  "heart",
  "car",
  "flower",
  "star",
];
