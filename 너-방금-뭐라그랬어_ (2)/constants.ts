import { CharacterId, CharacterProfile, Gesture } from "./types";

export const CHARACTERS: CharacterProfile[] = [
  {
    id: CharacterId.FRANCE,
    name: "Louis",
    country: "France",
    color: "bg-indigo-900",
    textColor: "text-indigo-100",
    description: "세련된 프랑스 남성.",
    images: {
      default: "https://i.imgur.com/z1fnoyg.png",
      positive: "https://i.imgur.com/z1fnoyg.png",
      negative: "https://i.imgur.com/p5wHmwP.png"
    }
  },
  {
    id: CharacterId.IRAN,
    name: "Reza",
    country: "Iran",
    color: "bg-stone-800",
    textColor: "text-stone-100",
    description: "현대적인 이란 남성.",
    images: {
      default: "https://i.imgur.com/D9qVE53.png",
      positive: "https://i.imgur.com/D9qVE53.png",
      negative: "https://i.imgur.com/2Mot1Kx.png"
    }
  },
  {
    id: CharacterId.JAPAN,
    name: "Kenji",
    country: "Japan",
    color: "bg-rose-900",
    textColor: "text-rose-100",
    description: "젊은 일본 남성.",
    images: {
      default: "https://i.imgur.com/kwgNZJN.png",
      positive: "https://i.imgur.com/kwgNZJN.png",
      negative: "https://i.imgur.com/ygbmB4I.png"
    }
  },
  {
    id: CharacterId.USA,
    name: "Mike",
    country: "USA",
    color: "bg-blue-900",
    textColor: "text-blue-100",
    description: "젊은 미국 남성.",
    images: {
      default: "https://i.imgur.com/7SmjYqQ.png",
      positive: "https://i.imgur.com/7SmjYqQ.png",
      negative: "https://i.imgur.com/7GJhlqS.png"
    }
  },
  {
    id: CharacterId.CHINA,
    name: "Wei",
    country: "China",
    color: "bg-emerald-900",
    textColor: "text-emerald-100",
    description: "중국 남성.",
    images: {
      default: "https://i.imgur.com/8Q0wX7t.png",
      positive: "https://i.imgur.com/8Q0wX7t.png",
      negative: "https://i.imgur.com/YUIayKK.png"
    }
  },
  {
    id: CharacterId.KOREA,
    name: "Minji",
    country: "Korea",
    color: "bg-pink-900",
    textColor: "text-purple-100",
    description: "스타일리시한 한국 여성.",
    images: {
      default: "https://i.imgur.com/q6CtsFv.png",
      positive: "https://i.imgur.com/q6CtsFv.png",
      negative: "https://i.imgur.com/q6CtsFv.png"
    }
  },
  {
    id: CharacterId.BRAZIL,
    name: "Camila",
    country: "Brazil",
    color: "bg-orange-900",
    textColor: "text-yellow-100",
    description: "쾌활한 브라질 여성.",
    images: {
      default: "https://i.imgur.com/siSE3Lo.png",
      positive: "https://i.imgur.com/siSE3Lo.png",
      negative: "https://i.imgur.com/GG1EHzs.png"
    }
  },
  {
    id: CharacterId.UK,
    name: "Olivia",
    country: "UK",
    color: "bg-red-900",
    textColor: "text-red-100",
    description: "영국 여성.",
    images: {
      default: "https://i.imgur.com/utD04N9.png",
      positive: "https://i.imgur.com/utD04N9.png",
      negative: "https://i.imgur.com/NmcKRbG.png"
    }
  },
  {
    id: CharacterId.GREECE,
    name: "Nikos",
    country: "Greece",
    color: "bg-cyan-900",
    textColor: "text-cyan-100",
    description: "그리스 남성.",
    images: {
      default: "https://i.imgur.com/YOkJPH5.png",
      positive: "https://i.imgur.com/YOkJPH5.png",
      negative: "https://i.imgur.com/E9tL3YH.png"
    }
  },
  {
    id: CharacterId.VIETNAM,
    name: "Linh",
    country: "Vietnam",
    color: "bg-emerald-900",
    textColor: "text-emerald-100",
    description: "베트남 여성.",
    images: {
      default: "https://i.imgur.com/LDaDwya.png",
      positive: "https://i.imgur.com/LDaDwya.png",
      negative: "https://i.imgur.com/Qmmn3lx.png"
    }
  },
  {
    id: CharacterId.AUSTRALIA,
    name: "Liam",
    country: "Australia",
    color: "bg-orange-800",
    textColor: "text-orange-100",
    description: "호주 남성.",
    images: {
      default: "https://i.imgur.com/li2sV02.png",
      positive: "https://i.imgur.com/li2sV02.png",
      negative: "https://i.imgur.com/iMAQNKm.png"
    }
  }
];

export const DEFAULT_CHARACTERS = [
  CharacterId.FRANCE,
  CharacterId.IRAN,
  CharacterId.JAPAN,
  CharacterId.USA
];

export const GESTURES: Gesture[] = [
  {
    id: "thumbs_up",
    label: "Thumbs Up",
    icon: "https://i.imgur.com/uGRSLpc.png",
    prompt: "사용자가 엄지 척 제스처를 취했습니다.",
    relatedCharacters: [CharacterId.USA, CharacterId.KOREA, CharacterId.IRAN, CharacterId.AUSTRALIA],
    culturalNote: [
        { characterId: CharacterId.IRAN, note: "모욕!", isNegative: true },
        { characterId: CharacterId.AUSTRALIA, note: "무례함!", isNegative: true },
        { characterId: CharacterId.USA, note: "좋아요!" },
        { characterId: CharacterId.KOREA, note: "최고!" }
    ]
  },
  {
    id: "v_sign",
    label: "V Sign",
    icon: "https://i.imgur.com/Atdb3nG.png",
    prompt: "사용자가 브이(V) 제스처를 취했습니다.",
    relatedCharacters: [CharacterId.KOREA, CharacterId.USA, CharacterId.UK, CharacterId.AUSTRALIA],
    culturalNote: [
        { characterId: CharacterId.UK, note: "모욕! (손등 보일시)", isNegative: true },
        { characterId: CharacterId.KOREA, note: "귀여운 포즈" },
        { characterId: CharacterId.USA, note: "평화" }
    ]
  },
  {
    id: "ok_sign",
    label: "OK Sign",
    icon: "https://i.imgur.com/j0xZ5AP.png",
    prompt: "사용자가 OK 사인을 보냈습니다.",
    relatedCharacters: [CharacterId.USA, CharacterId.FRANCE, CharacterId.BRAZIL, CharacterId.KOREA],
    culturalNote: [
        { characterId: CharacterId.BRAZIL, note: "심한 모욕!", isNegative: true },
        { characterId: CharacterId.FRANCE, note: "쓸모없음 / 0", isNegative: true },
        { characterId: CharacterId.USA, note: "완벽해" }
    ]
  },
  {
    id: "call_me",
    label: "Call Me",
    icon: "https://i.imgur.com/CTbRPTO.png",
    prompt: "사용자가 '전화해' 제스처를 취했습니다.",
    relatedCharacters: [CharacterId.USA, CharacterId.CHINA, CharacterId.KOREA, CharacterId.BRAZIL],
    culturalNote: [
        { characterId: CharacterId.CHINA, note: "6 (숫자)", isNegative: false },
        { characterId: CharacterId.USA, note: "전화해줘" }
    ]
  },
  {
    id: "crossed_fingers",
    label: "Crossed Fingers",
    icon: "https://i.imgur.com/6iSs6LM.png",
    prompt: "사용자가 손가락을 교차했습니다(Crossed Fingers).",
    relatedCharacters: [CharacterId.USA, CharacterId.VIETNAM, CharacterId.UK, CharacterId.FRANCE],
    culturalNote: [
        { characterId: CharacterId.VIETNAM, note: "성적 모욕!", isNegative: true },
        { characterId: CharacterId.USA, note: "행운을 빌어" }
    ]
  },
  {
    id: "stop_palm",
    label: "Stop",
    icon: "https://i.imgur.com/eme6I4i.png",
    prompt: "사용자가 손바닥을 펴서 '멈춰' 신호를 보냈습니다.",
    relatedCharacters: [CharacterId.USA, CharacterId.GREECE, CharacterId.IRAN, CharacterId.JAPAN],
    culturalNote: [
        { characterId: CharacterId.GREECE, note: "모욕 (Moutza)!", isNegative: true },
        { characterId: CharacterId.IRAN, note: "무례함!", isNegative: true },
        { characterId: CharacterId.USA, note: "정지" }
    ]
  },
  {
    id: "two_hands",
    label: "Respect",
    icon: "https://i.imgur.com/XLesUSL.png",
    prompt: "사용자가 두 손을 모아 내밀었습니다.",
    relatedCharacters: [CharacterId.KOREA, CharacterId.JAPAN, CharacterId.USA, CharacterId.FRANCE],
    culturalNote: [
        { characterId: CharacterId.KOREA, note: "존중 / 공손" },
        { characterId: CharacterId.USA, note: "너무 격식차림 / 구걸?" }
    ]
  },
  {
    id: "rock_on",
    label: "Rock On",
    icon: "https://i.imgur.com/eMVh3F9.png",
    prompt: "사용자가 검지와 새끼손가락을 펴서 'Rock On' 제스처를 취했습니다.",
    relatedCharacters: [CharacterId.USA, CharacterId.BRAZIL, CharacterId.UK, CharacterId.KOREA],
    culturalNote: [
        { characterId: CharacterId.BRAZIL, note: "배우자 바람남(모욕)!", isNegative: true },
        { characterId: CharacterId.USA, note: "Rock n Roll!" },
        { characterId: CharacterId.KOREA, note: "신나!" },
        { characterId: CharacterId.UK, note: "Rock!" }
    ]
  }
];