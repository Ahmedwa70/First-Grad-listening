/**
 * lesson-06.js
 * بيانات المحاضرة السادسة — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: ف و ق ك
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: ف=١ فوق، و=٠ بلا نقاط، ق=٢ فوق، ك=٠ بلا نقاط — «حروف البناء اليومي»)
 * المصادر: حروف «ف و ق ك» ومفرداتها (قَلَم كِتَاب فَوْق وَقْت) وجملها
 *   (هَذَا قَلَم. هَذَا كِتَاب.) من المحاضرة 3 الرسمية — «الحروف ف و ق ك — والضمة»:
 *   هذه الحروف تبني كلمات يراها الطالب يومياً (كتاب، قلم، فوق)، والضمة تُدخل هنا
 *   بعد إتقان الفتحة في الدرس السابق (Pedagogical Blueprint، المحاضرة 3).
 *   الأصوات: /ف/ /و/ /ق/ /ك/ وفق قرار التمثيل الصوتي (QD-16).
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
    id:       'lesson-06',
    number:   6,
    title:    'الحروف السادسة',
    subtitle: 'ف  و  ق  ك',
    summaryTitle: 'انتهت المحاضرة السادسة',
    welcomeHintAr: '🎓 المحاضرة السادسة',
    welcomeHintZh: '第六课',
    level:    'A0',
    duration: 120,
    targetLetters: ['ف', 'و', 'ق', 'ك'],
    description: 'المحاضرة السادسة — الحروف: ف و ق ك — نظام التدريس التفاعلي',
    docTitle: 'المحاضرة السادسة — ف و ق ك',
    completion: {
      title: 'المحاضرة السادسة مكتملة',
      chars: [
        { id: 'fa',   char: 'ف' },
        { id: 'waw',  char: 'و' },
        { id: 'qaf',  char: 'ق' },
        { id: 'kaf',  char: 'ك' },
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
      chars: 'الحروف (غ • ض • ر • ز)',
      hint:  'سنتعلم بقية حروف الهجاء ونقرأ كلمات أطول',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  // الألوان/النقاط/النطق التحريرية خاصة بهذه المحاضرة (لا تُنسخ من محاضرات سابقة).
  letters: [
    {
      id:        'fa',
      char:      'ف',
      name:      'فاء',
      phoneme:   '/ف/',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'f',
      chinesePinyin: '法',
      fact:      'جسم بيضاوي بذيلٍ نحيل — نقطة واحدة فوق — الصوت يخرج من بين الثنيتين والشفة',
      color:     '#E67E22',
      heroColor: '#BF6518',
      audioFile: 'assets/audio/fa.mp3',
    },
    {
      id:        'waw',
      char:      'و',
      name:      'واو',
      phoneme:   '/و/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'w',
      chinesePinyin: '乌 (wū)',
      fact:      'دائرة صغيرة مطبقة بلا نقاط — الشفتان تستديران كما في الواو الصينية',
      color:     '#16A085',
      heroColor: '#1ABC9C',
      audioFile: 'assets/audio/waw.mp3',
    },
    {
      id:        'qaf',
      char:      'ق',
      name:      'قاف',
      phoneme:   '/ق/',
      dots:      2,
      dotPosition: 'فوق',
      ipa:       'q',
      chinesePinyin: '(لا مقابل — من أقصى الحلق، أقرب إلى كاف عميقة)',
      fact:      'حلقة بذيلين ونقطتان فوق — صوتٌ عميق يخرج من طرف اللسان عند أقصى الحلق',
      color:     '#880E4F',
      heroColor: '#5C0A36',
      audioFile: 'assets/audio/qaf.mp3',
    },
    {
      id:        'kaf',
      char:      'ك',
      name:      'كاف',
      phoneme:   '/ك/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'k',
      chinesePinyin: '科',
      fact:      'عمود بذراع ممدودة نحو اليسار — بلا نقاط — اللسان يرتفع نحو مقدمة الحنك بهواءٍ قوي',
      color:     '#0288D1',
      heroColor: '#01579B',
      audioFile: 'assets/audio/kaf.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'fa',
      videoFile:  'assets/videos/fa.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من اليمين — ارسم بيضاوية مفرّغة ثم أطل ذيلاً نحيفاً نحو الأسفل' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق البيضاوية' },
        { label: 'مراجعة', desc: 'بيضاوية + ذيل + نقطة فوق = ف' },
      ],
      color: '#E67E22',
    },
    {
      letterId:   'waw',
      videoFile:  'assets/videos/waw.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم دائرة صغيرة مطبقة على سطر الكلمة' },
        { label: 'بلا نقاط', desc: 'لا نقطة إطلاقاً — الشكل الأصغر في هذه المحاضرة' },
        { label: 'مراجعة', desc: 'دائرة مطبقة بلا نقاط = و — تستدير به الشفتان' },
      ],
      color: '#16A085',
    },
    {
      letterId:   'qaf',
      videoFile:  'assets/videos/qaf.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم حلقة مقفلة على السطر ثم أطل منها ذيلين نحو الأسفل' },
        { label: 'النقطتان', desc: 'ضع نقطتين فوق الحلقة بجانب بعضهما' },
        { label: 'مراجعة', desc: 'حلقة + ذيلان + نقطتان فوق = ق' },
      ],
      color: '#880E4F',
    },
    {
      letterId:   'kaf',
      videoFile:  'assets/videos/kaf.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ارسم عموداً يبدأ من اليمين ثم أطل ذراعاً ممدودة نحو اليسار من ذرّته' },
        { label: 'بلا نقاط', desc: 'لا نقطة إطلاقاً — قارن الكهف بالقاف' },
        { label: 'مراجعة', desc: 'عمود + ذراع ممدودة بلا نقاط = ك' },
      ],
      color: '#0288D1',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  // جميع الكلمات من المفردات الرسمية للمحاضرة 3 (Pedagogical Blueprint — ف و ق ك).
  words: [
    {
      id:      'qalam',
      word:    'قَلَم',
      meaning: 'قلم (pen)',
      targetLetterId: 'qaf',
      targetPositions: [0],
      chars:   ['ق', 'ل', 'م'],
      audioText: 'قَلَم',
      audioFile: 'assets/audio/word_qalam.mp3',
      color:   '#880E4F',
    },
    {
      id:      'kitab',
      word:    'كِتَاب',
      meaning: 'كتاب (book)',
      targetLetterId: 'kaf',
      targetPositions: [0],
      chars:   ['ك', 'ت', 'ا', 'ب'],
      audioText: 'كِتَاب',
      audioFile: 'assets/audio/word_kitab.mp3',
      color:   '#0288D1',
    },
    {
      id:      'fawq',
      word:    'فَوْق',
      meaning: 'فوق (above)',
      targetLetterId: 'fa',
      targetPositions: [0],
      chars:   ['ف', 'و', 'ق'],
      audioText: 'فَوْق',
      audioFile: 'assets/audio/word_fawq.mp3',
      color:   '#E67E22',
    },
    {
      id:      'waqt',
      word:    'وَقْت',
      meaning: 'وقت (time)',
      targetLetterId: 'waw',
      targetPositions: [0],
      chars:   ['و', 'ق', 'ت'],
      audioText: 'وَقْت',
      audioFile: 'assets/audio/word_waqt.mp3',
      color:   '#16A085',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    qalam: { emoji: '🖊️', zh: '笔' },
    kitab: { emoji: '📖', zh: '书' },
    fawq:  { emoji: '⬆️', zh: '上面' },
    waqt:  { emoji: '⏰', zh: '时间' },
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
        ar: 'سنستمع إلى أصوات جديدة — ف و حروف الشفة، و ق ك من عمق اللسان. كل حرف صوتٌ مميّز مختلف',
        zh: '我们将听新声音——ف和و是唇音，ق和ك来自舌根。每个字母有独特的声音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الفاء كمثال توضيحي للطلاب.',
        exampleLetterId: 'fa',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: ف=١  و=٢  ق=٣  ك=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：ف=1  و=2  ق=3  ك=4——听到声音时举起手指',
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
        ar: 'ف / ق — ق / ك — أشكال وأصوات متقاربة في المخرج. شغّل الأزواج تباعاً وراقب',
        zh: 'ف/ق——ق/ك——唇齿与舌根相近的形与音。依次播放并观察',
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
        { playId: 'fa',   answer: 1 },
        { playId: 'waw',  answer: 2 },
        { playId: 'qaf',  answer: 3 },
        { playId: 'kaf',  answer: 4 },
        { playId: 'fa',   answer: 1 },
        { playId: 'kaf',  answer: 4 },
        { playId: 'waw',  answer: 2 },
        { playId: 'qaf',  answer: 3 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['fa',   'fa'  ], same: true  },
        { playIds: ['fa',   'waw' ], same: false },
        { playIds: ['waw',  'waw' ], same: true  },
        { playIds: ['waw',  'qaf' ], same: false },
        { playIds: ['qaf',  'qaf' ], same: true  },
        { playIds: ['qaf',  'kaf' ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'ف / ق — ق / ك — أشكال وأصوات متقاربة في المخرج. شغّل الأزواج تباعاً وراقب',
      triplets: [
        { ids: ['qaf', 'kaf'], note: 'صوتان يخرجان من مؤخرة الفم — القاف أعمق والكاف أمامه' },
        { ids: ['fa',  'qaf'], note: 'شكل متقارب: الحلقة والذيل — النقطتان تفرّقان بينهما' },
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
        { letterId: 'fa',   show: 'char', question: 'ما هذا الحرف؟', answer: 'ف — فاء' },
        { letterId: 'waw',  show: 'char', question: 'ما هذا الحرف؟', answer: 'و — واو' },
        { letterId: 'qaf',  show: 'char', question: 'ما هذا الحرف؟', answer: 'ق — قاف' },
        { letterId: 'kaf',  show: 'char', question: 'ما هذا الحرف؟', answer: 'ك — كاف' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'fa',   question: 'كم نقطة وأين؟', answer: 'نقطة واحدة — فوق' },
        { letterId: 'waw',  question: 'كم نقطة وأين؟', answer: 'لا نقاط' },
        { letterId: 'qaf',  question: 'كم نقطة وأين؟', answer: 'نقطتان — فوق' },
        { letterId: 'kaf',  question: 'كم نقطة وأين؟', answer: 'لا نقاط' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'kaf',  question: 'ما الحرف الذي تسمعه؟', answer: 'ك' },
        { letterId: 'fa',   question: 'ما الحرف الذي تسمعه؟', answer: 'ف' },
        { letterId: 'waw',  question: 'ما الحرف الذي تسمعه؟', answer: 'و' },
        { letterId: 'qaf',  question: 'ما الحرف الذي تسمعه؟', answer: 'ق' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['ف','و','ق','ك'],

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
          hint:    '🎓 المحاضرة السادسة · 第六课',
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
      phonemeOrder: ['fa', 'waw', 'qaf', 'kaf'],
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
          instruction: 'ف=١  |  و=٢  |  ق=٣  |  ك=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'fa': 1, 'waw': 2, 'qaf': 3, 'kaf': 4,
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
      letterOrder: ['fa', 'waw', 'qaf', 'kaf'],
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
      letterOrder: ['fa', 'waw', 'qaf', 'kaf'],
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
      wordOrder: ['qalam', 'kitab', 'fawq', 'waqt'],
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