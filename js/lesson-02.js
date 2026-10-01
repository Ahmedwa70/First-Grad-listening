/**
 * lesson-02.js
 * بيانات المحاضرة الثانية — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: ج ح خ ع
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: ج=١ داخل الجسم، ح/خ/ع بلا نقاط)
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
    id:       'lesson-02',
    number:   2,
    title:    'الدرس الثاني',
    subtitle: 'ج  ح  خ  ع',
    summaryTitle: 'اكتمل الدرس الثاني',
    welcomeHintAr: '🎓 الدرس الثاني',
    welcomeHintZh: '第二课',
    level:    'A0',
    duration: 120,
    targetLetters: ['ج', 'ح', 'خ', 'ع'],
    description: 'الدرس الثاني — الحروف: ج ح خ ع — حروف العربية',
    docTitle: 'الدرس الثاني — ج ح خ ع',
    completion: {
      title: 'الدرس الثاني مكتمل',
      chars: [
        { id: 'jeem',  char: 'ج' },
        { id: 'haa',   char: 'ح' },
        { id: 'khaa',  char: 'خ' },
        { id: 'ayn',   char: 'ع' },
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
      chars: 'الحروف (س • ش • ص)',
      hint:  'سنتعلم أصوات الصفير والهمس',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  letters: [
    {
      id:        'jeem',
      char:      'ج',
      name:      'جيم',
      phoneme:   '/ج/',
      dots:      1,
      dotPosition: 'داخل الجسم',
      ipa:       'dʒ',
      chinesePinyin: '吉',
      fact:      'نقطة واحدة داخل الجسم أسفل — حرف مقعر',
      color:     '#B03A2E',
      heroColor: '#922B21',
      audioFile: 'assets/audio/jeem.mp3',
    },
    {
      id:        'haa',
      char:      'ح',
      name:      'حاء',
      phoneme:   '/ح/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'ħ',
      chinesePinyin: '哈',
      fact:      'حرف أجوف بلا نقاط — مخرجه من وسط الحلق',
      color:     '#2E86C1',
      audioFile: 'assets/audio/haa.mp3',
    },
    {
      id:        'khaa',
      char:      'خ',
      name:      'خاء',
      phoneme:   '/خ/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'χ',
      chinesePinyin: '咳',
      fact:      'نفس شكل الحاء لكن بصوت قوي من أقصى الحلق',
      color:     '#6C3483',
      heroColor: '#512E5F',
      audioFile: 'assets/audio/khaa.mp3',
    },
    {
      id:        'ayn',
      char:      'ع',
      name:      'عين',
      phoneme:   '/ع/',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'ʕ',
      chinesePinyin: '哎',
      fact:      'قوس مستدير يلتف داخلياً — بلا نقاط إطلاقاً',
      color:     '#117864',
      audioFile: 'assets/audio/ayn.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'jeem',
      videoFile:  'assets/videos/jeem.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من أعلى يمين — انزل بزاوية مائلة حتى القاع' },
        { label: 'الانحناءة', desc: 'عند القاع استدر لليسار واصعد قليلاً — جسم مقعر' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة داخل الجسم — أسفل المنتصف' },
        { label: 'مراجعة', desc: 'جسم مقعر + نقطة داخلية = ج' },
      ],
      color: '#B03A2E',
    },
    {
      letterId:   'haa',
      videoFile:  'assets/videos/haa.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من أعلى يمين — انزل بخط مقوس نحو الوسط' },
        { label: 'الانحناءة', desc: 'استدر لأسفل ثم يساراً — وعاء أجوف بلا نقاط' },
        { label: 'مراجعة', desc: 'حاء = وعاء أجوف بلا نقطة — قارن شكلها مع الجيم' },
      ],
      color: '#2E86C1',
    },
    {
      letterId:   'khaa',
      videoFile:  'assets/videos/khaa.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس جسم الحاء تماماً — من أقصى الحلق صوت أقوى' },
        { label: 'الانحناءة', desc: 'الوعاء نفسه بلا نقطة — الفرق في قوة النطق لا الشكل' },
        { label: 'مراجعة', desc: 'خاء = وعاء أجوف بلا نقطة مع نطق قوي من الحلق' },
      ],
      color: '#6C3483',
    },
    {
      letterId:   'ayn',
      videoFile:  'assets/videos/ayn.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من اليمين — ارسم قوساً مستديراً كدائرة مفتوحة' },
        { label: 'الالتفاف', desc: 'استدر يساراً وأغلِ القوس بالتقائه داخلياً' },
        { label: 'المراجعة', desc: 'عين = قوس يلتف داخلياً بلا نقاط — أعمق انحناء في المجموعة' },
      ],
      color: '#117864',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  words: [
    {
      id:      'jawz',
      word:    'جَوْز',
      meaning: 'جوز (walnut)',
      targetLetterId: 'jeem',
      targetPositions: [0],
      chars:   ['ج', 'و', 'ز'],
      audioText: 'جوز',
      audioFile: 'assets/audio/word_jawz.mp3',
      color:   '#B03A2E',
    },
    {
      id:      'hamal',
      word:    'حَمَل',
      meaning: 'حمل (lamb)',
      targetLetterId: 'haa',
      targetPositions: [0],
      chars:   ['ح', 'م', 'ل'],
      audioText: 'حمل',
      audioFile: 'assets/audio/word_hamal.mp3',
      color:   '#2E86C1',
    },
    {
      id:      'khatt',
      word:    'خَطّ',
      meaning: 'خط (line)',
      targetLetterId: 'khaa',
      targetPositions: [0],
      chars:   ['خ', 'ط'],
      audioText: 'خط',
      audioFile: 'assets/audio/word_khatt.mp3',
      color:   '#6C3483',
    },
    {
      id:      'asal',
      word:    'عَسَل',
      meaning: 'عسل (honey)',
      targetLetterId: 'ayn',
      targetPositions: [0],
      chars:   ['ع', 'س', 'ل'],
      audioText: 'عسل',
      audioFile: 'assets/audio/word_asal.mp3',
      color:   '#117864',
    },
    {
      id:      'harf',
      word:    'حَرْف',
      meaning: 'حرف (letter)',
      targetLetterId: 'haa',
      targetPositions: [0],
      chars:   ['ح', 'ر', 'ف'],
      audioText: 'حرف',
      audioFile: 'assets/audio/word_harf.mp3',
      color:   '#2E86C1',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    jawz:  { emoji: '🥜', zh: '核桃' },
    hamal: { emoji: '🐑', zh: '羔羊' },
    khatt: { emoji: '📏', zh: '线条' },
    asal:  { emoji: '🍯', zh: '蜂蜜' },
    harf:  { emoji: '🔤', zh: '字母' },
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
        ar: 'سنستمع إلى أصوات الحروف — كل حرف له صوت مختلف من الحلق',
        zh: '我们将听字母的声音——每个字母有不同的声音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الجيم كمثال توضيحي للطلاب.',
        exampleLetterId: 'jeem',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: ج=١  ح=٢  خ=٣  ع=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：ج=1  ح=2  خ=3  ع=4——听到声音时举起手指',
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
        ar: 'ح / خ — نفس الشكل، صوت مختلف. شغّل الاثنين تباعاً وراقب',
        zh: 'ح / خ——字形相同，声音不同。依次播放并观察',
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
        { playId: 'jeem', answer: 1 },
        { playId: 'haa',  answer: 2 },
        { playId: 'khaa', answer: 3 },
        { playId: 'ayn',  answer: 4 },
        { playId: 'khaa', answer: 3 },
        { playId: 'jeem', answer: 1 },
        { playId: 'ayn',  answer: 4 },
        { playId: 'haa',  answer: 2 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['haa',  'haa' ], same: true  },
        { playIds: ['haa',  'khaa'], same: false },
        { playIds: ['jeem', 'jeem'], same: true  },
        { playIds: ['khaa', 'ayn' ], same: false },
        { playIds: ['ayn',  'ayn' ], same: true  },
        { playIds: ['jeem', 'haa' ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'ح / خ — نفس الشكل، صوت مختلف. شغّل الاثنين تباعاً وراقب',
      triplets: [
        { ids: ['haa', 'khaa'], note: 'الشكل واحد — قوة النطق هو الفرق' },
        { ids: ['jeem', 'ayn'],  note: 'جسمان مقعران — النقطة داخل الجيم تفرّقهما' },
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
        { letterId: 'jeem', show: 'char', question: 'ما هذا الحرف؟',     answer: 'ج — جيم' },
        { letterId: 'haa',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'ح — حاء' },
        { letterId: 'khaa', show: 'char', question: 'ما هذا الحرف؟',     answer: 'خ — خاء' },
        { letterId: 'ayn',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'ع — عين' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'jeem', question: 'كم نقطة وأين؟',   answer: 'نقطة واحدة — داخل الجسم' },
        { letterId: 'ayn',  question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'haa',  question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'khaa', question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'khaa', question: 'ما الحرف الذي تسمعه؟',  answer: 'خ' },
        { letterId: 'jeem', question: 'ما الحرف الذي تسمعه؟',  answer: 'ج' },
        { letterId: 'ayn',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ع' },
        { letterId: 'haa',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ح' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['ج','ح','خ','ع'],

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
          hint:    '🎓 الدرس الثاني · 第二课',
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
      phonemeOrder: ['jeem', 'haa', 'khaa', 'ayn'],
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
          instruction: 'ج=١  |  ح=٢  |  خ=٣  |  ع=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'jeem': 1, 'haa': 2, 'khaa': 3, 'ayn': 4,
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
      letterOrder: ['jeem', 'haa', 'khaa', 'ayn'],
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
      letterOrder: ['jeem', 'haa', 'khaa', 'ayn'],
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
      wordOrder: ['jawz', 'hamal', 'khatt', 'asal', 'harf'],
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