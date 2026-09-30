/**
 * lesson-03.js
 * بيانات المحاضرة الثالثة — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: س ش ص
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: س=٠ بلا نقاط، ش=٣ فوق، ص=٠ بلا نقاط — «أصوات الصفير والهمس»)
 * المصادر: المصادر الرسمية للمشروع (الحروف من إعلان الدرس السابق + مفردات Blueprint درس الصفير).
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
    id:       'lesson-03',
    number:   3,
    title:    'الحروف الثالثة',
    subtitle: 'س  ش  ص',
    summaryTitle: 'انتهت المحاضرة الثالثة',
    welcomeHintAr: '🎓 المحاضرة الثالثة',
    welcomeHintZh: '第三课',
    level:    'A0',
    duration: 120,
    targetLetters: ['س', 'ش', 'ص'],
    description: 'المحاضرة الثالثة — الحروف: س ش ص — نظام التدريس التفاعلي',
    docTitle: 'المحاضرة الثالثة — س ش ص',
    completion: {
      title: 'المحاضرة الثالثة مكتملة',
      chars: [
        { id: 'seen',  char: 'س' },
        { id: 'sheen', char: 'ش' },
        { id: 'sad',   char: 'ص' },
      ],
      subtitle: {
        title: 'الطلاب الآن يعرفون:',
        lines: [
          '✓ أصوات الحروف الثلاثة',
          '✓ شكل كل حرف ونقاطه',
          '✓ كيفية كتابة كل حرف',
          '✓ الحروف داخل كلمات حقيقية',
        ],
      },
    },
    nextLesson: {
      chars: 'الحروف (د • ذ • ط • ظ)',
      hint:  'سنتعلم الحروف المتشابهة الشكل معاً',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الثلاثة ────────────────────────────────────────
  letters: [
    {
      id:        'seen',
      char:      'س',
      name:      'سين',
      phoneme:   '/س/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       's',
      chinesePinyin: '斯',
      fact:      'ثلاثة أسنان متّصلة بلا نقاط — صوت صفيري مهموس من طرف اللسان',
      color:     '#1F618D',
      heroColor: '#1A5276',
      audioFile: 'assets/audio/seen.mp3',
    },
    {
      id:        'sheen',
      char:      'ش',
      name:      'شين',
      phoneme:   '/ش/',
      dots:      3,
      dotPosition: 'فوق',
      ipa:       'ʃ',
      chinesePinyin: '什',
      fact:      'نفس أسنان السين لكن مع ثلاث نقاط فوق — الصوت أشد انضغاطاً',
      color:     '#239B56',
      audioFile: 'assets/audio/sheen.mp3',
    },
    {
      id:        'sad',
      char:      'ص',
      name:      'صاد',
      phoneme:   '/ص/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'sˤ',
      chinesePinyin: '萨',
      fact:      'حرف مقفل دائري بلا نقاط — نطقه مفخّم مُطبَق أقوى من السين',
      color:     '#AF601A',
      heroColor: '#935116',
      audioFile: 'assets/audio/sad.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'seen',
      videoFile:  'assets/videos/seen.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم سلسلة أسنان متّصلة تبدأ من اليمين وتنزل يساراً — ثلاث قمم متعرّجة' },
        { label: 'نقطة البداية', desc: 'ابدأ من الأعلى يميناً — الحركة إلى اليسار دائماً' },
        { label: 'مراجعة', desc: 'ثلاثة أسنان بلا نقاط = س' },
      ],
      color: '#1F618D',
    },
    {
      letterId:   'sheen',
      videoFile:  'assets/videos/sheen.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس جسم السين تماماً — ثلاث قمم متّصلة من اليمين إلى اليسار' },
        { label: 'نقطة البداية', desc: 'نفس نقطة البداية — الشكل واحد، الفرق في النقاط فقط' },
        { label: 'النقاط الثلاث', desc: 'ضع ثلاث نقاط فوق الأسنان — نقطة يمين ويسار وثالثة في المنتصف أعلى' },
        { label: 'مراجعة', desc: 'أسنان + ثلاث نقاط فوق = ش — قارنها مع السين' },
      ],
      color: '#239B56',
    },
    {
      letterId:   'sad',
      videoFile:  'assets/videos/saad.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم رأساً دائرياً مقفلاً يبدأ من اليمين — ثم ذيلاً ينزل إلى يسار السطر' },
        { label: 'نقطة البداية', desc: 'ابدأ من الأعلى يميناً — الرأس دائرة مقفلة ثم الذيل المائل' },
        { label: 'مراجعة', desc: 'رأس دائري مقفل + ذيل بلا نقاط = ص — ادفع النطق للسان لتسمع الإطباق' },
      ],
      color: '#AF601A',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  words: [
    {
      id:      'saff',
      word:    'صَفّ',
      meaning: 'صف (row)',
      targetLetterId: 'sad',
      targetPositions: [0],
      chars:   ['ص', 'ف'],
      audioText: 'صَفّ',
      audioFile: 'assets/audio/word_saff.mp3',
      color:   '#AF601A',
    },
    {
      id:      'shabab',
      word:    'شَبَاب',
      meaning: 'شباب (youth)',
      targetLetterId: 'sheen',
      targetPositions: [0],
      chars:   ['ش', 'ب', 'ا', 'ب'],
      audioText: 'شَبَاب',
      audioFile: 'assets/audio/word_shabab.mp3',
      color:   '#239B56',
    },
    {
      id:      'dars',
      word:    'دَرْس',
      meaning: 'درس (lesson)',
      targetLetterId: 'seen',
      targetPositions: [2],
      chars:   ['د', 'ر', 'س'],
      audioText: 'دَرْس',
      audioFile: 'assets/audio/word_dars.mp3',
      color:   '#1F618D',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    saff:   { emoji: '🪑', zh: '排' },
    shabab: { emoji: '👦', zh: '青年' },
    dars:   { emoji: '📖', zh: '课' },
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
        ar: 'سنستمع إلى أصوات الصفير والهمس — كل حرف صوتٌ صفيري مختلف',
        zh: '我们将听咝咝轻音——每个字母有不同的咝音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت السين كمثال توضيحي للطلاب.',
        exampleLetterId: 'seen',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: س=١  ش=٢  ص=٣ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：س=1  ش=2  ص=3——听到声音时举起手指',
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
        ar: 'س / ش — نفس الأسنان، النقاط تفرّق. شغّل الاثنين تباعاً وراقب',
        zh: 'س / ش——字形相同，点区分。依次播放并观察',
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
        { playId: 'seen',  answer: 1 },
        { playId: 'sheen', answer: 2 },
        { playId: 'sad',   answer: 3 },
        { playId: 'sheen', answer: 2 },
        { playId: 'seen',  answer: 1 },
        { playId: 'sad',   answer: 3 },
        { playId: 'sheen', answer: 2 },
        { playId: 'seen',  answer: 1 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['seen',  'seen' ], same: true  },
        { playIds: ['seen',  'sheen'], same: false },
        { playIds: ['sad',   'sad'  ], same: true  },
        { playIds: ['sheen', 'sad'  ], same: false },
        { playIds: ['sheen', 'sheen'], same: true  },
        { playIds: ['seen',  'sad'  ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'س / ش — نفس الأسنان، النقاط تفرّق. شغّل الاثنين تباعاً وراقب',
      triplets: [
        { ids: ['seen', 'sheen'], note: 'الأسنان واحدة — النقاط الثلاث فوق الشين هي الفرق' },
        { ids: ['seen', 'sad'],   note: 'سين وصاد صفيريتان — الصاد مفخّمة مطبقة' },
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
        { letterId: 'seen',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'س — سين' },
        { letterId: 'sheen', show: 'char', question: 'ما هذا الحرف؟',     answer: 'ش — شين' },
        { letterId: 'sad',   show: 'char', question: 'ما هذا الحرف؟',     answer: 'ص — صاد' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'sad',   question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'seen',  question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'sheen', question: 'كم نقطة وأين؟',   answer: 'ثلاث نقاط — فوق' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'sad',   question: 'ما الحرف الذي تسمعه؟',  answer: 'ص' },
        { letterId: 'seen',  question: 'ما الحرف الذي تسمعه؟',  answer: 'س' },
        { letterId: 'sheen', question: 'ما الحرف الذي تسمعه؟',  answer: 'ش' },
        { letterId: 'seen',  question: 'ما الحرف الذي تسمعه؟',  answer: 'س' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['س','ش','ص'],

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
          hint:    '🎓 المحاضرة الثالثة · 第三课',
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
      goal:     'ترسيخ الأصوات الثلاثة قبل رؤية الحروف المكتوبة',
      phonemeOrder: ['seen', 'sheen', 'sad'],
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
          instruction: 'س=١  |  ش=٢  |  ص=٣ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'seen': 1, 'sheen': 2, 'sad': 3,
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
      letterOrder: ['seen', 'sheen', 'sad'],
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
      letterOrder: ['seen', 'sheen', 'sad'],
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
      wordOrder: ['saff', 'shabab', 'dars'],
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
      goal:     'تقييم استيعاب الطلاب للحروف الثلاثة صوتاً وشكلاً ونقاطاً',
      roundOrder: ['Q1', 'Q2', 'Q3'],
    },
  ],
};

// تجميد البيانات — لا تعديل أثناء التشغيل
Object.freeze(LESSON);