import { Language, ServiceItem } from './types';

export const DWELL_TIME_MS = 800; // Time in ms to trigger a click

// Keyboards
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
    existingVoiceId: "Existing Voice ID",
    existingVoiceDesc: "If you already have a Voice ID from ElevenLabs, enter it here.",
    voiceIdLabel: "Voice ID",
    saveActivate: "Save & Activate",
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
    uploadFail: "Failed to upload. Please try again."
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
    existingVoiceId: "ID de Voz Existente",
    existingVoiceDesc: "Si ya tiene un ID de Voz de ElevenLabs, ingréselo aquí.",
    voiceIdLabel: "ID de Voz",
    saveActivate: "Guardar y Activar",
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
    uploadFail: "Error al subir. Inténtalo de nuevo."
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
    existingVoiceId: "ID Vocal Existant",
    existingVoiceDesc: "Si vous avez déjà un ID Vocal d'ElevenLabs, entrez-le ici.",
    voiceIdLabel: "ID Vocal",
    saveActivate: "Sauvegarder et Activer",
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
    uploadFail: "Échec de l'envoi. Réessayez."
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
    existingVoiceId: "既存の音声ID",
    existingVoiceDesc: "ElevenLabsの音声IDをお持ちの場合は、ここに入力してください。",
    voiceIdLabel: "音声ID",
    saveActivate: "保存して有効化",
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
    uploadFail: "送信に失敗しました。再試行してください。"
  }
};

// --- SERVICE TREES ---

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
    id: 'emotions',
    label: 'Emotions',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Happy', icon: 'smile', speechText: 'I am happy.' },
      { id: 'sad', label: 'Sad', icon: 'frown', speechText: 'I feel sad.' },
      { id: 'scared', label: 'Scared', icon: 'alert-circle', speechText: 'I am scared.' },
      { id: 'angry', label: 'Frustrated', icon: 'frown', speechText: 'I am feeling frustrated.' },
      { id: 'love', label: 'I Love You', icon: 'heart', speechText: 'I love you.' },
      { id: 'tired', label: 'Tired', icon: 'moon', speechText: 'I am tired.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Food & Drink',
    icon: 'utensils',
    color: 'bg-orange-600',
    children: [
      { id: 'water', label: 'Water', icon: 'droplets', speechText: 'I would like some water please.' },
      { id: 'coffee', label: 'Coffee', icon: 'coffee', speechText: 'I would like a coffee please.' },
      { id: 'tea', label: 'Tea', icon: 'cup-soda', speechText: 'I would like some tea please.' },
      { id: 'juice', label: 'Juice', icon: 'glass-water', speechText: 'I would like some juice.' },
      { id: 'hungry', label: 'I am hungry', icon: 'utensils', speechText: 'I am hungry, can I have a snack?' },
      { id: 'full', label: 'I am Full', icon: 'check', speechText: 'I am full, thank you.' },
    ]
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: 'stethoscope',
    color: 'bg-blue-800',
    children: [
      { id: 'doctor', label: 'Doctor', icon: 'users', speechText: 'I need to see a doctor.' },
      { id: 'nurse', label: 'Nurse', icon: 'users', speechText: 'Please call the nurse.' },
      { id: 'meds', label: 'Medication', icon: 'pill', speechText: 'I need my medication.' },
      { id: 'suction', label: 'Suction', icon: 'wind', speechText: 'I need suctioning please.' },
      { id: 'position', label: 'Reposition', icon: 'refresh-cw', speechText: 'Please help me change position.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Comfort',
    icon: 'bed',
    color: 'bg-blue-600',
    children: [
      { id: 'adjust_bed', label: 'Adjust Bed', icon: 'bed', speechText: 'Please adjust my bed.' },
      { id: 'pillow', label: 'Fix Pillow', icon: 'smile', speechText: 'Can you fix my pillow?' },
      { id: 'too_hot', label: 'Too Hot', icon: 'thermometer-sun', speechText: 'I am too hot.' },
      { id: 'too_cold', label: 'Too Cold', icon: 'thermometer-snowflake', speechText: 'I am too cold.' },
      { 
        id: 'pain', 
        label: 'Pain', 
        icon: 'alert-circle', 
        children: [
          { id: 'head', label: 'Head', icon: 'smile', speechText: 'I have a headache.' },
          { id: 'stomach', label: 'Stomach', icon: 'user', speechText: 'My stomach hurts.' },
          { id: 'chest', label: 'Chest', icon: 'alert-circle', speechText: 'My chest hurts.' },
          { id: 'back', label: 'Back', icon: 'user', speechText: 'My back hurts.' },
          { id: 'arms', label: 'Arms', icon: 'user', speechText: 'My arms hurt.' },
          { id: 'legs', label: 'Legs', icon: 'user', speechText: 'My legs hurt.' },
          { id: 'general', label: 'General', icon: 'alert-circle', speechText: 'I am in pain.' }
        ]
      },
    ]
  },
  {
    id: 'hygiene',
    label: 'Hygiene',
    icon: 'shower-head',
    color: 'bg-teal-600',
    children: [
      { id: 'bathroom', label: 'Bathroom', icon: 'bath', speechText: 'I need to use the bathroom.' },
      { id: 'shower', label: 'Shower', icon: 'shower-head', speechText: 'I would like a shower.' },
      { id: 'face', label: 'Wash Face', icon: 'sparkles', speechText: 'I want to wash my face.' },
      { id: 'teeth', label: 'Brush Teeth', icon: 'smile', speechText: 'I need to brush my teeth.' },
    ]
  },
  {
    id: 'people',
    label: 'People',
    icon: 'users',
    color: 'bg-purple-700',
    children: [
      { id: 'family', label: 'Family', icon: 'users', speechText: 'I want to see my family.' },
      { id: 'friend', label: 'Friend', icon: 'user', speechText: 'I want to see a friend.' },
      { id: 'caregiver', label: 'Caregiver', icon: 'user', speechText: 'Where is my caregiver?' },
      { id: 'alone', label: 'Privacy', icon: 'door-closed', speechText: 'I would like some privacy please.' },
    ]
  },
  {
    id: 'environment',
    label: 'Environment',
    icon: 'lightbulb',
    color: 'bg-green-700',
    children: [
      { id: 'lights_on', label: 'Lights On', icon: 'sun', speechText: 'Please turn the lights on.' },
      { id: 'lights_off', label: 'Lights Off', icon: 'moon', speechText: 'Please turn the lights off.' },
      { id: 'fan', label: 'Fan', icon: 'fan', speechText: 'Can you turn on the fan?' },
      { id: 'window', label: 'Window', icon: 'maximize', speechText: 'Please open the window.' },
      { id: 'door', label: 'Door', icon: 'door-open', speechText: 'Please close the door.' },
    ]
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: 'gamepad',
    color: 'bg-indigo-600',
    children: [
      { id: 'tv', label: 'TV', icon: 'tv', speechText: 'I want to watch TV.' },
      { id: 'music', label: 'Music', icon: 'music', speechText: 'I want to listen to music.' },
      { id: 'read', label: 'Read', icon: 'book', speechText: 'Please read to me.' },
      { id: 'outside', label: 'Outside', icon: 'sun', speechText: 'I want to go outside.' },
    ]
  }
];

// Spanish Translation
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
      { id: 'wait', label: 'Espera', icon: 'clock', speechText: 'Espera un momento, por favor.' },
      { id: 'stop', label: 'Para', icon: 'stop', speechText: 'Para, por favor.' },
      { id: 'dont_know', label: 'No Sé', icon: 'help-circle', speechText: 'No lo sé.' },
    ]
  },
  {
    id: 'emergency',
    label: 'EMERGENCIA',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: 'AYUDA', icon: 'alert-circle', speechText: '¡Ayuda! ¡Necesito ayuda urgente!' },
      { id: 'breath', label: 'Respiración', icon: 'wind', speechText: 'No puedo respirar bien.' },
      { id: 'choke', label: 'Ahogo', icon: 'alert-circle', speechText: 'Me estoy ahogando.' },
      { id: 'pain_sev', label: 'Dolor Fuerte', icon: 'alert-circle', speechText: 'Tengo un dolor muy fuerte.' },
      { id: 'fall', label: 'Caída', icon: 'alert-circle', speechText: 'Siento que me caigo.' },
    ]
  },
  {
    id: 'emotions',
    label: 'Emociones',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Feliz', icon: 'smile', speechText: 'Estoy feliz.' },
      { id: 'sad', label: 'Triste', icon: 'frown', speechText: 'Me siento triste.' },
      { id: 'scared', label: 'Asustado', icon: 'alert-circle', speechText: 'Tengo miedo.' },
      { id: 'angry', label: 'Frustrado', icon: 'frown', speechText: 'Me siento frustrado.' },
      { id: 'love', label: 'Te Quiero', icon: 'heart', speechText: 'Te quiero mucho.' },
      { id: 'tired', label: 'Cansado', icon: 'moon', speechText: 'Estoy cansado.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Comida y Bebida',
    icon: 'utensils',
    color: 'bg-orange-600',
    children: [
      { id: 'water', label: 'Agua', icon: 'droplets', speechText: 'Quisiera un poco de agua, por favor.' },
      { id: 'coffee', label: 'Café', icon: 'coffee', speechText: 'Quisiera un café, por favor.' },
      { id: 'tea', label: 'Té', icon: 'cup-soda', speechText: 'Quisiera un té, por favor.' },
      { id: 'juice', label: 'Jugo', icon: 'glass-water', speechText: 'Quisiera un poco de jugo.' },
      { id: 'hungry', label: 'Tengo hambre', icon: 'utensils', speechText: 'Tengo hambre, ¿puedo comer algo?' },
      { id: 'full', label: 'Lleno', icon: 'check', speechText: 'Estoy satisfecho, gracias.' },
    ]
  },
  {
    id: 'medical',
    label: 'Médico',
    icon: 'stethoscope',
    color: 'bg-blue-800',
    children: [
      { id: 'doctor', label: 'Doctor', icon: 'users', speechText: 'Necesito ver al doctor.' },
      { id: 'nurse', label: 'Enfermera', icon: 'users', speechText: 'Por favor llame a la enfermera.' },
      { id: 'meds', label: 'Medicina', icon: 'pill', speechText: 'Necesito mi medicina.' },
      { id: 'suction', label: 'Aspirar', icon: 'wind', speechText: 'Necesito aspiración por favor.' },
      { id: 'position', label: 'Posición', icon: 'refresh-cw', speechText: 'Por favor ayúdame a cambiar de posición.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Confort',
    icon: 'bed',
    color: 'bg-blue-600',
    children: [
      { id: 'adjust_bed', label: 'Ajustar Cama', icon: 'bed', speechText: 'Por favor, ajusta mi cama.' },
      { id: 'pillow', label: 'Almohada', icon: 'smile', speechText: '¿Puedes acomodar mi almohada?' },
      { id: 'too_hot', label: 'Calor', icon: 'thermometer-sun', speechText: 'Tengo mucho calor.' },
      { id: 'too_cold', label: 'Frío', icon: 'thermometer-snowflake', speechText: 'Tengo mucho frío.' },
      { 
        id: 'pain', 
        label: 'Dolor', 
        icon: 'alert-circle',
        children: [
          { id: 'head', label: 'Cabeza', icon: 'smile', speechText: 'Me duele la cabeza.' },
          { id: 'stomach', label: 'Estómago', icon: 'user', speechText: 'Me duele el estómago.' },
          { id: 'chest', label: 'Pecho', icon: 'alert-circle', speechText: 'Me duele el pecho.' },
          { id: 'back', label: 'Espalda', icon: 'user', speechText: 'Me duele la espalda.' },
          { id: 'arms', label: 'Brazos', icon: 'user', speechText: 'Me duelen los brazos.' },
          { id: 'legs', label: 'Piernas', icon: 'user', speechText: 'Me duelen las piernas.' },
          { id: 'general', label: 'General', icon: 'alert-circle', speechText: 'Tengo dolor.' }
        ] 
      },
    ]
  },
  {
    id: 'hygiene',
    label: 'Higiene',
    icon: 'shower-head',
    color: 'bg-teal-600',
    children: [
      { id: 'bathroom', label: 'Baño', icon: 'bath', speechText: 'Necesito usar el baño.' },
      { id: 'shower', label: 'Ducha', icon: 'shower-head', speechText: 'Quisiera tomar una ducha.' },
      { id: 'face', label: 'Lavar Cara', icon: 'sparkles', speechText: 'Quiero lavarme la cara.' },
      { id: 'teeth', label: 'Cepillar Dientes', icon: 'smile', speechText: 'Necesito cepillarme los dientes.' },
    ]
  },
  {
    id: 'people',
    label: 'Gente',
    icon: 'users',
    color: 'bg-purple-700',
    children: [
      { id: 'family', label: 'Familia', icon: 'users', speechText: 'Quiero ver a mi familia.' },
      { id: 'friend', label: 'Amigo', icon: 'user', speechText: 'Quiero ver a un amigo.' },
      { id: 'caregiver', label: 'Cuidador', icon: 'user', speechText: '¿Dónde está mi cuidador?' },
      { id: 'alone', label: 'Privacidad', icon: 'door-closed', speechText: 'Quisiera un poco de privacidad, por favor.' },
    ]
  },
  {
    id: 'environment',
    label: 'Ambiente',
    icon: 'lightbulb',
    color: 'bg-green-700',
    children: [
      { id: 'lights_on', label: 'Luz Encender', icon: 'sun', speechText: 'Por favor enciende la luz.' },
      { id: 'lights_off', label: 'Luz Apagar', icon: 'moon', speechText: 'Por favor apaga la luz.' },
      { id: 'fan', label: 'Ventilador', icon: 'fan', speechText: '¿Puedes encender el ventilador?' },
      { id: 'window', label: 'Ventana', icon: 'maximize', speechText: 'Por favor abre la ventana.' },
      { id: 'door', label: 'Puerta', icon: 'door-open', speechText: 'Por favor cierra la puerta.' },
    ]
  },
  {
    id: 'activities',
    label: 'Actividades',
    icon: 'gamepad',
    color: 'bg-indigo-600',
    children: [
      { id: 'tv', label: 'TV', icon: 'tv', speechText: 'Quiero ver televisión.' },
      { id: 'music', label: 'Música', icon: 'music', speechText: 'Quiero escuchar música.' },
      { id: 'read', label: 'Leer', icon: 'book', speechText: 'Por favor léeme algo.' },
      { id: 'outside', label: 'Afuera', icon: 'sun', speechText: 'Quiero salir afuera.' },
    ]
  }
];

// Japanese Translation
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
      { id: 'stop', label: 'やめて', icon: 'stop', speechText: 'やめてください。' },
      { id: 'dont_know', label: 'わからない', icon: 'help-circle', speechText: 'わかりません。' },
    ]
  },
  {
    id: 'emergency',
    label: '緊急',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: '助けて', icon: 'alert-circle', speechText: '助けて！緊急です！' },
      { id: 'breath', label: '苦しい', icon: 'wind', speechText: '息が苦しいです。' },
      { id: 'choke', label: '喉詰まり', icon: 'alert-circle', speechText: '喉が詰まっています。' },
      { id: 'pain_sev', label: '激痛', icon: 'alert-circle', speechText: '激しい痛みがあります。' },
      { id: 'fall', label: '落ちる', icon: 'alert-circle', speechText: '落ちそうです。' },
    ]
  },
  {
    id: 'emotions',
    label: '気持ち',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: '嬉しい', icon: 'smile', speechText: '嬉しいです。' },
      { id: 'sad', label: '悲しい', icon: 'frown', speechText: '悲しいです。' },
      { id: 'scared', label: '怖い', icon: 'alert-circle', speechText: '怖いです。' },
      { id: 'angry', label: 'イライラ', icon: 'frown', speechText: 'イライラしています。' },
      { id: 'love', label: '大好き', icon: 'heart', speechText: '大好きです。愛しています。' },
      { id: 'tired', label: '疲れた', icon: 'moon', speechText: '疲れました。' },
    ]
  },
  {
    id: 'food_drink',
    label: '食事・飲み物',
    icon: 'utensils',
    color: 'bg-orange-600',
    children: [
      { id: 'water', label: '水', icon: 'droplets', speechText: 'お水をください。' },
      { id: 'tea', label: 'お茶', icon: 'cup-soda', speechText: 'お茶をください。' },
      { id: 'coffee', label: 'コーヒー', icon: 'coffee', speechText: 'コーヒーを飲みたいです。' },
      { id: 'rice', label: 'ご飯', icon: 'utensils', speechText: 'ご飯を食べたいです。' },
      { id: 'miso', label: '味噌汁', icon: 'utensils', speechText: 'お味噌汁が欲しいです。' },
    ]
  },
  {
    id: 'medical',
    label: '医療',
    icon: 'stethoscope',
    color: 'bg-blue-800',
    children: [
      { id: 'doctor', label: '医者', icon: 'users', speechText: 'お医者さんを呼んでください。' },
      { id: 'nurse', label: '看護師', icon: 'users', speechText: '看護師さんを呼んでください。' },
      { id: 'meds', label: '薬', icon: 'pill', speechText: '薬の時間です。薬をください。' },
      { id: 'suction', label: '吸引', icon: 'wind', speechText: '吸引をお願いします。' },
      { id: 'position', label: '体位交換', icon: 'refresh-cw', speechText: '体の向きを変えるのを手伝ってください。' },
    ]
  },
  {
    id: 'comfort',
    label: '体のケア',
    icon: 'bed',
    color: 'bg-blue-600',
    children: [
      { id: 'posture', label: '体勢変更', icon: 'bed', speechText: '体の向きを変えてください。' },
      { id: 'hot', label: '暑い', icon: 'thermometer-sun', speechText: '暑いです。' },
      { id: 'cold', label: '寒い', icon: 'thermometer-snowflake', speechText: '寒いです。' },
      { 
          id: 'pain', 
          label: '痛い', 
          icon: 'alert-circle', 
          children: [
              { id: 'head', label: '頭', icon: 'smile', speechText: '頭が痛いです。' },
              { id: 'stomach', label: 'お腹', icon: 'user', speechText: 'お腹が痛いです。' },
              { id: 'chest', label: '胸', icon: 'alert-circle', speechText: '胸が痛いです。' },
              { id: 'back', label: '背中', icon: 'user', speechText: '背中が痛いです。' },
              { id: 'arms', label: '腕', icon: 'user', speechText: '腕が痛いです。' },
              { id: 'legs', label: '足', icon: 'user', speechText: '足が痛いです。' },
              { id: 'general', label: '全体', icon: 'alert-circle', speechText: '体が痛いです。' }
          ]
      },
    ]
  },
  {
    id: 'hygiene',
    label: 'トイレ・清潔',
    icon: 'shower-head',
    color: 'bg-teal-600',
    children: [
      { id: 'toilet', label: 'トイレ', icon: 'bath', speechText: 'トイレに行きたいです。' },
      { id: 'bath', label: 'お風呂', icon: 'shower-head', speechText: 'お風呂に入りたいです。' },
      { id: 'face', label: '顔拭き', icon: 'sparkles', speechText: '顔を拭いてください。' },
    ]
  },
  {
    id: 'people',
    label: '人',
    icon: 'users',
    color: 'bg-purple-700',
    children: [
      { id: 'family', label: '家族', icon: 'users', speechText: '家族に会いたいです。' },
      { id: 'friend', label: '友達', icon: 'user', speechText: '友達に会いたいです。' },
      { id: 'caregiver', label: '介護者', icon: 'user', speechText: '介護の方はどこですか？' },
      { id: 'alone', label: '一人に', icon: 'door-closed', speechText: '少し一人にしてください。' },
    ]
  },
  {
    id: 'environment',
    label: '環境',
    icon: 'lightbulb',
    color: 'bg-green-700',
    children: [
      { id: 'lights_on', label: '電気オン', icon: 'sun', speechText: '電気をつけてください。' },
      { id: 'lights_off', label: '電気オフ', icon: 'moon', speechText: '電気を消してください。' },
      { id: 'fan', label: '扇風機', icon: 'fan', speechText: '扇風機をつけてください。' },
      { id: 'window', label: '窓', icon: 'maximize', speechText: '窓を開けてください。' },
    ]
  },
  {
    id: 'activities',
    label: '活動',
    icon: 'gamepad',
    color: 'bg-indigo-600',
    children: [
      { id: 'tv', label: 'テレビ', icon: 'tv', speechText: 'テレビを見たいです。' },
      { id: 'music', label: '音楽', icon: 'music', speechText: '音楽を聴きたいです。' },
      { id: 'outside', label: '外へ', icon: 'sun', speechText: '外の空気を吸いたいです。' },
    ]
  }
];

// French Translation
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
      { id: 'wait', label: 'Attends', icon: 'clock', speechText: 'Attendez un instant s\'il vous plaît.' },
      { id: 'stop', label: 'Stop', icon: 'stop', speechText: 'Arrêtez s\'il vous plaît.' },
      { id: 'dont_know', label: 'Je ne sais pas', icon: 'help-circle', speechText: 'Je ne sais pas.' },
    ]
  },
  {
    id: 'emergency',
    label: 'URGENCE',
    icon: 'siren',
    color: 'bg-red-700',
    children: [
      { id: 'help', label: 'AIDEZ-MOI', icon: 'alert-circle', speechText: 'À l\'aide ! J\'ai besoin d\'aide tout de suite !' },
      { id: 'breath', label: 'Respirer', icon: 'wind', speechText: 'Je n\'arrive pas à bien respirer.' },
      { id: 'choke', label: 'Étouffer', icon: 'alert-circle', speechText: 'Je m\'étouffe.' },
      { id: 'pain_sev', label: 'Douleur Intense', icon: 'alert-circle', speechText: 'J\'ai une douleur très intense.' },
      { id: 'fall', label: 'Tomber', icon: 'alert-circle', speechText: 'Je sens que je tombe.' },
    ]
  },
  {
    id: 'emotions',
    label: 'Émotions',
    icon: 'heart',
    color: 'bg-pink-700',
    children: [
      { id: 'happy', label: 'Heureux', icon: 'smile', speechText: 'Je suis heureux.' },
      { id: 'sad', label: 'Triste', icon: 'frown', speechText: 'Je me sens triste.' },
      { id: 'scared', label: 'Peur', icon: 'alert-circle', speechText: 'J\'ai peur.' },
      { id: 'angry', label: 'Frustré', icon: 'frown', speechText: 'Je suis frustré.' },
      { id: 'love', label: 'Je t\'aime', icon: 'heart', speechText: 'Je t\'aime.' },
      { id: 'tired', label: 'Fatigué', icon: 'moon', speechText: 'Je suis fatigué.' },
    ]
  },
  {
    id: 'food_drink',
    label: 'Nourriture',
    icon: 'utensils',
    color: 'bg-orange-600',
    children: [
      { id: 'water', label: 'Eau', icon: 'droplets', speechText: "Je voudrais de l'eau s'il vous plaît." },
      { id: 'coffee', label: 'Café', icon: 'coffee', speechText: "Je voudrais un café s'il vous plaît." },
      { id: 'tea', label: 'Thé', icon: 'cup-soda', speechText: "Je voudrais du thé s'il vous plaît." },
      { id: 'soup', label: 'Soupe', icon: 'utensils', speechText: "Je voudrais de la soupe." },
      { id: 'hungry', label: 'J\'ai faim', icon: 'utensils', speechText: "J'ai faim." },
    ]
  },
  {
    id: 'medical',
    label: 'Médical',
    icon: 'stethoscope',
    color: 'bg-blue-800',
    children: [
      { id: 'doctor', label: 'Médecin', icon: 'users', speechText: 'Je dois voir un médecin.' },
      { id: 'nurse', label: 'Infirmière', icon: 'users', speechText: 'Appelez l\'infirmière s\'il vous plaît.' },
      { id: 'meds', label: 'Médicament', icon: 'pill', speechText: 'J\'ai besoin de mes médicaments.' },
      { id: 'suction', label: 'Aspiration', icon: 'wind', speechText: 'J\'ai besoin d\'aspiration s\'il vous plaît.' },
      { id: 'position', label: 'Position', icon: 'refresh-cw', speechText: 'Aidez-moi à changer de position s\'il vous plaît.' },
    ]
  },
  {
    id: 'comfort',
    label: 'Confort',
    icon: 'bed',
    color: 'bg-blue-600',
    children: [
      { id: 'bed', label: 'Lit', icon: 'bed', speechText: "Pouvez-vous ajuster mon lit ?" },
      { id: 'hot', label: 'Trop chaud', icon: 'thermometer-sun', speechText: "J'ai trop chaud." },
      { id: 'cold', label: 'Trop froid', icon: 'thermometer-snowflake', speechText: "J'ai trop froid." },
      { 
          id: 'pain', 
          label: 'Douleur', 
          icon: 'alert-circle', 
          children: [
              { id: 'head', label: 'Tête', icon: 'smile', speechText: "J'ai mal à la tête." },
              { id: 'stomach', label: 'Estomac', icon: 'user', speechText: "J'ai mal au ventre." },
              { id: 'chest', label: 'Poitrine', icon: 'alert-circle', speechText: "J'ai mal à la poitrine." },
              { id: 'back', label: 'Dos', icon: 'user', speechText: "J'ai mal au dos." },
              { id: 'arms', label: 'Bras', icon: 'user', speechText: "J'ai mal aux bras." },
              { id: 'legs', label: 'Jambes', icon: 'user', speechText: "J'ai mal aux jambes." },
              { id: 'general', label: 'Général', icon: 'alert-circle', speechText: "J'ai mal." }
          ]
      },
    ]
  },
  {
    id: 'hygiene',
    label: 'Hygiène',
    icon: 'shower-head',
    color: 'bg-teal-600',
    children: [
      { id: 'toilet', label: 'Toilettes', icon: 'bath', speechText: "J'ai besoin d'aller aux toilettes." },
      { id: 'wash', label: 'Laver', icon: 'sparkles', speechText: "Je veux me laver." },
    ]
  },
  {
    id: 'people',
    label: 'Gens',
    icon: 'users',
    color: 'bg-purple-700',
    children: [
      { id: 'family', label: 'Famille', icon: 'users', speechText: 'Je veux voir ma famille.' },
      { id: 'friend', label: 'Ami', icon: 'user', speechText: 'Je veux voir un ami.' },
      { id: 'caregiver', label: 'Soignant', icon: 'user', speechText: 'Où est mon soignant ?' },
      { id: 'alone', label: 'Intimité', icon: 'door-closed', speechText: 'Je voudrais un peu d\'intimité s\'il vous plaît.' },
    ]
  },
  {
    id: 'environment',
    label: 'Environnement',
    icon: 'lightbulb',
    color: 'bg-green-700',
    children: [
      { id: 'lights_on', label: 'Lumière ON', icon: 'sun', speechText: 'Allumez la lumière s\'il vous plaît.' },
      { id: 'lights_off', label: 'Lumière OFF', icon: 'moon', speechText: 'Éteignez la lumière s\'il vous plaît.' },
      { id: 'fan', label: 'Ventilateur', icon: 'fan', speechText: 'Pouvez-vous allumer le ventilateur ?' },
      { id: 'window', label: 'Fenêtre', icon: 'maximize', speechText: 'Ouvrez la fenêtre s\'il vous plaît.' },
    ]
  },
  {
    id: 'activities',
    label: 'Activités',
    icon: 'gamepad',
    color: 'bg-indigo-600',
    children: [
      { id: 'tv', label: 'Télé', icon: 'tv', speechText: 'Je veux regarder la télé.' },
      { id: 'music', label: 'Musique', icon: 'music', speechText: 'Je veux écouter de la musique.' },
      { id: 'outside', label: 'Dehors', icon: 'sun', speechText: 'Je veux aller dehors.' },
    ]
  }
];

export const SERVICE_TREES: Record<Language, ServiceItem[]> = {
  [Language.ENGLISH]: COMMON_ENGLISH,
  [Language.SPANISH]: COMMON_SPANISH,
  [Language.JAPANESE]: COMMON_JAPANESE,
  [Language.FRENCH]: COMMON_FRENCH
};