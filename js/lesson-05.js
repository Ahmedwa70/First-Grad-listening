/**
 * lesson-05.js
 * بيانات المحاضرة الخامسة — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: م ي ا ه
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: م=١ تحت، ي=٢ تحت، ا=٠ بلا نقاط، ه=٠ بلا نقاط — «المراجعة من السلاسل المتصلة»)
 * المصادر: حروف «م ي ا» وجملة «هَذَا مَاء. هَذِهِ يَد» من المحاضرة 2 الرسمية
 *   (Pedagogical Blueprint — «الحروف م ي ا — وأول مقاطع»، مفرداتها: مَاء يَد أَمَل نَام)؛
 *   حرف «ه» والكلمتان «هَذَا» و«هُوَ» من محادثات المحاضرات 1/2/10 الرسمية.
 *   الألف تُقدَّم كحرف مدّ بعد الفتحة مباشرةً (بَ + ا = بَا) وفق منهج المحاضرة 2 الرسمية.
 */

const LESSON = {
  // ─── عقد مخطط البيانات (schema contract) ─────────────────────
  // meta.id, meta.title, meta.docTitle, meta.description  ومطلوبة.
  // meta.targetLetters  ترتيب بطاقة البطل (P1) — يطابق letters[].char.
  // meta.summaryTitle / welcomeHintAr / welcomeHintZh: نصوص P7/P1 تُقرأ منها
  //   (الأنشطة لا تحمل نصوصاً خاصة بأي محاضرة).
  // letters[].color  مصدر لون الحرف في كل التدفقات.
  // letters[].heroColor  اختياري — درجة مغايرة لبطاقة البطل فقط (P1).
  // p6Demo.steps[].teacherHint  تُعرض كإرشاد المعلم في P6-demo.
  // p6Demo.steps[].exampleLetterId  (خطوة demo-listen) — معرّف حرف الصوت المثال.
  // p6Strings[round-type].teacherGuide.{purpose,before,listen,reveal} —
  //   إرشادات loop الاستماع (P6).

  // ─── معلومات عامة ────────────────────────────────────────
  meta: {
    id:       'lesson-05',
    number:   5,
    title:    'الحروف الخامسة',
    subtitle: 'م  ي  ا  ه',
    summaryTitle: 'انتهت المحاضرة الخامسة',
    welcomeHintAr: '🎓 المحاضرة الخامسة',
    welcomeHintZh: '第五课',
    level:    'A0',
    duration: 120,
    targetLetters: ['م', 'ي', 'ا', 'ه'],
    description: 'المحاضرة الخامسة — الحروف: م ي ا ه — نظام التدريس التفاعلي',
    docTitle: 'المحاضرة الخامسة — م ي ا ه',
    completion: {
      title: 'المحاضرة الخامسة مكتملة',
      chars: [
        { id: 'meem', char: 'م' },
        { id: 'ya',   char: 'ي' },
        { id: 'alif', char: 'ا' },
        { id: 'heh',  char: 'ه' },
      ],
      subtitle: {
        title: 'الطلاب الآن يعرفون:',
        lines: [
          '✓ أصوات الحروف الأربعة',
          '✓ شكل كل حرف ونقاطه',
          '✓ كيفية كتابة كل حرف',
          '✓ الحروف داخل كلمات حقيقية',
        ],
      },
    },
    nextLesson: {
      chars: 'الحروف (ف • و • ق • ك)',
      hint:  'سنتعلم حروفاً جديدة ونقرأ مقاطع بالضمة',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  // الألوان/النقاط/النطق التحريرية خاصة بهذه المحاضرة (لا تُنسخ من محاضرات سابقة).
  letters: [
    {
      id:        'meem',
      char:      'م',
      name:      'ميم',
      phoneme:   '/م/',
      dots:      1,
      dotPosition: 'تحت',
      ipa:       'm',
      chinesePinyin: '姆',
      fact:      'دائرة مقفلة بنقطة تحت — الصوت من الشفتين المطبقتين، له صدى يمرّ من الأنف',
      color:     '#607D8B',
      heroColor: '#37474F',
      audioFile: 'assets/audio/meem.mp3',
    },
    {
      id:        'ya',
      char:      'ي',
      name:      'ياء',
      phoneme:   '/ي/',
      dots:      2,
      dotPosition: 'تحت',
      ipa:       'j',
      chinesePinyin: '耶',
      fact:      'سنّان بنقطتين تحت — حرف متصل يمدّ الصوت من مقدمة اللسان',
      color:     '#FFC107',
      heroColor: '#FFA000',
      audioFile: 'assets/audio/ya.mp3',
    },
    {
      id:        'alif',
      char:      'ا',
      name:      'ألف',
      phoneme:   '/ا/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'aː',
      chinesePinyin: '啊',
      fact:      'عمود قائم بلا نقاط — حرف مدّ: الفتحة فوق أي حرف تتبعه فتُمَدّ به (بَ + ا = بَا)',
      color:     '#9C27B0',
      heroColor: '#7B1FA2',
      audioFile: 'assets/audio/alif.mp3',
    },
    {
      id:        'heh',
      char:      'ه',
      name:      'هاء',
      phoneme:   '/ه/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'h',
      chinesePinyin: '哈',
      fact:      'قوسان مفتوحان بلا نقاط — نفسٌ خفيف ساكن من الحنجرة، أخفّ من الحاء',
      color:     '#D32F2F',
      heroColor: '#C62828',
      audioFile: 'assets/audio/heh.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'meem',
      videoFile:  'assets/videos/meem.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من اليمين — ارسم دائرة مقفلة تطبق على بعضها' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة تحت الجسم في المنتصف' },
        { label: 'مراجعة', desc: 'دائرة مطبقة + نقطة تحت = م' },
      ],
      color: '#607D8B',
    },
    {
      letterId:   'ya',
      videoFile:  'assets/videos/ya.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم سنّاً قصيراً ينزل وينحني نحو اليسار' },
        { label: 'النقطتان', desc: 'ضع نقطتين تحت السنّ بجانب بعضهما' },
        { label: 'مراجعة', desc: 'سنّ + نقطتان تحت = ي' },
      ],
      color: '#FFC107',
    },
    {
      letterId:   'alif',
      videoFile:  'assets/videos/alif.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم عموداً قائماً من الأعلى نحو الأسفل' },
        { label: 'بلا نقاط', desc: 'لا نقطة فوق ولا تحت — أرفع حروف الكتابة وأبسطها' },
        { label: 'مراجعة', desc: 'عمود قائم بلا نقاط = ا — تمدّد بعده الفتحة' },
      ],
      color: '#9C27B0',
    },
    {
      letterId:   'heh',
      videoFile:  'assets/videos/heh.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم قوسين مفتوحين متتاليين تنفتح ذروتاهما نحو الأعلى' },
        { label: 'بلا نقاط', desc: 'لا نقطة إطلاقاً — اتركه مفتوحاً' },
        { label: 'مراجعة', desc: 'قوسان مفتوحان بلا نقاط = ه' },
      ],
      color: '#D32F2F',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  // جميع الكلمات من المفردات/الجمل الرسمية للمشروع (Blueprint المحاضرات 1/2/10).
  words: [
    {
      id:      'maa',
      word:    'مَاء',
      meaning: 'ماء (water)',
      targetLetterId: 'meem',
      targetPositions: [0],
      chars:   ['م', 'ا', 'ء'],
      audioText: 'مَاء',
      audioFile: 'assets/audio/word_maa.mp3',
      color:   '#607D8B',
    },
    {
      id:      'yad',
      word:    'يَد',
      meaning: 'يد (hand)',
      targetLetterId: 'ya',
      targetPositions: [0],
      chars:   ['ي', 'د'],
      audioText: 'يَد',
      audioFile: 'assets/audio/word_yad.mp3',
      color:   '#FFC107',
    },
    {
      id:      'amal',
      word:    'أَمَل',
      meaning: 'أمل (hope)',
      targetLetterId: 'meem',
      targetPositions: [1],
      chars:   ['أ', 'م', 'ل'],
      audioText: 'أَمَل',
      audioFile: 'assets/audio/word_amal.mp3',
      color:   '#607D8B',
    },
    {
      id:      'naam',
      word:    'نَام',
      meaning: 'نام (slept)',
      targetLetterId: 'alif',
      targetPositions: [1],
      chars:   ['ن', 'ا', 'م'],
      audioText: 'نَام',
      audioFile: 'assets/audio/word_naam.mp3',
      color:   '#9C27B0',
    },
    {
      id:      'hadha',
      word:    'هَذَا',
      meaning: 'هذا (this)',
      targetLetterId: 'heh',
      targetPositions: [0],
      chars:   ['ه', 'ذ', 'ا'],
      audioText: 'هَذَا',
      audioFile: 'assets/audio/word_hadha.mp3',
      color:   '#D32F2F',
    },
    {
      id:      'huwa',
      word:    'هُوَ',
      meaning: 'هو (he)',
      targetLetterId: 'heh',
      targetPositions: [0],
      chars:   ['ه', 'و'],
      audioText: 'هُوَ',
      audioFile: 'assets/audio/word_huwa.mp3',
      color:   '#D32F2F',
    },
    {
      id:      'hadhihi',
      word:    'هَذِهِ',
      meaning: 'هذه (this — f)',
      targetLetterId: 'heh',
      targetPositions: [0, 2],
      chars:   ['ه', 'ذ', 'ه'],
      audioText: 'هَذِهِ',
      audioFile: 'assets/audio/word_hadhihi.mp3',
      color:   '#D32F2F',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    maa:     { emoji: '💧', zh: '水' },
    yad:     { emoji: '✋', zh: '手' },
    amal:    { emoji: '🌟', zh: '希望' },
    naam:    { emoji: '😴', zh: '睡觉' },
    hadha:   { emoji: '👈', zh: '这个' },
    huwa:    { emoji: '👤', zh: '他' },
    hadhihi: { emoji: '👉', zh: '这个（阴性）' },
  },

  // ─── P5 — خطوات الكشف (تسلسل العرض الحقيقي في P5) ──────────
  p5RevealSteps: [
    { key: 'context', label: 'الكلمة والمعنى' },
    { key: 'target',  label: 'تمييز الحرف' },
    { key: 'identity',label: 'هوية الحرف' },
    { key: 'audio',   label: 'الصوت والترديد' },
  ],

  // ─── P6 — مقدمة توضيحية للمبتدئين A0 ─────────────────────
  p6Demo: {
    steps: [
      {
        id: 'demo-listen',
        ar: 'سنستمع إلى أصوات ممدودة ومتّصلة لأول مرة — كل حرف صوتٌ يزين الكلمة وينساب فيها',
        zh: '我们将首次听长音和连读字母——每个字母以独特的声音融入词语',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الميم كمثال توضيحي للطلاب.',
        exampleLetterId: 'meem',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: م=١  ي=٢  ا=٣  ه=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：م=1  ي=2  ا=3  ه=4——听到声音时举起手指',
        teacherHint: 'أشر إلى كل حرف ورقمه واطلب من الطلاب محاكاة رفع الأصابع.',
      },
      {
        id: 'demo-same-diff',
        ar: 'سنسمع صوتين — هل هما نفس الصوت أم مختلفان؟',
        zh: '我们将听两个声音——它们相同还是不同？',
        teacherHint: 'وضّح إشارة الإبهامين للتطابق وعقد الأصابع للاختلاف للطلاب.',
      },
    ],
  },

  // ─── P6 — النصوص ثنائية اللغة ─────────────────────────────
  p6Strings: {
    phaseTitle: { ar: 'التمييز السمعي', zh: '听觉辨别' },
    identify: {
      instruction: {
        ar: 'شغّل الصوت —  اطلب من الطلاب رفع عدد الأصابع المقابل للحرف الذي يسمعونه',
        zh: '播放声音——让学生举起与所听字母对应的手指数',
      },
      question: { ar: 'كم إصبعاً؟', zh: '几个手指？' },
      teacherGuide: {
        purpose: { ar: 'تمييز الصوت', zh: '辨别声音' },
        before:  { ar: 'شغّل الصوت', zh: '播放声音' },
        listen:  { ar: 'ارفعوا الإصبع عند سماع الصوت', zh: '听到声音后举起手指' },
        reveal:  { ar: 'الإجابة ظاهرة', zh: '答案已显示' },
      },
    },
    sameordiff: {
      instruction: {
        ar: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
        zh: '播放两个声音——相同则竖两个拇指，不同则交叉手指',
      },
      question: { ar: 'نفس أم مختلف؟', zh: '相同还是不同？' },
      same: { ar: '= نفس الصوت', zh: '= 相同的声音' },
      diff: { ar: '≠ صوتان مختلفان', zh: '≠ 不同的声音' },
      teacherGuide: {
        purpose: { ar: 'مقارنة صوتين', zh: '比较两个声音' },
        before:  { ar: 'شغّل الصوتين', zh: '播放两个声音' },
        listen:  { ar: 'نفس الصوت أم مختلف؟', zh: '相同还是不同？' },
        reveal:  { ar: 'الإجابة ظاهرة', zh: '答案已显示' },
      },
    },
    close: {
      instruction: {
        ar: 'م / ه — ي / ا — أشكال متقاربة وأصوات ممدودة. شغّل الأزواج تباعاً وراقب',
        zh: 'م/ه——ي/ا——字形相近、声音绵长。依次播放并观察',
      },
      listenPrompt: { ar: 'استمع إلى الأصوات المتقاربة', zh: '听相似的声音' },
      teacherGuide: {
        purpose: { ar: 'تمييز المتقاربة', zh: '辨别相似音' },
        before:  { ar: 'شغّل كل حرف', zh: '播放每个字母' },
        listen:  { ar: 'لاحظوا الفرق بين الأصوات', zh: '注意声音之间的区别' },
        reveal:  { ar: 'الإجابة ظاهرة', zh: '答案已显示' },
      },
    },
    ui: {
      playSound:   { ar: 'شغّل الصوت', zh: '播放声音' },
      sound1:      { ar: 'صوت ١', zh: '声音 1' },
      sound2:      { ar: 'صوت ٢', zh: '声音 2' },
      revealBtn:   { ar: '◎ كشف الإجابة', zh: '◎ 显示答案' },
      nextBtn:     { ar: 'التالي ←', zh: '下一个 ←' },
      revealName:  { ar: 'كشف اسم الحرف ←', zh: '显示字母名 ←' },
      revealFingers: { ar: 'كشف الأصابع ←', zh: '显示手指数 ←' },
      correctAnswer: { ar: 'الإجابة الصحيحة', zh: '正确答案' },
      answerPanel: { ar: 'لوحة الإجابة', zh: '答案面板' },
      forTeacher:  { ar: 'للمعلم', zh: '教师用' },
      listenCompare: { ar: 'استمع ثم قارن', zh: '听然后比较' },
      finger:      { ar: 'إصبع', zh: '手指' },
      fingers:     { ar: 'أصابع', zh: '手指' },
      demoTitle:   { ar: 'تعليمات النشاط', zh: '活动说明' },
      startActivity: { ar: 'ابدأ النشاط ←', zh: '开始活动 ←' },
    },
  },

  // ─── أسئلة P6 — التمييز السمعي ─────────────────────────────
  discriminationRounds: [
    {
      id:   'D1',
      type: 'identify',
      label: 'تعرّف على الحرف',
      instruction: 'شغّل الصوت —  اطلب من الطلاب رفع عدد الأصابع المقابل للحرف الذي يسمعونه',
      pairs: [
        { playId: 'meem', answer: 1 },
        { playId: 'ya',   answer: 2 },
        { playId: 'alif', answer: 3 },
        { playId: 'heh',  answer: 4 },
        { playId: 'meem', answer: 1 },
        { playId: 'heh',  answer: 4 },
        { playId: 'ya',   answer: 2 },
        { playId: 'alif', answer: 3 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['meem', 'meem'], same: true  },
        { playIds: ['meem', 'ya'  ], same: false },
        { playIds: ['ya',   'ya'  ], same: true  },
        { playIds: ['ya',   'alif'], same: false },
        { playIds: ['alif', 'alif'], same: true  },
        { playIds: ['alif', 'heh' ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'م / ه — ي / ا — أشكال متقاربة وأصوات ممدودة. شغّل الأزواج تباعاً وراقب',
      triplets: [
        { ids: ['meem', 'heh'], note: 'الدائرة المقفلة والمفتوحة — استمعوا لفرق الصدى في الميم' },
        { ids: ['ya',   'alif'], note: 'حرفا المدّ — الياء تنحني والألف تظل مستقيماً' },
      ],
    },
  ],

  // ─── P7 — نصوص التلميح لكل جولة (عربية / صينية) ────────────
  p7Prompts: {
    Q1: ['ما هذا الحرف؟ انطق اسمه بوضوح', '这个字母叫什么？'],
    Q2: ['هل للحرف نقاط؟ وكم عددها؟', '这个字母有点吗？有几个？'],
    Q3: ['انطق صوت الحرف من مخرجه الصحيح', '这个字母怎么发音？'],
  },

  // ─── أسئلة P7 — التقييم الختامي ────────────────────────────
  assessmentRounds: [
    {
      id:    'Q1',
      type:  'show-letter',
      label: 'ما هذا الحرف؟',
      instruction: 'اعرض الحرف على الشاشة — اطلب قراءته بصوت عالٍ',
      items: [
        { letterId: 'meem', show: 'char', question: 'ما هذا الحرف؟', answer: 'م — ميم' },
        { letterId: 'ya',   show: 'char', question: 'ما هذا الحرف؟', answer: 'ي — ياء' },
        { letterId: 'alif', show: 'char', question: 'ما هذا الحرف؟', answer: 'ا — ألف' },
        { letterId: 'heh',  show: 'char', question: 'ما هذا الحرف؟', answer: 'ه — هاء' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'meem', question: 'كم نقطة وأين؟', answer: 'نقطة واحدة — تحت' },
        { letterId: 'ya',   question: 'كم نقطة وأين؟', answer: 'نقطتان — تحت' },
        { letterId: 'alif', question: 'كم نقطة وأين؟', answer: 'لا نقاط' },
        { letterId: 'heh',  question: 'كم نقطة وأين؟', answer: 'لا نقاط' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'heh',  question: 'ما الحرف الذي تسمعه؟', answer: 'ه' },
        { letterId: 'meem', question: 'ما الحرف الذي تسمعه؟', answer: 'م' },
        { letterId: 'alif', question: 'ما الحرف الذي تسمعه؟', answer: 'ا' },
        { letterId: 'ya',   question: 'ما الحرف الذي تسمعه؟', answer: 'ي' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['م','ي','ا','ه'],

  // ─── المراحل ──────────────────────────────────────────────
  phases: [

    // ════════════════════════════════════
    // P1 — افتتاح الدرس (0–10 دقائق)
    // ════════════════════════════════════
    {
      id:       'P1',
      number:   1,
      title:    'افتتاح الدرس',
      duration: '٠ — ١٠ دقائق',
      goal:     'تأسيس البيئة الآمنة وتهيئة الطلاب',
      steps: [
        {
          id:      'P1-S1',
          label:   'الخطوة ١',
          content: 'intro',
          hint:    'اضغط Space لبدء الدرس',
        },
        {
          id:      'P1-S2',
          label:   'الخطوة ٢',
          content: 'universe',
          hint:    '🎓 المحاضرة الخامسة · 第五课',
        },
        {
          id:      'P1-S3',
          label:   'الخطوة ٣',
          content: 'spotlight',
          hint:    '🎯 حروف درس اليوم — اضغط تقدم للبدء',
        },
      ],
    },

    // ════════════════════════════════════
    // P2 — الصوت أولاً (10–25 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P2',
      number:   2,
      title:    'الصوت أولاً',
      duration: '١٠ — ٢٥ دقيقة',
      goal:     'ترسيخ الأصوات الأربعة قبل رؤية الحروف المكتوبة',
      phonemeOrder: ['meem', 'ya', 'alif', 'heh'],
      activities: [
        {
          id:    'P2-A1',
          type:  'silent-listen',
          label: 'الاستماع الصامت',
          instruction: 'شغّل الصوت واطلب من الطلاب إغماض أعينهم والاستماع فقط',
        },
        {
          id:    'P2-A2',
          type:  'choral-repeat',
          label: 'الترديد الجماعي',
          instruction: 'شغّل الصوت ثم اضغط زر الترديد للإشارة للطلاب بالتكرار',
        },
        {
          id:    'P2-A3',
          type:  'finger-count',
          label: 'عدّ الأصابع',
          instruction: 'م=١  |  ي=٢  |  ا=٣  |  ه=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'meem': 1, 'ya': 2, 'alif': 3, 'heh': 4,
      },
    },

    // ════════════════════════════════════
    // P3 — كشف الحروف (25–40 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P3',
      number:   3,
      title:    'كشف الحروف',
      duration: '٢٥ — ٤٠ دقيقة',
      goal:     'ربط الصوت المُرسَّخ في P2 بشكله المكتوب',
      letterOrder: ['meem', 'ya', 'alif', 'heh'],
      revealSteps: [
        { key: 'char',    label: 'الحرف' },
        { key: 'dots',    label: 'النقاط' },
        { key: 'phoneme', label: 'الصوت' },
        { key: 'fact',    label: 'القاعدة' },
      ],
    },

    // ════════════════════════════════════
    // P4 — تدريب الكتابة (40–60 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P4',
      number:   4,
      title:    'تدريب الكتابة',
      duration: '٤٠ — ٦٠ دقيقة',
      goal:     'تعلم اتجاه الكتابة ونقاط البداية والتتبع البصري لكل حرف',
      letterOrder: ['meem', 'ya', 'alif', 'heh'],
    },

    // ════════════════════════════════════
    // P5 — الحروف في الكلمات (60–80 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P5',
      number:   5,
      title:    'الحروف في الكلمات',
      duration: '٦٠ — ٨٠ دقيقة',
      goal:     'ربط الحرف المعزول بموضعه داخل كلمات حقيقية بسيطة',
      wordOrder: ['maa', 'yad', 'amal', 'naam', 'hadha', 'huwa', 'hadhihi'],
    },

    // ════════════════════════════════════
    // P6 — التمييز السمعي (80–100 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P6',
      number:   6,
      title:    'التمييز السمعي',
      duration: '٨٠ — ١٠٠ دقيقة',
      goal:     'تمييز الأصوات المتقاربة والتعرف السمعي على كل حرف',
      roundOrder: ['D1', 'D2', 'D3'],
    },

    // ════════════════════════════════════
    // P7 — التقييم الختامي (100–120 دقيقة)
    // ════════════════════════════════════
    {
      id:       'P7',
      number:   7,
      title:    'التقييم الختامي',
      duration: '١٠٠ — ١٢٠ دقيقة',
      goal:     'تقييم استيعاب الطلاب للحروف الأربعة صوتاً وشكلاً ونقاطاً',
      roundOrder: ['Q1', 'Q2', 'Q3'],
    },
  ],
};

// تجميد البيانات — لا تعديل أثناء التشغيل
Object.freeze(LESSON);