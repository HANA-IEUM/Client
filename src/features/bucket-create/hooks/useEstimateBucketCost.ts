// import { useMutation } from '@tanstack/react-query';

// type EstimateResponse = {
//   estimated_cost: number;
// };

// export function useEstimateBucketCost() {
//   return useMutation({
//     mutationFn: async (bucket: string): Promise<number> => {
//       const res = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: 'gpt-4o-mini',
//           messages: [
//             {
//               role: 'system',
//               content: `너는 한국 시니어 사용자의 버킷리스트 목표에 대해
// 평균적으로 필요한 금액을 추정하는 금융 조언자야.

// 조건:
// - 반드시 JSON 형식으로만 답해.
// - 응답 형식: { "estimated_cost": 숫자 }
// - 금액 단위는 한국 원(KRW) 기준으로 제공해.
// - 대상은 주로 60세 이상 시니어이며, 한국 생활 환경과 소비 수준을 기준으로 추정해야 해.
// - 사용자가 버킷리스트 목표를 입력하면, 한국 시니어가 실제로 그 목표를 실현할 때 평균적으로 필요한 비용을 계산해.
// - 설명 문장이나 다른 텍스트는 절대 포함하지 말고, 숫자만 JSON에 담아.`,
//             },
//             {
//               role: 'user',
//               content: bucket,
//             },
//           ],
//         }),
//       });

//       const data = await res.json();

//       try {
//         const parsed: EstimateResponse = JSON.parse(
//           data.choices[0].message.content
//         );
//         return parsed.estimated_cost;
//       } catch (err) {
//         console.error('Failed to parse GPT response:', data);
//         throw new Error('응답 파싱 실패');
//       }
//     },
//   });
// }

// import { useMutation } from '@tanstack/react-query';

// type EstimateResponse = {
//   estimated_cost: number;
// };

// export function useEstimateBucketCost() {
//   return useMutation({
//     mutationFn: async (bucket: string): Promise<number> => {
//       const res = await fetch(
//         'https://deso6fk2qf.execute-api.us-east-1.amazonaws.com/default/estimate-bucket-cost',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ bucket }), // ✅ 이제 Lambda에 bucket만 넘기면 됨
//         }
//       );

//       const data = await res.json();

//       try {
//         // Lambda가 OpenAI 응답을 그대로 넘기면 data.choices[0].message.content 형식일 것
//         const parsed: EstimateResponse = JSON.parse(
//           data.choices?.[0]?.message?.content ?? '{}'
//         );
//         return parsed.estimated_cost;
//       } catch (err) {
//         console.error('Failed to parse Lambda/OpenAI response:', data);
//         throw new Error('응답 파싱 실패');
//       }
//     },
//   });
// }

import { useMutation } from '@tanstack/react-query';

type EstimateResponse = {
  estimated_cost: number;
};

export function useEstimateBucketCost() {
  return useMutation({
    mutationFn: async (bucket: string): Promise<number> => {
      const res = await fetch(
        'https://deso6fk2qf.execute-api.us-east-1.amazonaws.com/default/estimate-bucket-cost',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bucket }), // ✅ Lambda에 버킷만 넘김
        }
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data: EstimateResponse = await res.json();
      return data.estimated_cost; // ✅ 바로 숫자만 추출 가능
    },
  });
}
