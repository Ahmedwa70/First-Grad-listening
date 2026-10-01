/**
 * lesson-01.js
 * بيانات المحاضرة الأولى — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: ب ت ث ن
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
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
  //   إرشادات loop الاستماع (P6)؛ المصدر الوحيد منذ إزالة p6Guides.

  // ─── معلومات عامة ────────────────────────────────────────
  meta: {
    id:       'lesson-01',
    number:   1,
    title:    'الدرس الأول',
    subtitle: 'ب  ت  ث  ن',
    summaryTitle: 'اكتمل الدرس الأول',
    welcomeHintAr: '🎓 الدرس الأول',
    welcomeHintZh: '第一课',
    level:    'A0',
    duration: 120,
    targetLetters: ['ب', 'ت', 'ث', 'ن'],
    description: 'الدرس الأول — الحروف: ب ت ث ن — حروف العربية',
    docTitle: 'الدرس الأول — ب ت ث ن',
    completion: {
      title: 'الدرس الأول مكتمل',
      chars: [
        { id: 'ba',  char: 'ب' },
        { id: 'ta',  char: 'ت' },
        { id: 'tha', char: 'ث' },
        { id: 'nun', char: 'ن' },
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
      chars: 'الحروف (ج • ح • خ)',
      hint:  'سنتعلم أصوات ومخارج الحلق',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  // أثناء التأجيل: التسلسل الطبيعي القادم من P3 يدخل على شاشة المقارنة مباشرةً؛
  // الدخول المباشر من الشريط العلوي يفتح P4 كاملاً من بدايته.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  letters: [
    {
      id:        'ba',
      char:      'ب',
      name:      'باء',
      phoneme:   '/ب/',
      dots:      1,
      dotPosition: 'أسفل',
      ipa:       'b',
      chinesePinyin: '吧',
      fact:      'نقطة واحدة أسفل الحرف',
      color:     '#0E7C7B',
      audioFile: 'assets/audio/ba.mp3',
    },
    {
      id:        'ta',
      char:      'ت',
      name:      'تاء',
      phoneme:   '/ت/',
      dots:      2,
      dotPosition: 'فوق',
      ipa:       't',
      chinesePinyin: '他',
      fact:      'نقطتان فوق الحرف',
      color:     '#1E8449',
      audioFile: 'assets/audio/ta.mp3',
    },
    {
      id:        'tha',
      char:      'ث',
      name:      'ثاء',
      phoneme:   '/ث/',
      dots:      3,
      dotPosition: 'فوق',
      ipa:       'θ',
      chinesePinyin: '(لا مقابل — اللسان بين الأسنان)',
      fact:      'ثلاث نقاط فوق الحرف',
      color:     '#8B5CF6',
      heroColor: '#7C4DDB',
      audioFile: 'assets/audio/tha.mp3',
    },
    {
      id:        'nun',
      char:      'ن',
      name:      'نون',
      phoneme:   '/ن/',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'n',
      chinesePinyin: '那',
      fact:      'نقطة واحدة فوق الحرف — القوس أعمق',
      color:     '#C9A227',
      heroColor: '#A8851E',
      audioFile: 'assets/audio/nun.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'ba',
      videoFile:  'assets/videos/ba.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من اليمين — ارسم قوساً أفقياً صغيراً من اليمين إلى اليسار' },
        { label: 'نقطة البداية', desc: 'نقطة البداية في الطرف الأيمن — الحركة إلى اليسار دائماً' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة في المنتصف أسفل الجسم' },
        { label: 'مراجعة', desc: 'قوس + نقطة واحدة في الأسفل = ب' },
      ],
      color: '#0E7C7B',
    },
    {
      letterId:   'ta',
      videoFile:  'assets/videos/ta.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس جسم الباء تماماً — قوس أفقي من اليمين إلى اليسار' },
        { label: 'نقطة البداية', desc: 'نقطة البداية في الطرف الأيمن — نفس حركة الباء' },
        { label: 'النقطتان', desc: 'ضع نقطتين فوق الجسم — واحدة يمين وواحدة يسار' },
        { label: 'مراجعة', desc: 'قوس + نقطتان فوق = ت — قارن مع الباء' },
      ],
      color: '#1E8449',
    },
    {
      letterId:   'tha',
      videoFile:  'assets/videos/tha.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس الجسم مرة ثالثة — قوس أفقي متطابق' },
        { label: 'نقطة البداية', desc: 'نفس نقطة البداية — لاحظ كيف الجسم مشترك بين ب ت ث' },
        { label: 'النقطة الأولى', desc: 'أول نقطة فوق الجسم — في المنتصف أعلى' },
        { label: 'النقطة الثانية', desc: 'ثاني نقطة — إلى يمين الأولى، بمستوى أخفض قليلاً' },
        { label: 'مراجعة', desc: 'النقطة الثالثة تكتمل الشكل — قوس + ثلاث نقاط فوق = ث — الفرق الوحيد هو عدد النقاط' },
      ],
      color: '#8B5CF6',
    },
    {
      letterId:   'nun',
      videoFile:  'assets/videos/nun.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'القوس أعمق وأوسع من ب ت ث — مثل الوعاء' },
        { label: 'نقطة البداية', desc: 'ابدأ من الأعلى يميناً — الحركة دائرية للأسفل ثم لليسار' },
        { label: 'النقطة', desc: 'نقطة واحدة فوق المنتصف' },
        { label: 'مراجعة', desc: 'قوس عميق + نقطة فوق = ن — قارن مع الباء: ن أعمق وأوسع' },
      ],
      color: '#C9A227',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  words: [
    {
      id:      'bab',
      word:    'بَاب',
      meaning: 'باب (door)',
      targetLetterId: 'ba',
      targetPositions: [0, 2],       // فهارس الحروف المستهدفة في الكلمة
      chars:   ['ب', 'ا', 'ب'],
      audioText: 'بَاب',
      audioFile: 'assets/audio/word_bab.mp3',
      color:   '#0E7C7B',
    },
    {
      id:      'bayt',
      word:    'بَيْت',
      meaning: 'بيت (house)',
      targetLetterId: 'ba',
      targetPositions: [0],
      chars:   ['ب', 'ي', 'ت'],
      audioText: 'بيت',
      audioFile: 'assets/audio/word_bayt.mp3',
      color:   '#0E7C7B',
    },
    {
      id:      'tamr',
      word:    'تَمْر',
      meaning: 'تمر (dates/fruit)',
      targetLetterId: 'ta',
      targetPositions: [0],
      chars:   ['ت', 'م', 'ر'],
      audioText: 'تمر',
      audioFile: 'assets/audio/word_tamr.mp3',
      color:   '#1E8449',
    },
    {
      id:      'thawb',
      word:    'ثَوْب',
      meaning: 'ثوب (garment)',
      targetLetterId: 'tha',
      targetPositions: [0],
      chars:   ['ث', 'و', 'ب'],
      audioText: 'ثوب',
      audioFile: 'assets/audio/word_thawb.mp3',
      color:   '#8B5CF6',
    },
    {
      id:      'nar',
      word:    'نَار',
      meaning: 'نار (fire)',
      targetLetterId: 'nun',
      targetPositions: [0],
      chars:   ['ن', 'ا', 'ر'],
      audioText: 'نار',
      audioFile: 'assets/audio/word_nar.mp3',
      color:   '#C9A227',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    bab:   { emoji: '🚪', zh: '门' },
    bayt:  { emoji: '🏠', zh: '房子' },
    tamr:  { emoji: '🌴', zh: '椰枣' },
    thawb: { emoji: '👘', zh: '长袍' },
    nar:   { emoji: '🔥', zh: '火' },
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
        ar: 'سنستمع إلى أصوات الحروف — كل حرف له صوت مختلف',
        zh: '我们将听字母的声音——每个字母有不同的声音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الباء كمثال توضيحي للطلاب.',
        exampleLetterId: 'ba',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: ب=١  ت=٢  ث=٣  ن=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：ب=1  ت=2  ث=3  ن=4——听到声音时举起手指',
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
        ar: 'ب / ت / ث — نفس الجسم، صوت مختلف. شغّل الثلاثة تباعاً وراقب',
        zh: 'ب / ت / ث——字形相同，声音不同。依次播放并观察',
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
        { playId: 'ba',  answer: 1 },
        { playId: 'ta',  answer: 2 },
        { playId: 'tha', answer: 3 },
        { playId: 'nun', answer: 4 },
        { playId: 'ba',  answer: 1 },
        { playId: 'tha', answer: 3 },
        { playId: 'nun', answer: 4 },
        { playId: 'ta',  answer: 2 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['ba',  'ba' ], same: true  },
        { playIds: ['ba',  'ta' ], same: false },
        { playIds: ['ta',  'ta' ], same: true  },
        { playIds: ['tha', 'nun'], same: false },
        { playIds: ['nun', 'nun'], same: true  },
        { playIds: ['ba',  'tha'], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'ب / ت / ث — نفس الجسم، صوت مختلف. شغّل الثلاثة تباعاً وراقب',
      triplets: [
        { ids: ['ba', 'ta', 'tha'], note: 'الجسم واحد — النقاط تغيّر الصوت' },
        { ids: ['ba', 'nun'],        note: 'نقطة واحدة لكليهما — الموضع يختلف' },
      ],
    },
  ],

  // ─── P7 — نصوص التلميح لكل جولة (عربية / صينية) ────────────
  p7Prompts: {
    Q1: ['ما هذا الحرف؟ اذكر اسمه بصوت واضح', '这个字母叫什么？'],
    Q2: ['كم عدد النقاط وما موضعها؟', '有几个点？在什么位置？'],
    Q3: ['انطق صوت الحرف بحركة صحيحة', '这个字母怎么发音？'],
  },

  // ─── أسئلة P7 — التقييم الختامي ────────────────────────────
  assessmentRounds: [
    {
      id:    'Q1',
      type:  'show-letter',
      label: 'ما هذا الحرف؟',
      instruction: 'اعرض الحرف على الشاشة — اطلب قراءته بصوت عالٍ',
      items: [
        { letterId: 'ba',  show: 'char',    question: 'ما هذا الحرف؟',     answer: 'ب — باء' },
        { letterId: 'ta',  show: 'char',    question: 'ما هذا الحرف؟',     answer: 'ت — تاء' },
        { letterId: 'tha', show: 'char',    question: 'ما هذا الحرف؟',     answer: 'ث — ثاء' },
        { letterId: 'nun', show: 'char',    question: 'ما هذا الحرف؟',     answer: 'ن — نون' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'ba',  question: 'كم نقطة وأين؟',   answer: 'نقطة واحدة — تحت' },
        { letterId: 'tha', question: 'كم نقطة وأين؟',   answer: 'ثلاث نقاط — فوق' },
        { letterId: 'ta',  question: 'كم نقطة وأين؟',   answer: 'نقطتان — فوق' },
        { letterId: 'nun', question: 'كم نقطة وأين؟',   answer: 'نقطة واحدة — فوق' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'nun', question: 'ما الحرف الذي تسمعه؟',  answer: 'ن' },
        { letterId: 'ba',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ب' },
        { letterId: 'tha', question: 'ما الحرف الذي تسمعه؟',  answer: 'ث' },
        { letterId: 'ta',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ت' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['ب','ت','ث','ن'],

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
          hint:    '🎓 الدرس الأول · 第一课',
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
      phonemeOrder: ['ba', 'ta', 'tha', 'nun'],
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
          instruction: 'ب=١  |  ت=٢  |  ث=٣  |  ن=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'ba': 1, 'ta': 2, 'tha': 3, 'nun': 4,
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
      letterOrder: ['ba', 'ta', 'tha', 'nun'],
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
      letterOrder: ['ba', 'ta', 'tha', 'nun'],
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
      wordOrder: ['bab', 'bayt', 'tamr', 'thawb', 'nar'],
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
