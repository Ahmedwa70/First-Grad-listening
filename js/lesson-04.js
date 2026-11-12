/**
 * lesson-04.js
 * بيانات المحاضرة الرابعة — منفصلة تماماً عن طريقة العرض
 * الحروف المستهدفة: د ذ ط ظ
 * المستوى: A0 | المدة: 120 دقيقة (P1–P7 كاملة)
 * (نقاط الحروف: د=٠ بلا نقاط، ذ=١ فوق، ط=٠ بلا نقاط، ظ=١ فوق — «الحروف المتشابهة الشكل»)
 * المصادر: الكلمات الخمس للحرف ظ (ظَرْف ظِلّ ظَهْر ظَبْي نَظِيف) معتمدةً من مؤلف المنهج؛
 *   بقية الكلمات من المفردات الرسمية للمشروع (Blueprint د/ذ/ط) — الحروف من إعلان الدرس السابق.
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
    id:       'lesson-04',
    number:   4,
    title:    'الدرس الرابع',
    subtitle: 'د  ذ  ط  ظ',
    summaryTitle: 'اكتمل الدرس الرابع',
    welcomeHintAr: '🎓 الدرس الرابع',
    welcomeHintZh: '第四课',
    level:    'A0',
    duration: 120,
    targetLetters: ['د', 'ذ', 'ط', 'ظ'],
    description: 'الدرس الرابع — الحروف: د ذ ط ظ — حروف العربية',
    docTitle: 'الدرس الرابع — د ذ ط ظ',
    completion: {
      title: 'الدرس الرابع مكتمل',
      chars: [
        { id: 'dal',  char: 'د' },
        { id: 'dhal', char: 'ذ' },
        { id: 'taa',  char: 'ط' },
        { id: 'zah',  char: 'ظ' },
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
      chars: 'الحروف (م • ي • ا • ه)',
      hint:  'سنتعلم الحروف المتصلة والممدودة',
    },
  },

  // ─── إعدادات عامة ────────────────────────────────────────
  // تأجيل بطاقات رسم الحروف في P4 حتى اكتمال إعداد مسارات الحروف كاملةً.
  p4WritingPracticeDeferred: false,

  // ─── الحروف الأربعة ────────────────────────────────────────
  // الألوان/النطق التحريرية خاصة بهذه المحاضرة (لا تُنسخ من محاضرات سابقة).
  letters: [
    {
      id:        'dal',
      char:      'د',
      name:      'دال',
      phoneme:   '/د/',
      audioText: 'دَ',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'd',
      chinesePinyin: '达',
      fact:      'قوس نحيل بلا نقاط — صوت شفاف من مقدمة اللسان',
      color:     '#3F51B5',
      heroColor: '#303F9F',
      audioFile: 'assets/audio/dal.mp3',
    },
    {
      id:        'dhal',
      char:      'ذ',
      name:      'ذال',
      phoneme:   '/ذ/',
      audioText: 'ذَ',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'ð',
      chinesePinyin: '(لا مقابل — اللسان بين الأسنان)',
      fact:      'نفس قوس الدال لكن مع نقطة واحدة فوق — الصوت من بين الأسنان',
      color:     '#E91E63',
      heroColor: '#C2185B',
      audioFile: 'assets/audio/dhal.mp3',
    },
    {
      id:        'taa',
      char:      'ط',
      name:      'طاء',
      phoneme:   '/ط/',
      audioText: 'طَ',
      dots:      0,
      dotPosition: 'لا نقاط',
      ipa:       'tˤ',
      chinesePinyin: '塔',
      fact:      'عمود طويل بحلقة في قمته بلا نقاط — نطقه من طَبَق اللسان',
      color:     '#00BCD4',
      heroColor: '#0097A7',
      audioFile: 'assets/audio/taa.mp3',
    },
    {
      id:        'zah',
      char:      'ظ',
      name:      'ظاء',
      phoneme:   '/ظ/',
      audioText: 'ظَ',
      dots:      1,
      dotPosition: 'فوق',
      ipa:       'ðˤ',
      chinesePinyin: '(لا مقابل — اللسان بين الأسنان مفخّم)',
      fact:      'نفس جسم الطاء لكن مع نقطة واحدة فوق — صوت مفخّم من بين الأسنان',
      color:     '#FF9800',
      heroColor: '#F57C00',
      audioFile: 'assets/audio/zah.mp3',
    },
  ],

  // ─── أدلة الكتابة (P4) ─────────────────────────────────────
  strokeGuides: [
    {
      letterId:   'dal',
      videoFile:  'assets/videos/daal.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'ابدأ من اليمين — ارسم قوساً صغيراً ينحني نحو اليسار' },
        { label: 'نقطة البداية', desc: 'نقطة البداية في الطرف الأيمن — الحركة إلى اليسار دائماً' },
        { label: 'مراجعة', desc: 'قوس صغير بلا نقاط = د' },
      ],
      color: '#3F51B5',
    },
    {
      letterId:   'dhal',
      videoFile:  'assets/videos/dhaal.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس قوس الدال تماماً — الشكل ذاته من اليمين إلى اليسار' },
        { label: 'نقطة البداية', desc: 'نفس نقطة البداية — الفرق في النقاط فقط' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق القوس — في المنتصف' },
        { label: 'مراجعة', desc: 'قوس + نقطة فوق = ذ — قارنها مع الدال' },
      ],
      color: '#E91E63',
    },
    {
      letterId:   'taa',
      videoFile:  'assets/videos/taa.mp4',
      steps: [
        { label: 'الحلقة', desc: 'غلِّف القمة بحلقة دائرية صغيرة مقفلة' },
        { label: 'رسم العمود', desc: 'ارسم عموداً رأسياً من الأعلى إلى الأسفل' },
        { label: 'مراجعة', desc: 'عمود + حلقة بلا نقاط = ط' },
      ],
      color: '#00BCD4',
    },
    {
      letterId:   'zah',
      videoFile:  'assets/videos/zaa.mp4',
      steps: [
        { label: 'رسم الجسم', desc: 'نفس جسم الطاء تماماً — ابدأ بالحلقة في القمة ثم ارسم العمود الطويل' },
        { label: 'نقطة البداية', desc: 'نقطة البداية في القمة — الفرق في النقاط فقط' },
        { label: 'النقطة', desc: 'ضع نقطة واحدة فوق الحلقة' },
        { label: 'مراجعة', desc: 'حلقة + عمود + نقطة = ظ — قارنها مع الطاء' },
      ],
      color: '#FF9800',
    },
  ],

  // ─── كلمات P5 ───────────────────────────────────────────────
  // كلمات ظ الخمس معتمدة حرفياً من مؤلف المنهج (لا استبدال ولا تعديل).
  words: [
    {
      id:      'daftar',
      word:    'دَفْتَرٌ',
      meaning: 'دفتر (notebook)',
      targetLetterId: 'dal',
      targetPositions: [0],
      chars:   ['د', 'ف', 'ت', 'ر'],
      audioText: 'دَفْتَرٌ',
      audioFile: 'assets/audio/word_daftar.mp3',
      color:   '#3F51B5',
    },
    {
      id:      'qadam',
      word:    'قَدَمٌ',
      meaning: 'قدم',
      targetLetterId: 'dal',
      targetPositions: [1],
      chars:   ['ق', 'د', 'م'],
      audioText: 'قَدَمٌ',
      audioFile: 'assets/audio/word_qadam.mp3',
      color:   '#3F51B5',
    },
    {
      id:      'dhahab',
      word:    'ذَهَبٌ',
      meaning: 'ذهب (gold)',
      targetLetterId: 'dhal',
      targetPositions: [0],
      chars:   ['ذ', 'ه', 'ب'],
      audioText: 'ذَهَبٌ',
      audioFile: 'assets/audio/word_dhahab.mp3',
      color:   '#E91E63',
    },
    {
      id:      'ladheedh',
      word:    'لَذِيذٌ',
      meaning: 'لذيذ',
      targetLetterId: 'dhal',
      targetPositions: [1, 3],
      chars:   ['ل', 'ذ', 'ي', 'ذ'],
      audioText: 'لَذِيذٌ',
      audioFile: 'assets/audio/word_ladheedh.mp3',
      color:   '#E91E63',
    },
    {
      id:      'tabib',
      word:    'طَبِيبٌ',
      meaning: 'طبيب (doctor)',
      targetLetterId: 'taa',
      targetPositions: [0],
      chars:   ['ط', 'ب', 'ي', 'ب'],
      audioText: 'طَبِيبٌ',
      audioFile: 'assets/audio/word_tabib.mp3',
      color:   '#00BCD4',
    },
    {
      id:      'qitar',
      word:    'قِطَارٌ',
      meaning: 'قطار',
      targetLetterId: 'taa',
      targetPositions: [1],
      chars:   ['ق', 'ط', 'ا', 'ر'],
      audioText: 'قِطَارٌ',
      audioFile: 'assets/audio/word_qitar.mp3',
      color:   '#00BCD4',
    },
    {
      id:      'zaby',
      word:    'ظَبْيٌ',
      meaning: 'ظبي (gazelle)',
      targetLetterId: 'zah',
      targetPositions: [0],
      chars:   ['ظ', 'ب', 'ي'],
      audioText: 'ظَبْيٌ',
      audioFile: 'assets/audio/word_zaby.mp3',
      color:   '#FF9800',
    },
    {
      id:      'zarf',
      word:    'ظَرْفٌ',
      meaning: 'ظرف (envelope)',
      targetLetterId: 'zah',
      targetPositions: [0],
      chars:   ['ظ', 'ر', 'ف'],
      audioText: 'ظَرْفٌ',
      audioFile: 'assets/audio/word_zarf.mp3',
      color:   '#FF9800',
    },
  ],

  // ─── P5 — البيانات الإضافية للكلمات ─────────────────────────
  p5WordMeta: {
    daftar: { emoji: '📓', zh: '笔记本' },
    qadam:  { emoji: '🦶', zh: '脚' },
    dhahab: { emoji: '🥇', zh: '黄金' },
    ladheedh: { emoji: '😋', zh: '美味的' },
    tabib:  { emoji: '👨‍⚕️', zh: '医生' },
    qitar:  { emoji: '🚆', zh: '火车' },
    zaby:   { emoji: '🦌', zh: '羚羊' },
    zarf:   { emoji: '✉️', zh: '信封' },
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
        ar: 'سنستمع إلى الأصوات المفخّمة لأول مرة — كل حرف صوتٌ مميّز مختلف',
        zh: '我们将首次听重音——每个字母有独特的声音',
        teacherHint: 'اقرأ التعليمات ثم شغّل صوت الدال كمثال توضيحي للطلاب.',
        exampleLetterId: 'dal',
      },
      {
        id: 'demo-fingers',
        ar: 'كل حرف له رقم: د=١  ذ=٢  ط=٣  ظ=٤ — ارفعوا الأصابع عند سماع الصوت',
        zh: '每个字母有一个编号：د=1  ذ=2  ط=3  ظ=4——听到声音时举起手指',
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
        ar: 'د / ذ — ط / ظ — نفس الشكل، النقاط تفرّق. شغّل الأزواج تباعاً وراقب',
        zh: 'د / ذ——ط / ظ——字形相同，点区分。依次播放并观察',
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
        { playId: 'dal',  answer: 1 },
        { playId: 'dhal', answer: 2 },
        { playId: 'taa',  answer: 3 },
        { playId: 'zah',  answer: 4 },
        { playId: 'dhal', answer: 2 },
        { playId: 'dal',  answer: 1 },
        { playId: 'zah',  answer: 4 },
        { playId: 'taa',  answer: 3 },
      ],
    },
    {
      id:   'D2',
      type: 'sameordiff',
      label: 'نفس أم مختلف؟',
      instruction: 'شغّل الصوتين — الطلاب يرفعون إبهامين إذا متماثلان أو يعقدون أصابعهم إذا مختلفان',
      pairs: [
        { playIds: ['dal',  'dal' ], same: true  },
        { playIds: ['dal',  'dhal'], same: false },
        { playIds: ['taa',  'taa' ], same: true  },
        { playIds: ['taa',  'zah' ], same: false },
        { playIds: ['zah',  'zah' ], same: true  },
        { playIds: ['dhal', 'zah' ], same: false },
      ],
    },
    {
      id:   'D3',
      type: 'close',
      label: 'الأصوات المتقاربة',
      instruction: 'د / ذ — ط / ظ — نفس الشكل، النقاط تفرّق. شغّل الأزواج تباعاً وراقب',
      triplets: [
        { ids: ['dal', 'dhal'], note: 'القوس واحد — النقطة فوق الذال هي الفرق' },
        { ids: ['taa', 'zah'],  note: 'العمود والحلقة واحد — النقطة فوق الظاء هي الفرق' },
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
        { letterId: 'dal',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'د — دال' },
        { letterId: 'dhal', show: 'char', question: 'ما هذا الحرف؟',     answer: 'ذ — ذال' },
        { letterId: 'taa',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'ط — طاء' },
        { letterId: 'zah',  show: 'char', question: 'ما هذا الحرف؟',     answer: 'ظ — ظاء' },
      ],
    },
    {
      id:    'Q2',
      type:  'count-dots',
      label: 'كم نقطة؟',
      instruction: 'اعرض الحرف — اطلب عدّ النقاط ووصف موضعها',
      items: [
        { letterId: 'dal',  question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'dhal', question: 'كم نقطة وأين؟',   answer: 'نقطة واحدة — فوق' },
        { letterId: 'taa',  question: 'كم نقطة وأين؟',   answer: 'لا نقاط' },
        { letterId: 'zah',  question: 'كم نقطة وأين؟',   answer: 'نقطة واحدة — فوق' },
      ],
    },
    {
      id:    'Q3',
      type:  'sound',
      label: 'ما صوت الحرف؟',
      instruction: 'شغّل الصوت — الطلاب يكتبون الحرف المقابل على أوراقهم',
      items: [
        { letterId: 'dhal', question: 'ما الحرف الذي تسمعه؟',  answer: 'ذ' },
        { letterId: 'zah',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ظ' },
        { letterId: 'dal',  question: 'ما الحرف الذي تسمعه؟',  answer: 'د' },
        { letterId: 'taa',  question: 'ما الحرف الذي تسمعه؟',  answer: 'ط' },
      ],
    },
  ],

  // ─── الأبجدية العربية كاملة (لعرض حقل P1) ─────────────────
  arabicAlphabet: [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
    'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
    'ق','ك','ل','م','ن','ه','و','ي'
  ],
  targetLetterIds: ['د','ذ','ط','ظ'],

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
          hint:    '🎓 الدرس الرابع · 第四课',
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
      phonemeOrder: ['dal', 'dhal', 'taa', 'zah'],
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
          instruction: 'د=١  |  ذ=٢  |  ط=٣  |  ظ=٤ — شغّل صوتاً وانتظر استجابة الأصابع',
        },
      ],
      fingerCountMap: {
        'dal': 1, 'dhal': 2, 'taa': 3, 'zah': 4,
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
      letterOrder: ['dal', 'dhal', 'taa', 'zah'],
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
      letterOrder: ['dal', 'dhal', 'taa', 'zah'],
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
      wordOrder: ['daftar', 'qadam', 'dhahab', 'ladheedh', 'tabib', 'qitar', 'zaby', 'zarf'],
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