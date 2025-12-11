
import { Language, ServiceItem, Gender, DemoStep, InteractionMode } from './types';

export const DEFAULT_INTERACTION_MODE: InteractionMode = 'DWELL'; // Default to DWELL for eye-tracking readiness

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

const COMMON_ENGLISH: ServiceItem[] = [
  {
    id: 'emergency',
    label: 'Emergency',
    icon: 'siren',
    color: 'bg-red-600',
    children: [
      { id: 'pain_sev', label: 'Severe Pain', speechText: 'I am in severe pain.', icon: 'thermometer-sun', color: 'bg-red-500' },
      { id: 'cant_breathe', label: 'Can\'t Breathe', speechText: 'I am having trouble breathing.', icon: 'fan', color: 'bg-red-500' },
      { id: 'fall', label: 'I Fell', speechText: 'I fell and need help up.', icon: 'alert-circle', color: 'bg-red-500' },
      { id: 'suction_em', label: 'Need Suction', speechText: 'I need suction immediately.', icon: 'stethoscope', color: 'bg-red-500' }
    ]
  },
  {
    id: 'needs',
    label: 'Needs',
    icon: 'coffee',
    color: 'bg-blue-600',
    children: [
      { id: 'water', label: 'Water', speechText: 'Can I have some water please?', icon: 'glass-water' },
      { id: 'food', label: 'Food', speechText: 'I am hungry.', icon: 'utensils' },
      { id: 'toilet', label: 'Bathroom', speechText: 'I need to use the bathroom.', icon: 'bath' },
      { id: 'position', label: 'Position', speechText: 'Please help me change position.', icon: 'armchair' },
      { id: 'cold', label: 'Too Cold', speechText: 'I am cold.', icon: 'thermometer-snowflake' },
      { id: 'hot', label: 'Too Hot', speechText: 'I am hot.', icon: 'thermometer-sun' }
    ]
  },
  {
    id: 'social',
    label: 'Social',
    icon: 'users',
    color: 'bg-purple-600',
    children: [
      { id: 'hello', label: 'Hello', speechText: 'Hello, good to see you.', icon: 'message' },
      { id: 'thanks', label: 'Thanks', speechText: 'Thank you very much.', icon: 'thumbs-up' },
      { id: 'yes', label: 'Yes', speechText: 'Yes, please.', icon: 'thumbs-up' },
      { id: 'no', label: 'No', speechText: 'No, thank you.', icon: 'thumbs-down' },
      { id: 'love', label: 'Love You', speechText: 'I love you.', icon: 'heart' }
    ]
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: 'tv',
    color: 'bg-amber-600',
    children: [
        { id: 'music', label: 'Music', speechText: 'I would like to listen to music.', icon: 'music' },
        { id: 'tv_c', label: 'TV', speechText: 'Please turn on the TV.', icon: 'tv' },
        { id: 'lights', label: 'Lights', speechText: 'Can you adjust the lights?', icon: 'lightbulb' }
    ]
  }
];

const COMMON_SPANISH: ServiceItem[] = [
    {
      id: 'emergency',
      label: 'Emergencia',
      icon: 'siren',
      color: 'bg-red-600',
      children: [
        { id: 'pain_sev', label: 'Dolor Severo', speechText: 'Tengo un dolor severo.', icon: 'thermometer-sun', color: 'bg-red-500' },
        { id: 'cant_breathe', label: 'No Respiro', speechText: 'Tengo problemas para respirar.', icon: 'fan', color: 'bg-red-500' },
        { id: 'fall', label: 'Me Caí', speechText: 'Me he caído y necesito ayuda.', icon: 'alert-circle', color: 'bg-red-500' },
        { id: 'suction_em', label: 'Succión', speechText: 'Necesito succión inmediatamente.', icon: 'stethoscope', color: 'bg-red-500' }
      ]
    },
    {
      id: 'needs',
      label: 'Necesidades',
      icon: 'coffee',
      color: 'bg-blue-600',
      children: [
        { id: 'water', label: 'Agua', speechText: '¿Me puede dar agua por favor?', icon: 'glass-water' },
        { id: 'food', label: 'Comida', speechText: 'Tengo hambre.', icon: 'utensils' },
        { id: 'toilet', label: 'Baño', speechText: 'Necesito ir al baño.', icon: 'bath' },
        { id: 'position', label: 'Posición', speechText: 'Por favor ayúdame a cambiar de posición.', icon: 'armchair' },
        { id: 'cold', label: 'Frío', speechText: 'Tengo frío.', icon: 'thermometer-snowflake' },
        { id: 'hot', label: 'Calor', speechText: 'Tengo calor.', icon: 'thermometer-sun' }
      ]
    },
    {
      id: 'social',
      label: 'Social',
      icon: 'users',
      color: 'bg-purple-600',
      children: [
        { id: 'hello', label: 'Hola', speechText: 'Hola, qué bueno verte.', icon: 'message' },
        { id: 'thanks', label: 'Gracias', speechText: 'Muchas gracias.', icon: 'thumbs-up' },
        { id: 'yes', label: 'Sí', speechText: 'Sí, por favor.', icon: 'thumbs-up' },
        { id: 'no', label: 'No', speechText: 'No, gracias.', icon: 'thumbs-down' },
        { id: 'love', label: 'Te Quiero', speechText: 'Te quiero.', icon: 'heart' }
      ]
    },
    {
      id: 'activities',
      label: 'Actividades',
      icon: 'tv',
      color: 'bg-amber-600',
      children: [
          { id: 'music', label: 'Música', speechText: 'Me gustaría escuchar música.', icon: 'music' },
          { id: 'tv_c', label: 'TV', speechText: 'Por favor enciende la TV.', icon: 'tv' },
          { id: 'lights', label: 'Luces', speechText: '¿Puedes ajustar las luces?', icon: 'lightbulb' }
      ]
    }
  ];

const COMMON_FRENCH: ServiceItem[] = [
    {
      id: 'emergency',
      label: 'Urgence',
      icon: 'siren',
      color: 'bg-red-600',
      children: [
        { id: 'pain_sev', label: 'Douleur Intense', speechText: 'J\'ai une douleur intense.', icon: 'thermometer-sun', color: 'bg-red-500' },
        { id: 'cant_breathe', label: 'Respiration', speechText: 'J\'ai du mal à respirer.', icon: 'fan', color: 'bg-red-500' },
        { id: 'fall', label: 'Je suis tombé', speechText: 'Je suis tombé, aidez-moi.', icon: 'alert-circle', color: 'bg-red-500' },
        { id: 'suction_em', label: 'Aspiration', speechText: 'J\'ai besoin d\'une aspiration immédiate.', icon: 'stethoscope', color: 'bg-red-500' }
      ]
    },
    {
      id: 'needs',
      label: 'Besoins',
      icon: 'coffee',
      color: 'bg-blue-600',
      children: [
        { id: 'water', label: 'Eau', speechText: 'Puis-je avoir de l\'eau ?', icon: 'glass-water' },
        { id: 'food', label: 'Manger', speechText: 'J\'ai faim.', icon: 'utensils' },
        { id: 'toilet', label: 'Toilette', speechText: 'Je dois aller aux toilettes.', icon: 'bath' },
        { id: 'position', label: 'Position', speechText: 'Aidez-moi à changer de position.', icon: 'armchair' },
        { id: 'cold', label: 'Froid', speechText: 'J\'ai froid.', icon: 'thermometer-snowflake' },
        { id: 'hot', label: 'Chaud', speechText: 'J\'ai chaud.', icon: 'thermometer-sun' }
      ]
    },
    {
      id: 'social',
      label: 'Social',
      icon: 'users',
      color: 'bg-purple-600',
      children: [
        { id: 'hello', label: 'Bonjour', speechText: 'Bonjour, ravi de vous voir.', icon: 'message' },
        { id: 'thanks', label: 'Merci', speechText: 'Merci beaucoup.', icon: 'thumbs-up' },
        { id: 'yes', label: 'Oui', speechText: 'Oui, s\'il vous plaît.', icon: 'thumbs-up' },
        { id: 'no', label: 'Non', speechText: 'Non, merci.', icon: 'thumbs-down' },
        { id: 'love', label: 'Je t\'aime', speechText: 'Je t\'aime.', icon: 'heart' }
      ]
    },
    {
      id: 'activities',
      label: 'Activités',
      icon: 'tv',
      color: 'bg-amber-600',
      children: [
          { id: 'music', label: 'Musique', speechText: 'Je voudrais écouter de la musique.', icon: 'music' },
          { id: 'tv_c', label: 'TV', speechText: 'Allumez la télé SVP.', icon: 'tv' },
          { id: 'lights', label: 'Lumières', speechText: 'Pouvez-vous régler la lumière ?', icon: 'lightbulb' }
      ]
    }
  ];

const COMMON_JAPANESE: ServiceItem[] = [
    {
      id: 'emergency',
      label: '緊急',
      icon: 'siren',
      color: 'bg-red-600',
      children: [
        { id: 'pain_sev', label: '激痛', speechText: '激しい痛みがあります。', icon: 'thermometer-sun', color: 'bg-red-500' },
        { id: 'cant_breathe', label: '息苦しい', speechText: '息が苦しいです。', icon: 'fan', color: 'bg-red-500' },
        { id: 'fall', label: '転倒', speechText: '転びました。助けてください。', icon: 'alert-circle', color: 'bg-red-500' },
        { id: 'suction_em', label: '吸引', speechText: '吸引をお願いします。', icon: 'stethoscope', color: 'bg-red-500' }
      ]
    },
    {
      id: 'needs',
      label: '生活',
      icon: 'coffee',
      color: 'bg-blue-600',
      children: [
        { id: 'water', label: '水', speechText: 'お水をください。', icon: 'glass-water' },
        { id: 'food', label: '食事', speechText: 'お腹が空きました。', icon: 'utensils' },
        { id: 'toilet', label: 'トイレ', speechText: 'トイレに行きたいです。', icon: 'bath' },
        { id: 'position', label: '体勢', speechText: '体の向きを変えてください。', icon: 'armchair' },
        { id: 'cold', label: '寒い', speechText: '寒いです。', icon: 'thermometer-snowflake' },
        { id: 'hot', label: '暑い', speechText: '暑いです。', icon: 'thermometer-sun' }
      ]
    },
    {
      id: 'social',
      label: '会話',
      icon: 'users',
      color: 'bg-purple-600',
      children: [
        { id: 'hello', label: 'こんにちは', speechText: 'こんにちは。', icon: 'message' },
        { id: 'thanks', label: 'ありがとう', speechText: 'ありがとうございます。', icon: 'thumbs-up' },
        { id: 'yes', label: 'はい', speechText: 'はい、お願いします。', icon: 'thumbs-up' },
        { id: 'no', label: 'いいえ', speechText: 'いいえ、結構です。', icon: 'thumbs-down' },
        { id: 'love', label: '大好き', speechText: '大好きです。', icon: 'heart' }
      ]
    },
    {
      id: 'activities',
      label: '活動',
      icon: 'tv',
      color: 'bg-amber-600',
      children: [
          { id: 'music', label: '音楽', speechText: '音楽が聴きたいです。', icon: 'music' },
          { id: 'tv_c', label: 'テレビ', speechText: 'テレビをつけてください。', icon: 'tv' },
          { id: 'lights', label: '電気', speechText: '電気を調整してください。', icon: 'lightbulb' }
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
  { action: 'NARRATE', payload: "This is Hello Chatty 3.0. A completely free, multimodal communication interface designed to restore agency to those living with ALS. Whether using a mouse or a standard webcam for eye-tracking, our 'Dwell' interaction model eliminates the need for physical clicks, making communication effortless.", delayAfter: 200 },
  { action: 'SET_AUTH_VIEW', payload: 'LOGIN' },
  { action: 'WAIT', delayAfter: 800 },
  { action: 'SET_INPUT', payload: { email: 'demo@chatty.ai', password: 'demo123' } },
  { action: 'WAIT', delayAfter: 800 },
  { action: 'LOGIN' },
  
  // 0:20 - Services Navigation (Drill Down)
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "The Services Hub organizes essential needs into deep, navigable hierarchies. Users can drill down from broad categories like 'Emergency' to specific needs like 'Severe Pain' in seconds, bypassing the fatigue of typing during critical moments." },
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'emergency', delayAfter: 1500 }, // Click Emergency
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'pain_sev', delayAfter: 1500 }, // Click Severe Pain
  { action: 'SPEAK_APP', payload: "I am in severe pain.", delayAfter: 2000 },

  // 0:40 - Services Customization (Add New)
  { action: 'NAVIGATE', payload: 'KEYBOARD', delayAfter: 1000 }, // Back to keyboard
  { action: 'NARRATE', payload: "But every life is unique. That’s why Chatty is fully user-customizable. Simply type any phrase—like 'Play Jazz'—and instantly pin it to your Service board. The interface adapts to the user, not the other way around." },
  { action: 'TYPE_KEYS', payload: "Play Jazz", delayAfter: 300 },
  { action: 'NAVIGATE', payload: 'SERVICES', delayAfter: 800 }, // Go back to services
  { action: 'CLICK_ADD_SERVICE', delayAfter: 1000 }, // Click the "Add 'Play Jazz'" button
  { action: 'NAVIGATE_SERVICE_TREE', payload: 'Play Jazz', delayAfter: 1000 }, // Click the NEW button (by label)
  { action: 'SPEAK_APP', payload: "Play Jazz", delayAfter: 1500 },

  // 1:00 - Prediction (Contextual)
  { action: 'NAVIGATE', payload: 'KEYBOARD', delayAfter: 500 },
  { action: 'NARRATE', payload: "For unique expression, we leverage Google Gemini. Unlike standard autocorrect, our predictive engine understands the context of your conversation. It anticipates your next thought, drastically reducing the eye movement required to construct complex sentences." },
  { action: 'TYPE_KEYS', payload: "I am", delayAfter: 400 }, 
  { action: 'WAIT', delayAfter: 600 },
  { action: 'CLICK_PREDICTION', payload: "hungry", delayAfter: 1000 }, // Simulate user selecting hungry
  { action: 'SPEAK_APP', payload: "I am hungry.", delayAfter: 1500 },

  // 1:20 - Multilingual (Japanese)
  { action: 'WAIT', delayAfter: 500 },
  { action: 'NARRATE', payload: "Communication knows no borders. Hello Chatty features instant localization, supporting languages like French, Spanish, and Japanese. It adapts the entire interface—including character sets and predictive models—to the user’s native tongue." },
  { action: 'SET_LANGUAGE', payload: Language.JAPANESE, delayAfter: 1500 }, // Switch to Japanese
  { action: 'MOCK_PREDICTIONS', payload: ["こんにちは", "ありがとう", "はい", "いいえ"] }, // Force prediction to exist
  { action: 'TYPE_KEYS', payload: "こ", delayAfter: 400 }, // Type "ko" -> "こ"
  { action: 'CLICK_PREDICTION', payload: "こんにちは", delayAfter: 800 }, 
  { action: 'SPEAK_APP', payload: "こんにちは", delayAfter: 1000 },
  { action: 'SET_LANGUAGE', payload: Language.ENGLISH, delayAfter: 500 }, // Switch back

  // 1:40 - Voice Banking (Settings)
  { action: 'NAVIGATE', payload: 'SETTINGS' },
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "Most importantly, we preserve identity. Through our partnership with ElevenLabs, we offer free voice cloning. This ensures that when our users speak, they speak with their own voice, maintaining their self-expression forever." },
  // Simulate scrolling or highlighting voice clone section
  { action: 'WAIT', delayAfter: 3000 },

  // 2:00 - Outro
  { action: 'WAIT', delayAfter: 1000 },
  { action: 'NARRATE', payload: "Hello Chatty. Giving everyone a voice." },
  { action: 'WAIT', delayAfter: 2000 },
];
