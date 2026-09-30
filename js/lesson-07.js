/**
 * lesson-07.js
 * بيانات المحاضرة السابعة — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: غ ض ر ز
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: غ=١ فوق، ض=١ فوق، ر=٠ بلا نقاط، ز=١ فوق)
 * المفردات (كُتبت في البيانات بدون حركات كما اعتمد المؤلف):
 *   غرفة (رسمية — المحاضرة 4: عَيْن — غُرْفَة — حَال — خَيْر)
 *   ضحك (رسمية — المحاضرة 7: دَرْس — صَفّ — شَبَاب — ضَحِك — أَدْرُس)
 *   رقم (رسمية — المحاضرة 6: جملة كَمْ رَقَمُ هَاتِفِكَ؟)
 *   زهرة (مفردة معتمدة من المؤلف — لم ترد في الدروس الرسمية، كُتبت هكذا: زهرة)
 * الأصوات: /غ/ /ض/ /ر/ /ز/ وفق قرار التمثيل الصوتي (QD-16).
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
    id:       'lesson-07',
    number:   7,
    title:    'الحروف السابعة',
    subtitle: 'غ  ض  ر  ز',
    summaryTitle: 'انتهت المحاضرة السابعة',
    welcomeHintAr: '🎓 المحاضرة السابعة',
    welcomeHintZh: '第七课',
    level:    'A0',
    duration: 120,
    targetLetters: ['غ', 'ض', 'ر', 'ز'],
    description: 'المحاضرة السابعة — الحروف: غ ض ر ز — نظام التدريس التفاعلي',
    docTitle: 'المحاضرة السابعة — غ ض ر ز',
    completion: {
      title: 'المحاضرة السابعة مكتملة',
      chars: [
        { id: 'ghayn', char: 'غ' },
        { id: 'dad',   char: 'ض' },
        { id: 'raa',   char: 'ر' },
        { id: 'zay',   char: 'ز' },
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
      chars: 'الحروف (ل)',
      hint:  'سنتعلم لام التعريف ونقرأ كلمات أطول',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  // الألوان/النقاط/النطق التحريرية خاصة بهذه المحاضرة (لا تُنسخ من محاضرات سابقة).
  letters: [
    {
      id:        'ghayn',
      char:      'غ',
      name:      'غين',
      phoneme:   '/غ/',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'ɣ',
      chinesePinyin: '(لا مقابل — صوت حلقي مجهور من أسفل الحلق)',
      fact:      'حلقة كالعين مع نقطة واحدة فوق — صوتٌ حلقي مجهور يخرج من أسفل الحلق',
      color:     '#5D4037',
      heroColor: '#3E2723',
      audioFile: 'assets/audio/ghayn.mp3',
    },
    {
      id:        'dad',
      char:      'ض',
      name:      'ضاد',
      phoneme:   '/ض/',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'dˤ',
      chinesePinyin: '(لا مقابل — مفخّم كدال ثقيلة)',
      fact:      'جسم بيضاوي بذيل ونقطة واحدة فوق — صوتٌ مفخّم يخرج من جانب اللسان',
      color:     '#1976D2',
      heroColor: '#0D47A1',
      audioFile: 'assets/audio/dad.mp3',
    },
    {
      id:        'raa',
      char:      'ر',
      name:      'راء',
      phoneme:   '/ر/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'r',
      chinesePinyin: '日 (rì)',
      fact:      'قوس قصير بلا نقاط — صوتٌ يخرج من طرف اللسان مع اهتزاز خفيف',
      color:     '#388E3C',
      heroColor: '#1B5E20',
      audioFile: 'assets/audio/raa.mp3',
    },
    {
      id:        'zay',
      char:      'ز',
      name:      'زاي',
      phoneme:   '/ز/',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'z',
      chinesePinyin: '(لا مقابل — مثل z في الإنجليزية)',
      fact:      'قوس طويل بذيل ونقطة واحدة فوق — صوتٌ يخرج بين اللسان والأسنان العليا',
      color:     '#F39C12',
      heroColor: '#B9770E',
      audioFile: 'assets/audio/zay.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'ghayn',
      videoFile:  'assets/videos/ghayn.mp4',
      steps: [
        { label: 'رسم الحلقة', desc: 'ابدأ من اليمين — ارسم حلقة كالعين مقفلة على السطر' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق الحلقة' },
        { label: 'مراجعة', desc: 'حلقة كالعين + نقطة فوق = غ' },
      ],
      color: '#5D4037',
    },
    {
      letterId:   'dad',
      videoFile:  'assets/videos/dad.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم بيضاوية مفرّغة ثم أطل ذيلاً نحو الأسفل' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق البيضاوية' },
        { label: 'مراجعة', desc: 'بيضاوية + ذيل + نقطة فوق = ض' },
      ],
      color: '#1976D2',
    },
    {
      letterId:   'raa',
      videoFile:  'assets/videos/raa.mp4',
      steps: [
        { label: 'رسم القوس', desc: 'ارسم قوساً قصيراً يبدأ من اليمين نحو الأسفل' },
        { label: 'بلا نقاط', desc: 'لا نقطة إطلاقاً — قارن الراء بالزاي' },
        { label: 'مراجعة', desc: 'قوس قصير بلا نقاط = ر' },
      ],
      color: '#388E3C',
    },
    {
      letterId:   'zay',
      videoFile:  'assets/videos/zay.mp4',
      steps: [
        { label: 'رسم القوس والذيل', desc: 'ارسم قوساً طويلاً ثم أطل ذيلاً نحو الأسفل' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق القوس' },
        { label: 'مراجعة', desc: 'قوس طويل + ذيل + نقطة فوق = ز' },
      ],
      color: '#F39C12',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  // غرفة (رسمية، المحاضرة 4) — ضحك (رسمية، المحاضرة 7) —
  // رقم (رسمية، المحاضرة 6) — زهرة (مفردة معتمدة من المؤلف).
  words: [
    {
      id:      'ghurfa',
      word:    'غرفة',
      meaning: 'غرفة (room)',
      targetLetterId: 'ghayn',
      targetPositions: [0],
      chars:   ['غ', 'ر', 'ف', 'ة'],
      audioText: 'غرفة',
      audioFile: 'assets/audio/word_ghurfa.mp3',
      color:   '#5D4037',
    },
    {
      id:      'dahk',
      word:    'ضحك',
      meaning: 'ضحك (laughter)',
      targetLetterId: 'dad',
      targetPositions: [0],
      chars:   ['ض', 'ح', 'ك'],
      audioText: 'ضحك',
      audioFile: 'assets/audio/word_dahk.mp3',
      color:   '#1976D2',
    },
    {
      id:      'raqm',
      word:    'رقم',
      meaning: 'رقم (number)',
      targetLetterId: 'raa',
      targetPositions: [0],
      chars:   ['ر', 'ق', 'م'],
      audioText: 'رقم',
      audioFile: 'assets/audio/word_raqm.mp3',
      color:   '#388E3C',
    },
    {
      id:      'zahra',
      word:    'زهرة',
      meaning: 'زهرة (flower)',
      targetLetterId: 'zay',
      targetPositions: [0],
      chars:   ['ز', 'ه', 'ر', 'ة'],
      audioText: 'زهرة',
      audioFile: 'assets/audio/word_zahra.mp3',
      color:   '#F39C12',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    ghurfa: { emoji: '🚪', zh: '房间' },
    dahk:   { emoji: '😂', zh: '笑' },
    raqm:   { emoji: '🔢', zh: '数字' },
    zahra:  { emoji: '🌸', zh: '花' },
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
        ar: 'سنستمع إلى أصوات جديدة — الغين والضاد من عمق الفم، والراء والزاي من طرف اللسان. كل حرف صوتٌ مميّز مختلف',
        zh: '我们将听新声音——غ和ض来自口腔深处，ر和ز来自舌尖。每个字母有独特的声音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الغين كمثال توضيحي للطلاب.',
        exampleLetterId: 'ghayn',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: غ=١  ض=٢  ر=٣  ز=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：غ=1  ض=2  ر=3  ز=4——听到声音时举起手指',
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
        ar: 'ر / ز — غ / ض — أشكال وأصوات متقاربة في المخرج. شغّل الأزواج تباعاً وراقب',
        zh: 'ر/ز——غ/ض——发音相近的形与音。依次播放并观察',
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
        { playId: 'ghayn', answer: 1 },
        { playId: 'dad',   answer: 2 },
        { playId: 'raa',   answer: 3 },
        { playId: 'zay',   answer: 4 },
        { playId: 'ghayn', answer: 1 },
        { playId: 'zay',   answer: 4 },
        { playId: 'dad',   answer: 2 },
        { playId: 'raa',   answer: 3 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['ghayn', 'ghayn'], same: true  },
        { playIds: ['ghayn', 'dad'  ], same: false },
        { playIds: ['dad',   'dad'  ], same: true  },
        { playIds: ['dad',   'zay'  ], same: false },
        { playIds: ['raa',   'raa'  ], same: true  },
        { playIds: ['raa',   'zay'  ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'ر / ز — غ / ض — أشكال وأصوات متقاربة في المخرج. شغّل الأزواج تباعاً وراقب',
      triplets: [
        { ids: ['raa', 'zay'], note: 'قوسان شبه متطابقين — الراء بلا نقاط والزاي بنقطة واحدة فوق' },
        { ids: ['ghayn', 'dad'], note: 'صوتان غليظان من عمق الفم — الغين من الحلق والضاد من جانب اللسان' },
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
        { letterId: 'ghayn', show: 'char', question: 'ما هذا الحرف؟', answer: 'غ — غين' },
        { letterId: 'dad',   show: 'char', question: 'ما هذا الحرف؟', answer: 'ض — ضاد' },
        { letterId: 'raa',   show: 'char', question: 'ما هذا الحرف؟', answer: 'ر — راء' },
        { letterId: 'zay',   show: 'char', question: 'ما هذا الحرف؟', answer: 'ز — زاي' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'ghayn', question: 'كم نقطة وأين؟', answer: 'نقطة واحدة — فوق' },
        { letterId: 'dad',   question: 'كم نقطة وأين؟', answer: 'نقطة واحدة — فوق' },
        { letterId: 'raa',   question: 'كم نقطة وأين؟', answer: 'لا نقاط' },
        { letterId: 'zay',   question: 'كم نقطة وأين؟', answer: 'نقطة واحدة — فوق' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'zay',   question: 'ما الحرف الذي تسمعه؟', answer: 'ز' },
        { letterId: 'ghayn', question: 'ما الحرف الذي تسمعه؟', answer: 'غ' },
        { letterId: 'dad',   question: 'ما الحرف الذي تسمعه؟', answer: 'ض' },
        { letterId: 'raa',   question: 'ما الحرف الذي تسمعه؟', answer: 'ر' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['غ','ض','ر','ز'],

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
          hint:    '🎓 المحاضرة السابعة · 第七课',
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
      phonemeOrder: ['ghayn', 'dad', 'raa', 'zay'],
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
          instruction: 'غ=١  |  ض=٢  |  ر=٣  |  ز=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'ghayn': 1, 'dad': 2, 'raa': 3, 'zay': 4,
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
      letterOrder: ['ghayn', 'dad', 'raa', 'zay'],
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
      letterOrder: ['ghayn', 'dad', 'raa', 'zay'],
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
      wordOrder: ['ghurfa', 'dahk', 'raqm', 'zahra'],
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