
import { Language, ServiceItem, Gender, DemoStep, InteractionMode } from './types';

export const DEFAULT_INTERACTION_MODE: InteractionMode = 'CLICK'; // Change to 'DWELL' for eye-tracking default

export const DWELL_TIME_MS = 800; // Time in ms to trigger a click

export const DEFAULT_ELEVEN_LABS_VOICES: Record<Language, Record<Gender, string>> = {
  [Language.ENGLISH]: {
    male: 'xKhbyU7E3bC6T89Kn26c',
    female: '0WKkG7JmcKK7MkwhnMIe'
  },
  [Language.JAPANESE]: {
    male: '3JDquces8E8bkmvbh6Bc',
    female: 'GxhGYQesaQaYKePCZDEC'
  },
  [Language.FRENCH]: {
    male: 'onwK4e9ZLuTAKqWW03F9', 
    female: 'XB0fDUnXU5powFXDhCwa'
  },
  [Language.SPANISH]: {
    male: 'YExhVa4bZONzeingloMX',
    female: '3ttovAt5bt3Kk38UGIob'
  }
};

export const ELEVEN_LABS_VOICE_NAMES: Record<Language, Record<Gender, string>> = {
  [Language.ENGLISH]: { male: 'Adam', female: 'Sabrina' },
  [Language.JAPANESE]: { male: 'Otani', female: 'Chii-chan' },
  [Language.FRENCH]: { male: 'Daniel', female: 'Amelie' },
  [Language.SPANISH]: { male: 'Juan Carlos', female: 'Alma' }
};

export const KEYBOARD_LAYOUTS = {
  [Language.ENGLISH]: [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X'],
    ['Y', 'Z', 'Space', 'Backspace', '.', '?', 'Clear']
  ],
  [Language.SPANISH]: [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'Ñ', 'O', 'P', 'Q'],
    ['R', 'S', 'T', 'U', 'V', 'W'],
    ['X', 'Y', 'Z', 'Space', 'Backspace', '.', 'Clear']
  ],
  [Language.FRENCH]: [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X'],
    ['Y', 'Z', 'Space', 'Backspace', 'É', 'À', 'Clear']
  ],
  [Language.JAPANESE]: [
    ['あ', 'い', 'う', 'え', 'お', 'Space', 'Del'],
    ['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ'],
    ['さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ'],
    ['た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ'],
    ['な', 'に', 'ぬ', 'ね', 'の', 'っ', 'ゃ'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ', 'ば', 'ぱ'],
    ['ま', 'み', 'む', 'め', 'も', 'ゅ', 'ょ'],
    ['や', 'ゆ', 'よ', 'わ', 'を', 'ん', 'Clear']
  ]
};

export const VOICE_CLONE_SCRIPTS: Record<Language, string> = {
  [Language.ENGLISH]: "Hello, my name is [name], and I am recording this sample to create a digital copy of my voice. I want my family, friends, and caregivers to hear me as I truly sound—not just my words, but my personality and warmth. The weather today seems pleasant enough. I remember sunny days at the beach when I was younger, watching the waves roll in. Could you please pass me the water? Thank you so much—I really appreciate your help. I love you more than words can say. I'm grateful for every single moment we share together.",
  [Language.SPANISH]: "Hola, me llamo [nombre], y estoy grabando esta muestra para crear una copia digital de mi voz. Quiero que mi familia, mis amigos y mis cuidadores me escuchen como realmente sueno—no solo mis palabras, sino mi personalidad y mi cariño. El clima hoy parece bastante agradable. Recuerdo días soleados en la playa. ¿Podría pasarme el agua, por favor? Muchas gracias—realmente aprecio toda su ayuda. Te quiero más de lo que las palabras pueden expresar. Estoy agradecido por cada momento que compartimos juntos.",
  [Language.FRENCH]: "Bonjour, je m'appelle [nom], et j'enregistre cet échantillon pour créer une copie numérique de ma voix. Je veux que ma famille et mes soignants m'entendent comme je suis vraiment. Le temps aujourd'hui semble assez agréable. Je me souviens des journées ensoleillées à la plage. Pourriez-vous me passer l'eau, s'il vous plaît ? Merci beaucoup. Je t'aime plus que les mots ne peuvent le dire. Je suis reconnaissant pour chaque moment que nous partageons ensemble.",
  [Language.JAPANESE]: "こんにちは、私の名前は[名前]です。これは私の声のデジタルコピーを作成するためのサンプル録音です。家族、友人、そして介護者の皆さんに、私の本当の声を聞いてもらいたいと思います。今日の天気はとても気持ちがいいですね。若い頃、海辺で過ごした晴れた日々を思い出します。お水をいただけますか？ありがとうございます。いつも助けていただいて本当に感謝しています。言葉では言い表せないほど愛しています。一緒に過ごすすべての瞬間に感謝しています。"
};

export const TRANSLATIONS = {
  [Language.ENGLISH]: {
    speak: "SPEAK",
    go: "GO",
    typeHere: "Type here...",
    keyboard: "KEYBOARD",
    services: "SERVICES",
    settings: "SETTINGS",
    back: "BACK",
    servicesHeader: "Services",
    topLevel: "Top Level",
    goToSettings: "Go to Settings to add buttons here",
    profile: "Profile",
    loggedInAs: "Logged in as:",
    voiceCloningIntake: "Voice Cloning Intake",
    freeServiceDesc: "Free Service: Voice cloning is provided at no charge to patients with neurodegenerative diseases that will rob people of their voice by",
    collaborationDesc: "This project is in collaboration with the",
    statusPending: "Status: Request Pending",
    pendingDesc: "Your voice sample has been submitted. The admin (marc.stein@gmail.com) has been notified.",
    createCopyDesc: "To create a digital copy of your voice, please read the text below in your selected language to submit a sample directly through this app.",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    play: "Play",
    retake: "Retake",
    submitRequest: "Submit Request",
    existingVoiceId: "Cloud Voice Settings",
    existingVoiceDesc: "Choose a high-quality preset or enter a custom Voice ID.",
    voiceIdLabel: "Custom Voice ID",
    saveActivate: "Save Custom ID",
    standardVoices: "Standard Backup Voices",
    backupVoicesDesc: "Used if custom voice is not configured.",
    addCustomButton: "Add Custom Button",
    step1: "Step 1: Phrase",
    edit: "Edit",
    empty: "Empty",
    step2: "Step 2: Location",
    change: "Change",
    saveButton: "Save Button",
    voiceUpdated: "Voice updated.",
    elevenLabsConnected: "ElevenLabs connected. Testing voice.",
    buttonAdded: "Button added to all languages!",
    micError: "Microphone access denied.",
    uploadSuccess: "Request sent successfully! Admin has been notified.",
    uploadFail: "Failed to upload. Please try again.",
    presetMale: "Male",
    presetFemale: "Female",
    active: "Active",
    customId: "Custom ID"
  },
  [Language.SPANISH]: {
    speak: "HABLAR",
    go: "IR",
    typeHere: "Escribe aquí...",
    keyboard: "TECLADO",
    services: "SERVICIOS",
    settings: "AJUSTES",
    back: "ATRÁS",
    servicesHeader: "Servicios",
    topLevel: "Nivel Superior",
    goToSettings: "Ve a Ajustes para añadir botones aquí",
    profile: "Perfil",
    loggedInAs: "Sesión iniciada como:",
    voiceCloningIntake: "Clonación de Voz",
    freeServiceDesc: "Servicio Gratuito: La clonación de voz se proporciona sin costo a pacientes con enfermedades neurodegenerativas que robarán la voz de las personas, por",
    collaborationDesc: "Este proyecto es en colaboración con la",
    statusPending: "Estado: Solicitud Pendiente",
    pendingDesc: "Su muestra de voz ha sido enviada. Se ha notificado al administrador.",
    createCopyDesc: "Para crear una copia digital de su voz, lea el texto a continuación en su idioma seleccionado para enviar una muestra directamente a través de esta aplicación.",
    startRecording: "Iniciar Grabación",
    stopRecording: "Detener Grabación",
    play: "Reproducir",
    retake: "Repetir",
    submitRequest: "Enviar Solicitud",
    existingVoiceId: "Ajustes de Voz en la Nube",
    existingVoiceDesc: "Elija un preajuste de alta calidad o ingrese un ID de voz personalizado.",
    voiceIdLabel: "ID de Voz Personalizado",
    saveActivate: "Guardar ID",
    standardVoices: "Voces de Respaldo Estándar",
    backupVoicesDesc: "Se usa si la voz personalizada no está configurada.",
    addCustomButton: "Añadir Botón Personalizado",
    step1: "Paso 1: Frase",
    edit: "Editar",
    empty: "Vacío",
    step2: "Paso 2: Ubicación",
    change: "Cambiar",
    saveButton: "Guardar Botón",
    voiceUpdated: "Voz actualizada.",
    elevenLabsConnected: "ElevenLabs conectado. Probando voz.",
    buttonAdded: "¡Botón añadido a todos los idiomas!",
    micError: "Acceso al micrófono denegado.",
    uploadSuccess: "¡Solicitud enviada! El administrador ha sido notificado.",
    uploadFail: "Error al subir. Inténtalo de nuevo.",
    presetMale: "Masculino",
    presetFemale: "Femenino",
    active: "Activo",
    customId: "ID Personalizado"
  },
  [Language.FRENCH]: {
    speak: "PARLER",
    go: "GO",
    typeHere: "Tapez ici...",
    keyboard: "CLAVIER",
    services: "SERVICES",
    settings: "RÉGLAGES",
    back: "RETOUR",
    servicesHeader: "Services",
    topLevel: "Niveau Supérieur",
    goToSettings: "Allez dans Réglages pour ajouter des boutons",
    profile: "Profil",
    loggedInAs: "Connecté en tant que :",
    voiceCloningIntake: "Clonage Vocal",
    freeServiceDesc: "Service Gratuit : Le clonage vocal est fourni gratuitement aux patients atteints de maladies neurodégénératives, par",
    collaborationDesc: "Ce projet est en collaboration avec la",
    statusPending: "Statut : Demande En Attente",
    pendingDesc: "Votre échantillon vocal a été soumis. L'administrateur a été notifié.",
    createCopyDesc: "Pour créer une copie numérique de votre voix, veuillez lire le texte ci-dessous dans la langue sélectionnée pour soumettre un échantillon directement via cette application.",
    startRecording: "Démarrer",
    stopRecording: "Arrêter",
    play: "Lire",
    retake: "Refaire",
    submitRequest: "Soumettre",
    existingVoiceId: "Paramètres Voix Cloud",
    existingVoiceDesc: "Choisissez un préréglage ou entrez un ID vocal personnalisé.",
    voiceIdLabel: "ID Vocal Personnalisé",
    saveActivate: "Sauvegarder ID",
    standardVoices: "Voix de Secours Standard",
    backupVoicesDesc: "Utilisé si la voix personnalisée n'est pas configurée.",
    addCustomButton: "Ajouter un Bouton",
    step1: "Étape 1 : Phrase",
    edit: "Modifier",
    empty: "Vide",
    step2: "Étape 2 : Emplacement",
    change: "Changer",
    saveButton: "Enregistrer",
    voiceUpdated: "Voix mise à jour.",
    elevenLabsConnected: "ElevenLabs connecté. Test de la voix.",
    buttonAdded: "Bouton ajouté à toutes les langues !",
    micError: "Accès micro refusé.",
    uploadSuccess: "Demande envoyée ! L'administrateur a été notifié.",
    uploadFail: "Échec de l'envoi. Réessayez.",
    presetMale: "Masculin",
    presetFemale: "Féminin",
    active: "Actif",
    customId: "ID Personnalisé"
  },
  [Language.JAPANESE]: {
    speak: "話す",
    go: "GO",
    typeHere: "ここに入力...",
    keyboard: "キーボード",
    services: "サービス",
    settings: "設定",
    back: "戻る",
    servicesHeader: "サービス",
    topLevel: "トップレベル",
    goToSettings: "設定でボタンを追加してください",
    profile: "プロフィール",
    loggedInAs: "ログイン中：",
    voiceCloningIntake: "音声クローニング",
    freeServiceDesc: "無料サービス：神経変性疾患により声を失う可能性のある患者様向けに、音声クローニングを無料で提供しています。提供：",
    collaborationDesc: "このプロジェクトは以下との協力で行われています：",
    statusPending: "ステータス：申請中",
    pendingDesc: "音声サンプルが送信されました。管理者に通知されました。",
    createCopyDesc: "あなたの声のデジタルコピーを作成するには、選択した言語で以下のテキストを読み上げ、このアプリから直接サンプルを送信してください。",
    startRecording: "録音開始",
    stopRecording: "録音停止",
    play: "再生",
    retake: "撮り直し",
    submitRequest: "リクエスト送信",
    existingVoiceId: "クラウド音声設定",
    existingVoiceDesc: "プリセットを選択するか、カスタム音声IDを入力してください。",
    voiceIdLabel: "カスタム音声ID",
    saveActivate: "IDを保存",
    standardVoices: "標準バックアップ音声",
    backupVoicesDesc: "カスタム音声が設定されていない場合に使用されます。",
    addCustomButton: "カスタムボタン追加",
    step1: "ステップ1：フレーズ",
    edit: "編集",
    empty: "空",
    step2: "ステップ2：場所",
    change: "変更",
    saveButton: "ボタンを保存",
    voiceUpdated: "音声が更新されました。",
    elevenLabsConnected: "ElevenLabs接続。テスト中。",
    buttonAdded: "全言語にボタンが追加されました！",
    micError: "マイクへのアクセスが拒否されました。",
    uploadSuccess: "リクエスト送信完了！管理者に通知されました。",
    uploadFail: "送信に失敗しました。再試行してください。",
    presetMale: "男性",
    presetFemale: "女性",
    active: "使用中",
    customId: "カスタムID"
  }
};

const COMMON_ENGLISH = [
  {
    id: 'quick_res',
    label: 'Quick Chat',
    icon: 'message',
    color: 'bg-slate-600',
    children: [
      { id: 'yes', label: 'Yes', icon: 'thumbs-up', speechText: 'Yes.' },
      { id: 'no', label: 'No', icon: 'thumbs-down', speechText: 'No.' },
      { id: 'thanks', label: 'Thanks', icon: 'smile', speechText: 'Thank you.' },
      { id: 'wait', label: 'Wait', icon: 'clock', speechText: 'Please wait a moment.' },
      { id: 'stop', label: 'Stop', icon: 'stop', speechText: 'Please stop.' },
      { id: 'dont_know', label: 'Don\'t Know', icon: 'help-circle', speechText: 'I do not know.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Food & Drink',
    icon: 'utensils',
    color: 'bg-orange-700',
    children: [
        { id: 'water', label: 'Water', icon: 'glass-water', speechText: 'I would like some water.' },
        { id: 'coffee', label: 'Coffee', icon: 'coffee', speechText: 'I would like some coffee.' },
        { id: 'hungry', label: 'Hungry', icon: 'utensils', speechText: 'I am hungry.' },
        { id: 'thirsty', label: 'Thirsty', icon: 'droplets', speechText: 'I am thirsty.' },
    ]
  },
  {
    id: 'emergency',
    label: 'EMERGENCY',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: 'HELP ME', icon: 'alert-circle', speechText: 'Help! I need help immediately!' },
      { id: 'breath', label: 'Can\'t Breathe', icon: 'wind', speechText: 'I cannot breathe properly.' },
      { id: 'choke', label: 'Choking', icon: 'alert-circle', speechText: 'I am choking.' },
      { id: 'pain_sev', label: 'Severe Pain', icon: 'alert-circle', speechText: 'I am in severe pain.' },
      { id: 'fall', label: 'Falling', icon: 'alert-circle', speechText: 'I feel like I am falling.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Comfort',
    icon: 'bed',
    color: 'bg-teal-700',
    children: [
        { id: 'lights', label: 'Lights', icon: 'lightbulb', speechText: 'Please change the lights.' },
        { id: 'hot', label: 'Too Hot', icon: 'thermometer-sun', speechText: 'I am too hot.' },
        { id: 'cold', label: 'Too Cold', icon: 'thermometer-snowflake', speechText: 'I am too cold.' },
        { id: 'position', label: 'Position', icon: 'bed', speechText: 'I need to change my position.' },
        { id: 'shower', label: 'Shower', icon: 'shower-head', speechText: 'I would like a shower.' },
    ]
  },
  {
    id: 'emotions',
    label: 'Emotions',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Happy', icon: 'smile', speechText: 'I am happy.' },
      { id: 'sad', label: 'Sad', icon: 'frown', speechText: 'I feel sad.' },
      { id: 'love', label: 'I Love You', icon: 'heart', speechText: 'I love you.' },
    ]
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: 'gamepad',
    color: 'bg-purple-700',
    children: [
        { id: 'tv', label: 'TV', icon: 'tv', speechText: 'I want to watch TV.' },
        { id: 'music', label: 'Music', icon: 'music', speechText: 'I want to listen to music.' },
        { id: 'read', label: 'Read', icon: 'book', speechText: 'I want to read.' },
    ]
  },
  {
    id: 'people',
    label: 'People',
    icon: 'users',
    color: 'bg-blue-700',
    children: [
        { id: 'doc', label: 'Doctor', icon: 'stethoscope', speechText: 'I need a doctor.' },
        { id: 'nurse', label: 'Nurse', icon: 'user', speechText: 'I need a nurse.' },
        { id: 'family', label: 'Family', icon: 'users', speechText: 'Call my family.' },
        { id: 'phone', label: 'Phone', icon: 'phone', speechText: 'Can I use the phone?' },
    ]
  }
];

const COMMON_SPANISH = [
  {
    id: 'quick_res',
    label: 'Chat Rápido',
    icon: 'message',
    color: 'bg-slate-600',
    children: [
      { id: 'yes', label: 'Sí', icon: 'thumbs-up', speechText: 'Sí.' },
      { id: 'no', label: 'No', icon: 'thumbs-down', speechText: 'No.' },
      { id: 'thanks', label: 'Gracias', icon: 'smile', speechText: 'Gracias.' },
      { id: 'wait', label: 'Espera', icon: 'clock', speechText: 'Espera un momento.' },
      { id: 'stop', label: 'Para', icon: 'stop', speechText: 'Para, por favor.' },
      { id: 'dont_know', label: 'No sé', icon: 'message', speechText: 'No lo sé.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Comida',
    icon: 'utensils',
    color: 'bg-orange-700',
    children: [
        { id: 'water', label: 'Agua', icon: 'glass-water', speechText: 'Quiero agua.' },
        { id: 'coffee', label: 'Café', icon: 'coffee', speechText: 'Quiero café.' },
        { id: 'hungry', label: 'Hambre', icon: 'utensils', speechText: 'Tengo hambre.' },
        { id: 'thirsty', label: 'Sed', icon: 'droplets', speechText: 'Tengo sed.' },
    ]
  },
  {
    id: 'emergency',
    label: 'EMERGENCIA',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: 'AYUDA', icon: 'alert-circle', speechText: '¡Ayuda! ¡Necesito ayuda!' },
      { id: 'breath', label: 'Respirar', icon: 'wind', speechText: 'No puedo respirar bien.' },
      { id: 'choke', label: 'Ahogo', icon: 'alert-circle', speechText: 'Me estoy ahogando.' },
      { id: 'pain_sev', label: 'Dolor', icon: 'alert-circle', speechText: 'Tengo mucho dolor.' },
      { id: 'fall', label: 'Caída', icon: 'alert-circle', speechText: 'Siento que me caigo.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Confort',
    icon: 'bed',
    color: 'bg-teal-700',
    children: [
        { id: 'lights', label: 'Luces', icon: 'lightbulb', speechText: 'Por favor, cambia las luces.' },
        { id: 'hot', label: 'Calor', icon: 'thermometer-sun', speechText: 'Tengo calor.' },
        { id: 'cold', label: 'Frío', icon: 'thermometer-snowflake', speechText: 'Tengo frío.' },
        { id: 'position', label: 'Posición', icon: 'bed', speechText: 'Necesito cambiar de posición.' },
        { id: 'shower', label: 'Ducha', icon: 'shower-head', speechText: 'Quiero una ducha.' },
    ]
  },
  {
    id: 'emotions',
    label: 'Emociones',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Feliz', icon: 'smile', speechText: 'Estoy feliz.' },
      { id: 'sad', label: 'Triste', icon: 'frown', speechText: 'Estoy triste.' },
      { id: 'love', label: 'Te quiero', icon: 'heart', speechText: 'Te quiero.' },
    ]
  },
  {
    id: 'activities',
    label: 'Actividades',
    icon: 'gamepad',
    color: 'bg-purple-700',
    children: [
        { id: 'tv', label: 'TV', icon: 'tv', speechText: 'Quiero ver la televisión.' },
        { id: 'music', label: 'Música', icon: 'music', speechText: 'Quiero escuchar música.' },
        { id: 'read', label: 'Leer', icon: 'book', speechText: 'Quiero leer.' },
    ]
  },
  {
    id: 'people',
    label: 'Gente',
    icon: 'users',
    color: 'bg-blue-700',
    children: [
        { id: 'doc', label: 'Médico', icon: 'stethoscope', speechText: 'Necesito un médico.' },
        { id: 'nurse', label: 'Enfermera', icon: 'user', speechText: 'Necesito una enfermera.' },
        { id: 'family', label: 'Familia', icon: 'users', speechText: 'Llama a mi familia.' },
        { id: 'phone', label: 'Teléfono', icon: 'phone', speechText: '¿Puedo usar el teléfono?' },
    ]
  }
];

const COMMON_FRENCH = [
  {
    id: 'quick_res',
    label: 'Chat Rapide',
    icon: 'message',
    color: 'bg-slate-600',
    children: [
      { id: 'yes', label: 'Oui', icon: 'thumbs-up', speechText: 'Oui.' },
      { id: 'no', label: 'Non', icon: 'thumbs-down', speechText: 'Non.' },
      { id: 'thanks', label: 'Merci', icon: 'smile', speechText: 'Merci.' },
      { id: 'wait', label: 'Attends', icon: 'clock', speechText: 'Attends un moment.' },
      { id: 'stop', label: 'Arrête', icon: 'stop', speechText: 'Arrête, s\'il te plaît.' },
      { id: 'dont_know', label: 'Sais pas', icon: 'message', speechText: 'Je ne sais pas.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Nourriture',
    icon: 'utensils',
    color: 'bg-orange-700',
    children: [
        { id: 'water', label: 'Eau', icon: 'glass-water', speechText: 'Je voudrais de l\'eau.' },
        { id: 'coffee', label: 'Café', icon: 'coffee', speechText: 'Je voudrais du café.' },
        { id: 'hungry', label: 'Faim', icon: 'utensils', speechText: 'J\'ai faim.' },
        { id: 'thirsty', label: 'Soif', icon: 'droplets', speechText: 'J\'ai soif.' },
    ]
  },
  {
    id: 'emergency',
    label: 'URGENCE',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: 'AIDEZ-MOI', icon: 'alert-circle', speechText: 'Aidez-moi ! C\'est urgent !' },
      { id: 'breath', label: 'Respirer', icon: 'wind', speechText: 'Je ne peux pas respirer.' },
      { id: 'choke', label: 'J\'étouffe', icon: 'alert-circle', speechText: 'J\'étouffe.' },
      { id: 'pain_sev', label: 'Douleur', icon: 'alert-circle', speechText: 'J\'ai très mal.' },
      { id: 'fall', label: 'Je tombe', icon: 'alert-circle', speechText: 'Je sens que je tombe.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Confort',
    icon: 'bed',
    color: 'bg-teal-700',
    children: [
        { id: 'lights', label: 'Lumières', icon: 'lightbulb', speechText: 'Changez les lumières, s\'il vous plaît.' },
        { id: 'hot', label: 'Chaud', icon: 'thermometer-sun', speechText: 'J\'ai trop chaud.' },
        { id: 'cold', label: 'Froid', icon: 'thermometer-snowflake', speechText: 'J\'ai trop froid.' },
        { id: 'position', label: 'Position', icon: 'bed', speechText: 'Je dois changer de position.' },
        { id: 'shower', label: 'Douche', icon: 'shower-head', speechText: 'Je voudrais une douche.' },
    ]
  },
  {
    id: 'emotions',
    label: 'Émotions',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Heureux', icon: 'smile', speechText: 'Je suis heureux.' },
      { id: 'sad', label: 'Triste', icon: 'frown', speechText: 'Je suis triste.' },
      { id: 'love', label: 'Je t\'aime', icon: 'heart', speechText: 'Je t\'aime.' },
    ]
  },
  {
    id: 'activities',
    label: 'Activités',
    icon: 'gamepad',
    color: 'bg-purple-700',
    children: [
        { id: 'tv', label: 'TV', icon: 'tv', speechText: 'Je veux regarder la télé.' },
        { id: 'music', label: 'Musique', icon: 'music', speechText: 'Je veux écouter de la musique.' },
        { id: 'read', label: 'Lire', icon: 'book', speechText: 'Je veux lire.' },
    ]
  },
  {
    id: 'people',
    label: 'Gens',
    icon: 'users',
    color: 'bg-blue-700',
    children: [
        { id: 'doc', label: 'Médecin', icon: 'stethoscope', speechText: 'J\'ai besoin d\'un médecin.' },
        { id: 'nurse', label: 'Infirmier', icon: 'user', speechText: 'J\'ai besoin d\'un infirmier.' },
        { id: 'family', label: 'Famille', icon: 'users', speechText: 'Appelez ma famille.' },
        { id: 'phone', label: 'Téléphone', icon: 'phone', speechText: 'Je peux utiliser le téléphone ?' },
    ]
  }
];

const COMMON_JAPANESE = [
  {
    id: 'quick_res',
    label: 'クイック',
    icon: 'message',
    color: 'bg-slate-600',
    children: [
      { id: 'yes', label: 'はい', icon: 'thumbs-up', speechText: 'はい。' },
      { id: 'no', label: 'いいえ', icon: 'thumbs-down', speechText: 'いいえ。' },
      { id: 'thanks', label: 'ありがとう', icon: 'smile', speechText: 'ありがとうございます。' },
      { id: 'wait', label: '待って', icon: 'clock', speechText: '少し待ってください。' },
      { id: 'stop', label: '止めて', icon: 'stop', speechText: '止めてください。' },
      { id: 'dont_know', label: '不明', icon: 'message', speechText: '分かりません。' },
    ]
  },
  {
    id: 'food_drink',
    label: '食事',
    icon: 'utensils',
    color: 'bg-orange-700',
    children: [
        { id: 'water', label: '水', icon: 'glass-water', speechText: 'お水をください。' },
        { id: 'coffee', label: 'コーヒー', icon: 'coffee', speechText: 'コーヒーをください。' },
        { id: 'hungry', label: '空腹', icon: 'utensils', speechText: 'お腹が空きました。' },
        { id: 'thirsty', label: '喉乾いた', icon: 'droplets', speechText: '喉が乾きました。' },
    ]
  },
  {
    id: 'emergency',
    label: '緊急',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: '助けて', icon: 'alert-circle', speechText: '助けて！緊急です！' },
      { id: 'breath', label: '呼吸', icon: 'wind', speechText: '息が苦しいです。' },
      { id: 'choke', label: '詰まった', icon: 'alert-circle', speechText: '喉に詰まりました。' },
      { id: 'pain_sev', label: '激痛', icon: 'alert-circle', speechText: 'ひどい痛みがあります。' },
      { id: 'fall', label: '落ちる', icon: 'alert-circle', speechText: '落ちそうです。' },
    ]
  },
  {
    id: 'comfort',
    label: '快適さ',
    icon: 'bed',
    color: 'bg-teal-700',
    children: [
        { id: 'lights', label: '電気', icon: 'lightbulb', speechText: '電気を変えてください。' },
        { id: 'hot', label: '暑い', icon: 'thermometer-sun', speechText: '暑いです。' },
        { id: 'cold', label: '寒い', icon: 'thermometer-snowflake', speechText: '寒いです。' },
        { id: 'position', label: '体勢', icon: 'bed', speechText: '体勢を変えたいです。' },
        { id: 'shower', label: 'シャワー', icon: 'shower-head', speechText: 'シャワーを浴びたいです。' },
    ]
  },
  {
    id: 'emotions',
    label: '感情',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: '嬉しい', icon: 'smile', speechText: '嬉しいです。' },
      { id: 'sad', label: '悲しい', icon: 'frown', speechText: '悲しいです。' },
      { id: 'love', label: '愛してる', icon: 'heart', speechText: '愛しています。' },
    ]
  },
  {
    id: 'activities',
    label: '活動',
    icon: 'gamepad',
    color: 'bg-purple-700',
    children: [
        { id: 'tv', label: 'テレビ', icon: 'tv', speechText: 'テレビが見たいです。' },
        { id: 'music', label: '音楽', icon: 'music', speechText: '音楽が聴きたいです。' },
        { id: 'read', label: '読書', icon: 'book', speechText: '本が読みたいです。' },
    ]
  },
  {
    id: 'people',
    label: '人',
    icon: 'users',
    color: 'bg-blue-700',
    children: [
        { id: 'doc', label: '医者', icon: 'stethoscope', speechText: 'お医者さんを呼んでください。' },
        { id: 'nurse', label: '看護師', icon: 'user', speechText: '看護師さんを呼んでください。' },
        { id: 'family', label: '家族', icon: 'users', speechText: '家族に連絡してください。' },
        { id: 'phone', label: '電話', icon: 'phone', speechText: '電話を使ってもいいですか？' },
    ]
  }
];

export const SERVICE_TREES: Record<Language, ServiceItem[]> = {
  [Language.ENGLISH]: COMMON_ENGLISH,
  [Language.SPANISH]: COMMON_SPANISH,
  [Language.JAPANESE]: COMMON_JAPANESE,
  [Language.FRENCH]: COMMON_FRENCH
};

// --- DIRECTOR MODE DEMO SCRIPT ---
// Automated sequence for the demo video

export const DEMO_SEQUENCE: DemoStep[] = [
  // 0:00 - Intro & Login
  { action: 'WAIT', delayAfter: 1500 }, 
  { action: 'NARRATE', payload: "Hello, Chatty 3.0 is a complete communication suite for those with ALS, available entirely for free. Designed to work with any standard eye-tracking camera.", delayAfter: 200 },
  { action: 'SET_AUTH_VIEW', payload: 'LOGIN' },
  { action: 'WAIT', delayAfter: 800 },
  { action: 'SET_INPUT', payload: { email: 'demo@chatty.ai', password: 'demo123' } },
  { action: 'WAIT', delayAfter: 800 },
  { action: 'LOGIN' },
  
  // 0:15 - Services Navigation (Drill Down)
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "The Service Hub provides instant access to essential needs. Deep category trees allow users to drill down quickly without the fatigue of typing." },
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'emergency', delayAfter: 1200 }, // Click Emergency
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'pain_sev', delayAfter: 1000 }, // Click Severe Pain
  { action: 'SPEAK_APP', payload: "I am in severe pain.", delayAfter: 1500 },

  // 0:35 - Services Customization (Add New)
  { action: 'NAVIGATE', payload: 'SERVICES', delayAfter: 500 }, // Back to top
  { action: 'NARRATE', payload: "The platform is fully extensible. Users can type any phrase to instantly add custom service buttons, adapting the interface to their specific daily life." },
  { action: 'NAVIGATE', payload: 'KEYBOARD' }, // Go to type
  { action: 'TYPE_KEYS', payload: "Play Music", delayAfter: 300 },
  { action: 'NAVIGATE', payload: 'SERVICES', delayAfter: 800 }, // Go back to services
  { action: 'CLICK_ADD_SERVICE', delayAfter: 1000 }, // Click the "Add 'Play Music'" button
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'Play Music', delayAfter: 800 }, // Click the NEW button (by label)
  { action: 'SPEAK_APP', payload: "Play Music", delayAfter: 1500 },

  // 0:55 - Prediction
  { action: 'NAVIGATE', payload: 'KEYBOARD', delayAfter: 500 },
  { action: 'NARRATE', payload: "For unique expression, our predictive engine anticipates intent, minimizing the eye movement required to construct complex sentences." },
  { action: 'TYPE_KEYS', payload: "I w", delayAfter: 400 }, 
  { action: 'WAIT', delayAfter: 600 },
  { action: 'CLICK_PREDICTION', payload: "would like", delayAfter: 800 },
  { action: 'CLICK_PREDICTION', payload: "water", delayAfter: 800 },
  { action: 'SPEAK_APP', payload: "I would like water.", delayAfter: 1500 },

  // 1:10 - Multilingual (Japanese)
  { action: 'WAIT', delayAfter: 500 },
  { action: 'NARRATE', payload: "Communication knows no borders. Hello Chatty features instant localization, adapting the interface and predictive models to languages like Spanish, French, and Japanese." },
  { action: 'SET_LANGUAGE', payload: Language.JAPANESE, delayAfter: 1500 }, // Switch to Japanese
  { action: 'MOCK_PREDICTIONS', payload: ["こんにちは", "ありがとう", "はい", "いいえ"] }, // Force prediction to exist
  { action: 'TYPE_KEYS', payload: "こ", delayAfter: 400 }, // Type "ko" -> "こ"
  { action: 'CLICK_PREDICTION', payload: "こんにちは", delayAfter: 800 }, 
  { action: 'SPEAK_APP', payload: "こんにちは", delayAfter: 1000 },
  { action: 'SET_LANGUAGE', payload: Language.ENGLISH, delayAfter: 500 }, // Switch back

  // 1:30 - Vision
  { action: 'OPEN_CAMERA', delayAfter: 2000 },
  { action: 'NARRATE', payload: "With visual grounding, users can simply look at an object to generate relevant phrases, bridging the physical and digital worlds." },
  { action: 'MOCK_CAMERA_ANALYSIS', delayAfter: 2000 },
  { action: 'CLICK_PREDICTION', payload: "Is it hot?", delayAfter: 1000 },
  { action: 'SPEAK_APP', payload: "Is it hot?", delayAfter: 1500 },

  // 1:45 - Voice Banking (Settings)
  { action: 'NAVIGATE', payload: 'SETTINGS' },
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "Most importantly, we preserve identity. Through our partnership with ALS Voice Bank and ElevenLabs, patients can bank their voice for free." },
  // Simulate scrolling or highlighting voice clone section
  { action: 'WAIT', delayAfter: 3000 },
  { action: 'NARRATE', payload: "Once cloned, the AI speaks with their unique intonation, preserving their self-expression forever." },

  // 2:05 - Outro
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "Hello Chatty. Giving everyone a voice." },
  { action: 'WAIT', delayAfter: 2000 },
];
