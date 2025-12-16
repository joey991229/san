import { GoogleGenAI } from "@google/genai";
import { CharacterReaction, ReactionSchema, CharacterProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Cultural context provided by the user
const CULTURAL_GUIDELINES = `
REFERENCE RULES FOR GESTURES (KOREAN CONTEXT):

1) Thumbs Up (👍)
- Korea/USA/Europe: "좋아요!", "최고".
- Middle East/West Africa: 모욕적/공격적.
- Iran/Australia: 무례할 수 있음.

2) V Sign (✌️)
- Korea/Japan: 귀여운 포즈, 긍정적.
- USA/Europe: 평화, 승리.
- UK/Australia (Back of hand): 심한 모욕.

3) OK Gesture (👌)
- Korea/USA/Europe: "완벽해", "OK".
- France: "0" 또는 "쓸모없음" (부정적/무시).
- Brazil: 심한 모욕 (금기).

4) Call Me (🤙)
- USA/Korea: "전화해", 캐주얼함.
- China: "6" (숫자), 또는 지역에 따라 다름.

5) Crossed Fingers (🤞)
- West: 행운을 빔.
- Vietnam: 성적 모욕.

6) Waving (👋)
- West: 안녕.
- Greece: 모욕 (Moutza).
- Japan: "아니오" 또는 "저리가"일 수 있음.

7) Stop/Palm (✋)
- West: "멈춰".
- Middle East/Iran: 무례함/모욕.
- Greece: 모욕 (Moutza).

8) Two Hands (🤲)
- Korea/Japan: 존중/공손.
- West: 불필요/지나친 격식.

9) Rock On / Corna (🤘)
- USA/Korea/UK: "Rock n Roll", "멋짐", "음악".
- Brazil/Mediterranean: "Corna" (당신의 배우자가 바람을 피웠다). 매우 모욕적임.
`;

export const fetchReactions = async (gesturePrompt: string, activeCharacters: CharacterProfile[]): Promise<CharacterReaction[]> => {
  const model = "gemini-2.5-flash";
  
  const characterContext = activeCharacters.map(c => 
    `${c.name} (${c.country}): ${c.description} (ID: ${c.id})`
  ).join("\n");

  const prompt = `
    당신은 4명의 서로 다른 문화권 캐릭터가 있는 웹 페이지를 애니메이션화하고 있습니다.
    사용자가 다음 행동을 했습니다: "${gesturePrompt}".
    
    ${CULTURAL_GUIDELINES}

    현재 화면의 캐릭터들:
    ${characterContext}
    
    지침:
    - 위 캐릭터 4명 각각에 대한 반응을 JSON 형식으로 생성하세요.
    - 위의 "제스처 참조 규칙"을 엄격히 따르세요.
    - 캐릭터의 국가에서 모욕적인 제스처라면, 화를 내거나 충격을 받은 반응을 보여야 합니다.
    - 특정 의미(예: 프랑스의 "0")가 있다면 그 의미를 반영하세요.
    - 'dialogue': 10단어 이내의 짧은 한국어 대사. 문화적으로 적절하게.
    - 'emotion': [happy, surprised, confused, excited, neutral, positive, negative] 중 하나. 모욕적이면 'negative' 또는 'surprised' 사용.
    - 'actionDescription': 포즈에 대한 매우 짧은 한국어 묘사 (예: "찌푸림", "웃으며 엄지 척", "충격받은 표정").
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ReactionSchema,
        temperature: 0.8,
      },
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text) as CharacterReaction[];
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return activeCharacters.map(c => ({
      characterId: c.id,
      dialogue: "...",
      emotion: "neutral" as any,
      actionDescription: "가만히 있음"
    }));
  }
};